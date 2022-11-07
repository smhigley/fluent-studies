import * as React from 'react';
import { renderCombobox_unstable, useCombobox_unstable, useComboboxStyles_unstable } from '@fluentui/react-components/unstable';
import type { ComboboxProps, ComboboxState } from '@fluentui/react-components/unstable';
import { useId } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useComboboxContextValues } from './ComboboxContext';
import { ListboxHeader } from './ListboxHeader';



const useComboboxMultiB = (props: ComboboxProps, ref: React.Ref<HTMLInputElement>): ComboboxState => {
  const customOptionSelect = (event: any, {optionValue, selectedOptions}: any) => {
    if (optionValue === 'Clear') {
      (state as any).clearSelection();
    }

    props.onOptionSelect?.(event, { optionValue, selectedOptions});
  }

  const customProps = {
    ...props,
    onOptionSelect: customOptionSelect
  };

  const state = useCombobox_unstable(customProps, ref);
  const { open, selectedOptions, value: calculatedValue } = state;
  const { onKeyDown: defaultOnKeyDown, onInput: defaultOnInput } = state.input;

  const [value, setValue] = React.useState<string | undefined>(props.defaultValue as string);


  // Do not use space to select
  state.input.onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ') {
      return;
    }

    defaultOnKeyDown?.(event);
  }

  state.input.onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    defaultOnInput?.(event);
  }

  // clear and restore input value when opening/closing
  React.useEffect(() => {
    if (open) {
      setValue(value || '');
    }
    else {
      setValue(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // clear input value after selecting an option
  React.useEffect(() => {
    if (open) {
      setValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  state.input.value = value ?? calculatedValue;

  // customize Listbox to render a header with count and a clear button
  const listboxLabelId = useId('listbox-header');
  if (state.listbox) {
    state.listbox.role = 'menu';
    state.listbox['aria-labelledby'] = listboxLabelId;
    state.listbox.children = (
      <>
        <ListboxHeader selectedCount={selectedOptions.length} selectedId={listboxLabelId} />
        {state.listbox.children}
      </>
    );
  }

  return state;
};

export const ComboboxMultiB: ForwardRefComponent<ComboboxProps> = React.forwardRef((props, ref) => {
  const state = useComboboxMultiB(props, ref);
  const contextValues = useComboboxContextValues(state);

  useComboboxStyles_unstable(state);
  return renderCombobox_unstable(state, contextValues);
});