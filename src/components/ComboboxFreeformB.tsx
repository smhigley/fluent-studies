import * as React from 'react';
import { Option, renderCombobox_unstable, useCombobox_unstable, useComboboxStyles_unstable } from '@fluentui/react-components/unstable';
import type { ComboboxProps, ComboboxState } from '@fluentui/react-components/unstable';
import { useId } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses } from '@griffel/react';
import { useComboboxContextValues } from './ComboboxContext';

const useCustomOptionStyles = makeStyles({
  root: {
    //
  },
  check: {
    display: 'none'
  },
  hidden: {
    display: 'none'
  }
});

const useComboboxFreeformB = (props: ComboboxProps, ref: React.Ref<HTMLInputElement>): ComboboxState => {
  const state = useCombobox_unstable(props, ref);
  const { activeOption, getOptionAtIndex, getOptionsMatchingValue, open, setActiveOption, setOpen } = state;
  const { onChange: defaultOnChange, onKeyDown: defaultOnKeyDown } = state.input;
  const customOptionId = useId('custom-search-option');

  const [ customSearch, setCustomSearch ] = React.useState<string>(' ');

  // handle updating "Select X" option
  state.input.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const typedValue = event.target.value.trim();

    defaultOnChange?.(event);

    // check if value does not match options
    let matchingOptions = getOptionsMatchingValue((val) => val.toLowerCase().indexOf(typedValue.toLowerCase()) === 0);
    matchingOptions = matchingOptions.filter((op) => op.id !== customOptionId);
    if (typedValue.length > 0 && matchingOptions.length === 0) {
      setCustomSearch(typedValue);
      
      // custom search option will always be first
      const firstOption = getOptionAtIndex(0);
      setActiveOption(firstOption);
    }
    else {
      customSearch && setCustomSearch(' ');
    }
  };

  // Do not use space to select
  state.input.onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      return;
    }

    // if the active option is the "Select X" option, just close
    if (open && event.key === 'Enter' && activeOption?.id === customOptionId) {
      setOpen(event, false);
      return;
    }

    defaultOnKeyDown?.(event);
  }

  // clear custom search on close
  React.useEffect(() => {
    if (!open) {
      setCustomSearch(' ');
    }
  }, [ open ]);

  const customOptionStyles = useCustomOptionStyles();
  if (state.listbox) {
    const optionClassName = mergeClasses(
      customOptionStyles.root,
      !customSearch.trim() && customOptionStyles.hidden
    );
    const option = getOptionAtIndex(0);
    state.listbox.children = (
      <>
        <Option id={customOptionId} value={customSearch} className={optionClassName} checkIcon={{ className: customOptionStyles.check }}>Select '{customSearch}'</Option>
        {state.listbox.children}
      </>
    )
  }

  return state;
};

export const ComboboxFreeformB: ForwardRefComponent<ComboboxProps> = React.forwardRef((props, ref) => {
  const state = useComboboxFreeformB(props, ref);
  const contextValues = useComboboxContextValues(state);

  useComboboxStyles_unstable(state);
  return renderCombobox_unstable(state, contextValues);
});