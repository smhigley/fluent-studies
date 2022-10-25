import { ComboboxContextValues, ComboboxState, DropdownState } from '@fluentui/react-components/unstable';

export function useComboboxContextValues(state: ComboboxState | DropdownState): ComboboxContextValues {
  const {
    activeOption,
    appearance,
    focusVisible,
    open,
    registerOption,
    selectedOptions,
    selectOption,
    setActiveOption,
    setOpen,
    size,
  } = state;

  const combobox = {
    activeOption,
    appearance,
    focusVisible,
    open,
    registerOption,
    selectedOptions,
    selectOption,
    setActiveOption,
    setOpen,
    size,
  };

  return { combobox };
}
