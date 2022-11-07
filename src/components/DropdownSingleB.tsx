import * as React from 'react';
import { renderDropdown_unstable, useDropdown_unstable, useDropdownStyles_unstable } from '@fluentui/react-components/unstable';
import type { DropdownProps, DropdownState } from '@fluentui/react-components/unstable';
import { useTimeout } from '@fluentui/react-utilities';
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

  /* Copied typing logic from useDropdown */
  const searchString = React.useRef('');
  const [setKeyTimeout, clearKeyTimeout] = useTimeout();

  const getNextMatchingOption = () => {
    // first check for matches for the full searchString
    let matcher = (optionValue: string) => optionValue.toLowerCase().indexOf(searchString.current) === 0;
    let matches = getOptionsMatchingValue(matcher);
    let startIndex = activeOption ? getIndexOfId(activeOption.id) : 0;

    // if the dropdown is already open and the searchstring is a single character,
    // then look after the current activeOption for letters
    // this is so slowly typing the same letter will cycle through matches
    if (open && searchString.current.length === 1) {
      startIndex++;
    }

    // if there are no direct matches, check if the search is all the same letter, e.g. "aaa"
    if (!matches.length) {
      const letters = searchString.current.split('');
      const allSameLetter = letters.length && letters.every(letter => letter === letters[0]);

      // if the search is all the same letter, cycle through options starting with that letter
      if (allSameLetter) {
        startIndex++;
        matcher = (optionValue: string) => optionValue.toLowerCase().indexOf(letters[0]) === 0;
        matches = getOptionsMatchingValue(matcher);
      }
    }

    // if there is an active option and multiple matches,
    // return first matching option after the current active option, looping back to the top
    if (matches.length > 1 && activeOption) {
      const nextMatch = matches.find(option => getIndexOfId(option.id) >= startIndex);
      return nextMatch ?? matches[0];
    }

    return matches[0] ?? undefined;
  };

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
      // auto-select when typing while closed
      if (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey) {
        // partially copied from useDropdown
        searchString.current += event.key.toLowerCase();
        setKeyTimeout(() => {
          searchString.current = '';
        }, 500);

        const nextOption = getNextMatchingOption();
        if (nextOption?.id) {
          nextIndex = getIndexOfId(nextOption?.id);
        }
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