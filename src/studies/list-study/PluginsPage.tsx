import * as React from "react";
import {
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
  ToolbarButton,
  useFocusableGroup,
} from "@fluentui/react-components";

import type {
  DialogProps,
  SelectionItemId,
} from "@fluentui/react-components";

import './lists.css';
import Header from './Header';

type Item = {
  id: string;
  name: string;
  description: string;
  lastUpdated: { label: string; timestamp: number; };
  author: { label: string; status: string; };
};

const items: Item[] = [
  {
    id: '1',
    name: 'Image formatting',
    description: 'Crop and optimize any uploaded image for the web.',
    author: { label: "John Doe", status: "available" },
    lastUpdated: { label: "12 days ago", timestamp: 1 },
  },
  {
    id: '2',
    name: 'Comments spam filtering',
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7 months ago", timestamp: 1 },
    description: 'Automatically filter out spam comments from your website.',
  },
  {
    id: '3',
    name: 'SEO optimization',
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "1 year ago", timestamp: 2 },
    description: 'This probably doesn\'t do anything helpful, but it doesn\'t hurt to try.'
  },
  {
    id: '4',
    name: 'Custom styles',
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "5 weeks ago", timestamp: 2 },
    description: 'Customize the look and feel of your website with custom CSS.'
  },
  {
    id: '5',
    name: 'User authentication',
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "2 days ago", timestamp: 3 },
    description: 'Allow users to sign up and sign in. Can be used to store emails, preferences, and other user data.'
  },
  {
    id: '6',
    name: 'Analytics',
    author: { label: "Alice Bernhardt", status: "busy" },
    lastUpdated: { label: "4 months ago", timestamp: 3 },
    description: 'Track user interactions and page views on your website.'
  },
  {
    id: '7',
    name: 'Video embeds',
    author: { label: "Caroline Tate-Valdez", status: "offline" },
    lastUpdated: { label: "21 days ago", timestamp: 3 },
    description: 'Embed videos from YouTube, Vimeo, or other video hosting services.'
  },
  {
    id: '8',
    name: 'Document sharing',
    author: { label: "Eliza May Finley", status: "available" },
    lastUpdated: { label: "3 years ago", timestamp: 3 },
    description: 'Upload documents to share with users.'
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
    "header header header" auto
      "null action secondary_action" auto / 1fr auto auto
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

const PluginsPage = () => {
  const [selectedFiles, setSelectedFiles] = React.useState<SelectionItemId[]>([]);
  const [filesToDelete, setFilesToDelete] = React.useState<SelectionItemId[]>([]);
  const [confOpen, setConfOpen] = React.useState(false);
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [activePlugin, setActivePlugin] = React.useState<Item>(items[0]);

  const isCardSelected = (id: string) => selectedFiles.includes(id);

  const CardItem = (props: { data: Item }) => {
    const { id, name, description } = props.data;
    const listItemStyles = useListItemRootStyles();
    const styles = useListItemStyles();
  
    // This will be triggered by user pressing Enter or clicking on the list item
    const onAction = React.useCallback((event: any) => {
      // This prevents the change in selection on click/Enter
      event.preventDefault();
      setActivePlugin(props.data);
      setDetailsOpen(true);
    }, [props.data]);

    const selectedString = isCardSelected(id) ? 'selected' : 'not selected';
    const focusAttributes = useFocusableGroup();
  
    return (
      <ListItem
        value={id}
        className={mergeClasses(listItemStyles, styles.listItem)}
        checkmark={{
          className: styles.checkmark,
          "aria-label": name,
        }}
        role="listitem"
        aria-label={name + ', ' + description + ', ' + selectedString}
        onAction={onAction}
        {...focusAttributes}
      >
        <div className={styles.preview}>
          <Image
            fit="cover"
            className={styles.image}
            src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png"
            alt="Plugin Preview"
          />
        </div>
        <div className={styles.header}>
          <Text className={styles.title}>{name}</Text>
          <Caption1 className={styles.caption}>{description}</Caption1>
        </div>
        <div className={styles.action}>
          <Button
            appearance="primary"
            onClick={(e) => {
              e.preventDefault();
              setActivePlugin(props.data);
              setUpdateOpen(true);
            }}
          >
            Update
          </Button>
        </div>
        <div className={styles.secondaryAction}>
          <Button
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
      <Text as="h2" size={900}>Installed Plugins</Text>

      <Toolbar aria-label="plugin actions" size="large">
        <ToolbarButton onClick={() => setSelectedFiles(items.map(i => i.id))} disabledFocusable={selectedFiles.length === items.length}>Select All</ToolbarButton>
        <ToolbarButton onClick={() => setSelectedFiles([])} disabledFocusable={selectedFiles.length === 0}>Unselect All</ToolbarButton>
        <ToolbarButton onClick={() => { setFilesToDelete(selectedFiles); setConfOpen(true); }} disabled={selectedFiles.length === 0}>Delete selected plugins</ToolbarButton>
      </Toolbar>

      <List aria-label="plugins" role="list" className="list" selectionMode="multiselect" selectedItems={selectedFiles} onSelectionChange={(_, data) => setSelectedFiles(data.selectedItems)}>
        {items.map((item) => (
          <CardItem key={item.id} data={item} />
        ))}
      </List>
      <CardDetailsDialog open={detailsOpen} onOpenChange={(_: any, data: { open: boolean }) => setDetailsOpen(data.open)} data={activePlugin} />
      <ConfirmationDialog open={confOpen} onOpenChange={closeConfirmationDialog} selectedItems={filesToDelete} />
      <UpdateConfirmationDialog open={updateOpen} onOpenChange={(_: any, data: { open: boolean }) => setUpdateOpen(data.open)} data={activePlugin} />
    </>
  );
};

const CardDetailsDialog = (props: Omit<DialogProps, 'children'> & { data: Item }) => {
  const {open, onOpenChange} = props;
  const { name, author, lastUpdated, description } = props.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{name}</DialogTitle>
          <DialogContent>
            <Text>Last updated {lastUpdated.label} by {author.label}</Text>
            <p><Text>{description}</Text></p>
          </DialogContent>
          <DialogActions>
            <Button appearance="primary" onClick={(ev) => onOpenChange?.(ev, {open: false} as any)}>Close</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}

const UpdateConfirmationDialog = (props: Omit<DialogProps, 'children'> & { data: Item }) => {
  const {open, onOpenChange} = props;
  const { name } = props.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Updated {name}</DialogTitle>
          <DialogContent>
            <Text>Plugin successfully updated</Text>
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


const ConfirmationDialog = (props: Omit<DialogProps, 'children'> & { selectedItems: SelectionItemId[] }) => {
  const { open, onOpenChange, selectedItems } = props;

  const deletedFiles = items.filter((item) => selectedItems.includes(item.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Deleted {selectedItems.length} plugins</DialogTitle>
          <DialogContent>
            <ul>
              {deletedFiles.map((f) => (
                <li key={f.id}>{f.name}</li>
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

export default PluginsPage;