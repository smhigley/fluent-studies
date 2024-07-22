import * as React from "react";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from "@fluentui/react-icons";
import {
  PresenceBadgeStatus,
  Avatar,
  Button,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Field,
  Select,
  SpinButton,
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
  MenuItem,
  TableColumnSizingOptions,
  useAnnounce,
} from "@fluentui/react-components";

import type {
  DataGridProps,
  DialogProps,
} from "@fluentui/react-components";

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: "Meeting notes", icon: <DocumentRegular /> },
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7h ago", timestamp: 1 },
    lastUpdate: {
      label: "You edited this",
      icon: <EditRegular />,
    },
  },
  {
    file: { label: "Thursday presentation", icon: <FolderRegular /> },
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: "Training recording", icon: <VideoRegular /> },
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
    lastUpdate: {
      label: "You shared this in a Teams chat",
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "file",
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return "File";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout truncate media={item.file.icon}>
          {item.file.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "author",
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return "Author";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout
          truncate
          media={
            <Avatar
              aria-label={item.author.label}
              name={item.author.label}
              badge={{ status: item.author.status }}
            />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "lastUpdated",
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return "Last updated";
    },

    renderCell: (item) => {
      return (
        <TableCellLayout truncate>{item.lastUpdated.label}</TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: "lastUpdate",
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
    renderHeaderCell: () => {
      return "Last update";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout truncate media={item.lastUpdate.icon}>
          {item.lastUpdate.label}
        </TableCellLayout>
      );
    },
  }),
];

const columnData: { [key: string | number]: any } = {
  file: {
    label: 'File',
    idealWidth: 120,
    minWidth: 50,
  },
  author: {
    label: 'Author',
    idealWidth: 120,
    minWidth: 50,
  },
  lastUpdated: {
    label: 'Last updated',
    minWidth: 50,
  },
  lastUpdate: {
    label: 'Last update',
    minWidth: 50,
  },
};

