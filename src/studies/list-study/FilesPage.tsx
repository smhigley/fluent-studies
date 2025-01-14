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
  Button,
  Caption1,
  Image,
  List,
  ListItem,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  makeStyles,
  makeResetStyles,
  mergeClasses,
  Text,
  Toolbar,
  ToolbarButton
} from "@fluentui/react-components";

import type {
  DialogProps,
  SelectionItemId,
} from "@fluentui/react-components";

import './lists.css';
import Header from './Header';

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
  id: string;
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    id: '1',
    file: { label: "Aerial video of the Grand Canyon", icon: <VideoRegular /> },
    author: { label: "Casey Frye", status: "offline" },
    lastUpdated: { label: "12h ago", timestamp: 1 },
    lastUpdate: {
      label: "You recently viewed this",
      icon: <OpenRegular />,
    },
  },
  {
    id: '2',
    file: { label: "Meeting notes", icon: <DocumentRegular /> },
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7h ago", timestamp: 1 },
    lastUpdate: {
      label: "You edited this",
      icon: <EditRegular />,
    },
  },
  {
    id: '3',
    file: { label: "Thursday presentation", icon: <FolderRegular /> },
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    id: '4',
    file: { label: "Training recording", icon: <VideoRegular /> },
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    id: '5',
    file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
    lastUpdate: {
      label: "You shared this in a Teams chat",
      icon: <PeopleRegular />,
    },
  },
  {
    id: '6',
    file: { label: "Market Research", icon: <DocumentRegular /> },
    author: { label: "Alice Bernhardt", status: "busy" },
    lastUpdated: { label: "June 13 at 12:10 AM", timestamp: 3 },
    lastUpdate: {
      label: "This was shared with you",
      icon: <PeopleRegular />,
    },
  },
  {
    id: '7',
    file: { label: "Monday standup meeting notes", icon: <VideoRegular /> },
    author: { label: "Caroline Tate-Valdez", status: "offline" },
    lastUpdated: { label: "Mon at 9:00 AM", timestamp: 3 },
    lastUpdate: {
      label: "You shared this in a Teams chat",
      icon: <PeopleRegular />,
    },
  },
  {
    id: '8',
    file: { label: "Research on cat behavior", icon: <DocumentPdfRegular /> },
    author: { label: "Eliza May Finley", status: "available" },
    lastUpdated: { label: "Fri at 3:15 PM", timestamp: 3 },
    lastUpdate: {
      label: "You recently opened this",
      icon: <OpenRegular />,
    },
  },
  {
    id: '9',
    file: { label: "Project brainstorming on new FY25 objectives", icon: <FolderRegular /> },
    author: { label: "Michael Sanchez", status: "away" },
    lastUpdated: { label: "Wed at 3:40 PM", timestamp: 3 },
    lastUpdate: {
      label: "This was shared with you in a Teams chat",
      icon: <PeopleRegular />,
    },
  },
  {
    id: '10',
    file: { label: "Project brainstorming on new FY25 objectives -- final", icon: <FolderRegular /> },
    author: { label: "Michael Sanchez", status: "away" },
    lastUpdated: { label: "Thurs at 9:10 AM", timestamp: 3 },
    lastUpdate: {
      label: "This was shared with you in a Teams chat",
      icon: <PeopleRegular />,
    },
  },
];

const useListItemRootStyles = makeResetStyles({
  position: "relative",
  padding: "8px",
  flexGrow: "1",
  border: "1px solid grey",
  alignItems: "center",
  borderRadius: "8px",
  gridTemplate: `"preview preview preview" auto
      "header action secondary_action" auto / 1fr auto auto
    `,
});

const useListItemStyles = makeStyles({
  listItem: {
    display: "grid",
    padding: "8px",
    gap: "4px",
  },
  caption: {
  },
  image: {
    height: "160px",
    maxWidth: "100%",
    borderRadius: "5px",
  },
  title: {
    fontWeight: 600,
    display: "block",
  },
  checkmark: {
    position: "absolute",
    left: "10px",
    top: "10px",
    zIndex: 1,
  },
  preview: { gridArea: "preview", overflow: "hidden" },
  header: { gridArea: "header" },
  action: { gridArea: "action" },
  secondaryAction: { gridArea: "secondary_action" },
});

