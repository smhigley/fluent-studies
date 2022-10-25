import { makeStyles, shorthands } from '@griffel/react';
import { Option } from '@fluentui/react-components/unstable';

// Create a listbox header component
type ListboxHeaderProps = {
  selectedCount: number;
  selectedId?: string;
}

const useListboxHeaderStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  option: {
    backgroundColor: 'transparent',
    color: '#616161'
  },
  optionCheck: {
    display: 'none'
  },
  count: {
    color: '#616161',
    ...shorthands.padding('6px', '8px')
  }
});

export const ListboxHeader = (props: ListboxHeaderProps) => {
  const { selectedCount, selectedId } = props;
  const styles = useListboxHeaderStyles();

  return (
    <div className={styles.root}>
      <span className={styles.count} id={selectedId}>{selectedCount} selected</span>
      {selectedCount > 0 ? 
        <Option role="menuitem" id="clear" checkIcon={{ className: styles.optionCheck }} className={styles.option}>Clear</Option>
        : null
      }
    </div>
  )
};