export const PageB = () => {
  const { announce } = useAnnounce();
  const refMap = React.useRef<Record<string, HTMLElement | null>>({});
  const keyboardSortTracking = React.useRef(false);

  const [orderedColumns, setOrderedColumns] = React.useState(columns);
  const [columnSizingOptions, setColumnSizingOptions] = React.useState<TableColumnSizingOptions>(columnData);
  const [orderOpen, setOrderOpen] = React.useState(false);
  const [currentOrderId, setCurrentOrderId] = React.useState<string | number>('file');
  const [menuOpen, setMenuOpen] = React.useState<string | number | undefined>();
  const [sortState, setSortState] = React.useState<
    Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
  >({
    sortColumn: "file",
    sortDirection: "ascending",
  });

  const focusColumnButton = (columnId: string | number) => {
    // hacky, because the focusable element is actually the inner button
    (refMap.current[columnId]?.querySelector('.fui-DataGridHeaderCell__button') as HTMLElement)?.focus();
  }

  const updateMenuOpenState = (columnId: string | number, open: boolean) => {
    if (open) {
      setMenuOpen(columnId);
    }
    else {
      setMenuOpen(undefined);
    }
  }

  const getColumnOrder = (columnId: string | number) => {
    return orderedColumns.findIndex((column) => column.columnId === columnId);
  }

  const updateColumnOrder = (columnId: string | number, index: number) => {
    if (index < 0 || index > columns.length - 1) {
      return;
    }

    const curIndex = getColumnOrder(columnId);
    const newItems = [...orderedColumns];
    const item = newItems.splice(curIndex, 1)[0];
    newItems.splice(index, 0, item);
    setOrderedColumns(newItems);
    focusColumnButton(columnId);
    announce(`${columnData[columnId].label} is now at index ${index + 1}`);
  }

  const updateSortState = (columnId: string | number) => {
    console.log('updateSortState called');
    const { sortColumn, sortDirection } = sortState;
    if (sortColumn === columnId) {
      const newDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
      setSortState({
        sortColumn: columnId,
        sortDirection: newDirection
      });
      announce('sorted ' + newDirection);
    }
    else {
      setSortState({
        sortColumn: columnId,
        sortDirection: 'ascending'
      });
      announce('sorted ascending');
    }
    focusColumnButton(columnId);
  }

  const onColumnResize = React.useCallback((_: any, { columnId, width }: { columnId: string | number, width: number}) => {
    setColumnSizingOptions((state) => ({
      ...state,
      [columnId]: {
        ...state[columnId],
        idealWidth: width,
      },
    }));
  }, []);

  const onColumnHeaderClick = (ev: React.MouseEvent, columnId: string | number) => {
    // update sort only for left click; menu opens on right click
    if (ev.button === 0 && !keyboardSortTracking.current) {
      updateSortState(columnId);
    }
    keyboardSortTracking.current = false;
  }

  const onColumnHeaderKeyUp = (ev: React.KeyboardEvent, columnId: string | number) => {
    // update sort only for enter, open menu on space
    if (ev.key === 'Enter') {
      updateSortState(columnId);
      keyboardSortTracking.current = true;
    }
    else if (ev.key === ' ') {
      updateMenuOpenState(columnId, true);
      keyboardSortTracking.current = true;
    }
    ev.stopPropagation();
    ev.preventDefault();
  }

  return (
    <>
    <h1>Recent files (B)</h1>
    <div style={{ overflowX: "auto" }}>
      <DataGrid
        items={items}
        columns={orderedColumns}
        sortable
        sortState={sortState}
        getRowId={(item) => item.file.label}
        selectionMode="multiselect"
        resizableColumns
        columnSizingOptions={columnSizingOptions}
        onColumnResize={onColumnResize}
      >
        <DataGridHeader>
          <DataGridRow
            selectionCell={{
              checkboxIndicator: { "aria-label": "Select all rows" },
            }}
          >
            {({ renderHeaderCell, columnId }, dataGrid) =>
              dataGrid.resizableColumns ? (
                <Menu openOnContext open={menuOpen === columnId} onOpenChange={(_, data) => updateMenuOpenState(columnId, data.open)}>
                  <MenuTrigger disableButtonEnhancement>
                    <DataGridHeaderCell
                      ref={(el) => (refMap.current[columnId] = el)}
                      onClick={(ev: React.MouseEvent) => onColumnHeaderClick(ev, columnId)}
                      onKeyUp={(ev: React.KeyboardEvent) => onColumnHeaderKeyUp(ev, columnId)}
                    >
                      {renderHeaderCell()}
                    </DataGridHeaderCell>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                    <MenuItem onClick={() => updateSortState(columnId)}>Sort</MenuItem>
                      <MenuItem
                        onClick={dataGrid.columnSizing_unstable.enableKeyboardMode(
                          columnId
                        )}
                      >
                        Resize Column (keyboard)
                      </MenuItem>
                      <MenuItem onClick={() => {
                        setOrderOpen(true);
                        setCurrentOrderId(columnId);
                      }}>Reorder</MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              ) : (
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              )
            }
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item>
              key={rowId}
              selectionCell={{
                checkboxIndicator: { "aria-label": "Select row" },
              }}
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
      <OrderDialog open={orderOpen} onOpenChange={(_, data: { open: boolean }) => setOrderOpen(data.open)} columnId={currentOrderId} columnIndex={getColumnOrder(currentOrderId)} onOrder={(newIndex) => updateColumnOrder(currentOrderId, newIndex)} />
    </div>
    </>
  );
};

const OrderDialog = (props: Omit<DialogProps, 'children'> & { columnId: string | number; columnIndex: number; onOrder: (index: number) => void }) => {
  const { open, columnId, columnIndex, onOpenChange, onOrder } = props;

  const [newIndex, setNewIndex] = React.useState(columnIndex);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Change width for {columnData[columnId].label}</DialogTitle>
          <DialogContent>
          <Field label="New column index">
          <Select defaultValue={columnIndex + 1} onChange={(ev) => setNewIndex(parseInt(ev.target.value) - 1)}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Select>
          </Field>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Cancel</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" onClick={() => onOrder(newIndex)}>Confirm</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}