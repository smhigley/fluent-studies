import * as React from 'react';
import { renderDropdown_unstable, useDropdown_unstable, useDropdownStyles_unstable } from '@fluentui/react-components/unstable';
import type { DropdownProps, DropdownState } from '@fluentui/react-components/unstable';
import { useId } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useComboboxContextValues } from './ComboboxContext';
import { ListboxHeader } from './ListboxHeader';

const useDropdownMultiB = (props: DropdownProps, ref: React.Ref<HTMLButtonElement>): DropdownState => {
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

  const state = useDropdown_unstable(customProps, ref);
  const { selectedOptions } = state;

  const listboxLabelId = useId('listbox-header');

  // customize Listbox to render a header with count and a clear button
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

export const DropdownMultiB: ForwardRefComponent<DropdownProps> = React.forwardRef((props, ref) => {
  const state = useDropdownMultiB(props, ref);
  const contextValues = useComboboxContextValues(state);

  useDropdownStyles_unstable(state);
  return renderDropdown_unstable(state, contextValues);
});