const FilesPage = () => {
  const [selectedFiles, setSelectedFiles] = React.useState<SelectionItemId[]>([]);
  const [filesToDelete, setFilesToDelete] = React.useState<SelectionItemId[]>([]);
  const [confOpen, setConfOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [activeFile, setActiveFile] = React.useState<Item>(items[0]);

  const CardItem = (props: { data: Item }) => {
    const { id, file, lastUpdated } = props.data;
    const listItemStyles = useListItemRootStyles();
    const styles = useListItemStyles();
  
    // This will be triggered by user pressing Enter or clicking on the list item
    const onAction = React.useCallback((event: any) => {
      // This prevents the change in selection on click/Enter
      event.preventDefault();
      setActiveFile(props.data);
      setDetailsOpen(true);
    }, []);
  
    return (
      <ListItem
        value={id}
        className={mergeClasses(listItemStyles, styles.listItem)}
        checkmark={{
          root: { role: "gridcell" },
          className: styles.checkmark,
          "aria-label": file.label,
        }}
        aria-label={file.label}
        onAction={onAction}
      >
        <div role="gridcell" className={styles.preview}>
          <Image
            fit="cover"
            className={styles.image}
            src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png"
            alt="File Preview"
          />
        </div>
        <div role="gridcell" className={styles.header}>
          <Text className={styles.title}>{file.label}</Text>
          <Caption1 className={styles.caption}>{lastUpdated.label}</Caption1>
        </div>
        <div role="gridcell" className={styles.action}>
          <Button
            appearance="primary"
            onClick={(e) => {
              e.preventDefault();
              setFilesToDelete([ id ]);
              setConfOpen(true);
            }}
          >
            Delete
          </Button>
        </div>
      </ListItem>
    );
  };

  const closeConfirmationDialog = (_: any, data: { open: boolean }) => {
    setConfOpen(data.open);
    setSelectedFiles([]);
    setFilesToDelete([]);
  }

  return (
    <>
      <Header />
      <Text as="h2" size={900}>File manager</Text>

      <Toolbar aria-label="file actions" size="large">
        <ToolbarButton onClick={() => setSelectedFiles(items.map(i => i.id))} disabledFocusable={selectedFiles.length === items.length}>Select All</ToolbarButton>
        <ToolbarButton onClick={() => setSelectedFiles([])} disabledFocusable={selectedFiles.length === 0}>Unselect All</ToolbarButton>
        <ToolbarButton onClick={() => { setFilesToDelete(selectedFiles); setConfOpen(true); }} disabled={selectedFiles.length === 0}>Delete selected files</ToolbarButton>
      </Toolbar>

      <List navigationMode="composite" aria-label="files" className="list" selectionMode="multiselect" selectedItems={selectedFiles} onSelectionChange={(_, data) => setSelectedFiles(data.selectedItems)}>
        {items.map((item) => (
          <CardItem key={item.id} data={item} />
        ))}
      </List>
      <ConfirmationDialog open={confOpen} onOpenChange={closeConfirmationDialog} selectedItems={filesToDelete} />
      <CardDetailsDialog open={detailsOpen} onOpenChange={(_, data: { open: boolean }) => setDetailsOpen(data.open)} data={activeFile} />
    </>
  );
};

const CardDetailsDialog = (props: Omit<DialogProps, 'children'> & { data: Item }) => {
  const {open, onOpenChange} = props;
  const { file, author, lastUpdated, lastUpdate } = props.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{file.label}</DialogTitle>
          <DialogContent>
            <Text>Last updated at {lastUpdated.label} by {author.label}</Text>
            <p><Text>{lastUpdate.label}</Text></p>
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="primary" onClick={(ev) => onOpenChange?.(ev, {open: false} as any)}>Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}


const ConfirmationDialog = (props: Omit<DialogProps, 'children'> & { selectedItems: SelectionItemId[] }) => {
  const { open, onOpenChange, selectedItems } = props;

  const deletedFiles = items.filter((item) => selectedItems.includes(item.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Deleted {selectedItems.length} files</DialogTitle>
          <DialogContent>
            <ul>
              {deletedFiles.map((f) => (
                <li key={f.id}>{f.file.label}</li>
              ))}
            </ul>
          </DialogContent>
          <DialogActions>
            <DialogTrigger action="close" disableButtonEnhancement>
              <Button appearance="primary" onClick={(ev) => onOpenChange?.(ev, {open: false} as any)}>Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}

export default FilesPage;