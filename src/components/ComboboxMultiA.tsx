import * as React from 'react';
import { renderCombobox_unstable, useCombobox_unstable, useComboboxStyles_unstable } from '@fluentui/react-components/unstable';
import type { ComboboxProps, ComboboxState } from '@fluentui/react-components/unstable';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useComboboxContextValues } from './ComboboxContext';



const useComboboxMultiA = (props: ComboboxProps, ref: React.Ref<HTMLInputElement>): ComboboxState => {
  // add custom option select to insert comma
  const [value, setValue] = React.useState<string | undefined>(props.defaultValue as string);
  const [customOpen, setCustomOpen] = React.useState(false);
  const ignoreSelect = React.useRef(false);
  const { onOptionSelect: defaultOnOptionSelect } = props;
  const onOptionSelect = React.useMemo(() => (event: any, {optionValue, selectedOptions}: any) => {
    const selectedTextValue = selectedOptions.join(', ');

    if (customOpen && !ignoreSelect.current && selectedTextValue.trim() !== '') {
      setValue(selectedTextValue + ', ');
    }

    ignoreSelect.current = false;
    defaultOnOptionSelect?.(event, { optionValue, selectedOptions});
  }, [customOpen, ignoreSelect, defaultOnOptionSelect]);

  const customProps = { ...props, onOptionSelect };

  const state = useCombobox_unstable(customProps, ref);
  const { getOptionsMatchingValue, open, selectOption, selectedOptions, value: calculatedValue } = state;
  // clearSelection is exported, but not in state type
  const { clearSelection } = state as any;
  const { onInput: defaultOnInput, onKeyDown: defaultOnKeyDown } = state.input;

  // handle use of open state before useCombobox is called
  if (open !== customOpen) setCustomOpen(open);

  state.input.onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    // handle deselecting options if the user has cleared their text value
    if (event.target.value.trim() === '') {
      ignoreSelect.current = true;
      clearSelection();
    } else {
      const textSelection = event.target.value.split(', ');
      const deselectedOptions = selectedOptions.filter(option => !textSelection.includes(option));
      if (deselectedOptions.length > 0) {
        deselectedOptions.forEach(option => {
          ignoreSelect.current = true;
          console.log('deselecting', option);
          const optionValue = getOptionsMatchingValue((val) => val.toLowerCase() === option.trim().toLowerCase())[0];
          selectOption(event, optionValue);
        });
      }
    }

    defaultOnInput?.(event);
  }

  state.input.value = value ?? calculatedValue;

  // reset value when closed
  React.useEffect(() => {
    if (!open) {
      setValue(selectedOptions.join(', '));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Do not use tab to select
  state.input.onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab') {
      return;
    }

    defaultOnKeyDown?.(event);
  }

  return state;
};

export const ComboboxMultiA: ForwardRefComponent<ComboboxProps> = React.forwardRef((props, ref) => {
  const state = useComboboxMultiA(props, ref);
  const contextValues = useComboboxContextValues(state);

  useComboboxStyles_unstable(state);
  return renderCombobox_unstable(state, contextValues);
});