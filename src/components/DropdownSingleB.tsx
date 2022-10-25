import * as React from 'react';
import { renderDropdown_unstable, useDropdown_unstable, useDropdownStyles_unstable } from '@fluentui/react-components/unstable';
import type { DropdownProps, DropdownState } from '@fluentui/react-components/unstable';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useComboboxContextValues } from './ComboboxContext';

const useDropdownSingleB = (props: DropdownProps, ref: React.Ref<HTMLButtonElement>): DropdownState => {
  const state = useDropdown_unstable(props, ref);
  const { activeOption, getCount, getIndexOfId, getOptionAtIndex, getOptionsMatchingValue, open, selectOption, selectedOptions, setOpen } = state;

  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (touched) {
      activeOption && selectOption({} as any, activeOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ activeOption ]);

  const defaultOnKeyDown = state.button.onKeyDown;

  state.button.onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // run the original function
    defaultOnKeyDown?.(event);

    // check if the pressed keys are an "open" key combo
    const { altKey, ctrlKey, key, metaKey } = event;
    const shouldOpen = key === ' ' || key === 'Enter' || (altKey && key === 'ArrowDown') || (altKey && key === 'ArrowUp');

    // do not open the listbox unless it was an explicit open interaction
    if (!open && !shouldOpen) {
      setOpen(event, false);

      // navigate options while closed
      const currentSelection = getOptionsMatchingValue((value) => value === selectedOptions[0]);
      const currentIndex = currentSelection[0] ? getIndexOfId(currentSelection[0].id) : -1;
      const maxIndex = getCount() - 1;
      let nextIndex = currentIndex;
      switch(key) {
        case 'ArrowDown':
          nextIndex = Math.min(maxIndex, currentIndex + 1);
          break;
        case 'ArrowUp':
          nextIndex = Math.max(0, currentIndex - 1);
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = maxIndex;
          break;
      }
      if (nextIndex !== currentIndex) {
        const nextOption = getOptionAtIndex(nextIndex);
        nextOption && selectOption(event, nextOption);
      }
    }

    // handle touched/untouched state
    const navigationKeys = ['ArrowDown', 'ArrowUp', 'Home', 'End', 'PageUp', 'PageDown'];
    const isTypeKey = key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey;
    if (open && ( navigationKeys.includes(key) || isTypeKey )) {
      setTouched(true);
    }
  };



  return state;
};

export const DropdownSingleB: ForwardRefComponent<DropdownProps> = React.forwardRef((props, ref) => {
  const state = useDropdownSingleB(props, ref);
  const contextValues = useComboboxContextValues(state);

  useDropdownStyles_unstable(state);
  return renderDropdown_unstable(state, contextValues);
});