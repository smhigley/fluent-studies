import * as React from 'react';
import { renderOption_unstable, useOption_unstable, useOptionStyles_unstable } from '@fluentui/react-components/unstable';
import type { OptionProps, OptionState } from '@fluentui/react-components/unstable';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

const useOptionMultiB = (props: OptionProps, ref: React.Ref<HTMLElement>): OptionState => {
  const state = useOption_unstable(props, ref);
  const { selected } = state;

  state.root.role = 'menuitemcheckbox';
  state.root['aria-selected'] = undefined;
  state.root['aria-checked'] = `${selected}`;

  return state;
};

export const OptionMultiB: ForwardRefComponent<OptionProps> = React.forwardRef((props, ref) => {
  const state = useOptionMultiB(props, ref);

  useOptionStyles_unstable(state);
  return renderOption_unstable(state);
});