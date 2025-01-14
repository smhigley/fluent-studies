import * as React from "react";
import {
  Button,
  Divider,
  List,
  ListItem,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Persona,
  Text,
  Toolbar,
  ToolbarButton,
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

const users: Item[] = [
  {
    id: '1',
    name: 'John Doe',
    description: 'Member since May 2021.',
    author: { label: "John Doe", status: "available" },
    lastUpdated: { label: "12 days ago", timestamp: 1 },
  },
  {
    id: '2',
    name: 'Max Mustermann',
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7 months ago", timestamp: 1 },
    description: 'Joined 2 weeks ago.',
  },
  {
    id: '3',
    name: 'Erika Mustermann',
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "1 year ago", timestamp: 2 },
    description: 'Member since February 2023.'
  },
  {
    id: '4',
    name: 'Elvira Jenkins',
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "5 weeks ago", timestamp: 2 },
    description: 'Member since September 2024.'
  },
  {
    id: '5',
    name: 'Jane Doe',
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "2 days ago", timestamp: 3 },
    description: 'Joined 2 days ago.'
  },
  {
    id: '6',
    name: 'Alice Bernhardt',
    author: { label: "Alice Bernhardt", status: "busy" },
    lastUpdated: { label: "4 months ago", timestamp: 3 },
    description: 'Member since December 2024.'
  },
  {
    id: '7',
    name: 'Caroline Tate-Valdez',
    author: { label: "Caroline Tate-Valdez", status: "offline" },
    lastUpdated: { label: "21 days ago", timestamp: 3 },
    description: 'Joined 3 weeks ago.'
  },
  {
    id: '8',
    name: 'Eliza May Finley',
    author: { label: "Eliza May Finley", status: "available" },
    lastUpdated: { label: "3 years ago", timestamp: 3 },
    description: 'Member since June 2022.'
  },
];

const images: Item[] = [
  {
    id: 'i1',
    name: 'Cats in a bed',
    description: 'A pile of roughly 5 or 6 cuddling cats.',
    author: { label: "John Doe", status: "available" },
    lastUpdated: { label: "12 days ago", timestamp: 1 },
  },
  {
    id: 'i2',
    name: 'Diagram of the anatomy of a sea cucumber',
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7 months ago", timestamp: 1 },
    description: 'Scientific diagram with emphasis on the digestive and respiratory systems.',
  },
  {
    id: 'i3',
    name: 'Colorful spanish dancer sea cucumber',
    author: { label: "Erika Mustermann", status: "busy" },
    lastUpdated: { label: "1 year ago", timestamp: 2 },
    description: 'A bright red sea cucumber swimming vertically in shallow water.'
  },
  {
    id: 'i4',
    name: 'Capybaras eating oranges',
    author: { label: "John Doe", status: "away" },
    lastUpdated: { label: "5 weeks ago", timestamp: 2 },
    description: 'A group of 4 happy capybaras hanging out in a hot spring surrounded by oranges.'
  },
  {
    id: 'i5',
    name: 'Schrodinger\'s cat',
    author: { label: "Jane Doe", status: "offline" },
    lastUpdated: { label: "2 days ago", timestamp: 3 },
    description: 'A cardboard box, it may or may not contain a cat.'
  },
];

const ListHome = () => {
  const [selectedUsers, setSelectedUsers] = React.useState<SelectionItemId[]>([]);
  const [selectedImages, setSelectedImages] = React.useState<SelectionItemId[]>([]);
  const [confOpen, setConfOpen] = React.useState(false);
  const [userOpen, setUserOpen] = React.useState(false);

  const closeImageConfirmationDialog = (_: any, data: { open: boolean }) => {
    setConfOpen(data.open);
    setSelectedImages([]);
  };

  const closeUserConfirmationDialog = (_: any, data: { open: boolean }) => {
    setUserOpen(data.open);
    setSelectedUsers([]);
  };

  return (
    <>
      <Header />
      <Text as="h2" size={900}>Dashboard</Text>

      <p>Congratulations on temporarily maintaining a fake website! Here are a few sets of imagined data that would probably be useful to running a website.</p>

      <Text as="h3" size={600}>Manage uploaded images</Text>
      <Toolbar aria-label="image actions" size="large">
        <ToolbarButton onClick={() => setSelectedImages([])} disabledFocusable={selectedImages.length === 0}>Unselect all</ToolbarButton>
        <ToolbarButton onClick={() => { setConfOpen(true); }} disabled={selectedImages.length === 0}>Delete selected images</ToolbarButton>
      </Toolbar>

      <List
        selectionMode="multiselect"
        selectedItems={selectedImages}
        onSelectionChange={(_, data) => setSelectedImages(data.selectedItems)}
        aria-label="Uploads"
      >
        {images.map((imageData) => (
          <ListItem
            key={imageData.id}
            value={imageData.id}
            checkmark={{ "aria-hidden": "true" }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '6px' }}>
              <Text size={400}>{imageData.name}</Text>
              <Text size={200}>{imageData.description}</Text>
            </div>
          </ListItem>
        ))}
      </List>

      <Divider style={{ margin: '3em 0'}} />

      <Text as="h3" size={600}>Manage users</Text>
      <Toolbar aria-label="user actions" size="large">
        <ToolbarButton onClick={() => setSelectedUsers([])} disabledFocusable={selectedUsers.length === 0}>Unselect all</ToolbarButton>
        <ToolbarButton onClick={() => { setUserOpen(true); }} disabled={selectedUsers.length === 0}>Remove selected users</ToolbarButton>
      </Toolbar>

      <List
        aria-label="Users"
        selectionMode="multiselect"
        selectedItems={selectedUsers}
        onSelectionChange={(_, data) => setSelectedUsers(data.selectedItems)}
        role="menu"
      >
        {users.map((userData) => (
          <ListItem
            key={userData.id}
            value={userData.id}
            checkmark={{ "aria-hidden": "true" }}
            role="menuitemcheckbox"
            aria-selected={undefined}
            aria-checked={selectedUsers.includes(userData.id)}
          >
            <Persona
              name={`${userData.name} (${userData.author.status})`}
              secondaryText={userData.description}
              presence={{ status: userData.author.status as any, 'aria-hidden': 'true' }}
              avatar={{ "aria-hidden": "true"}}
            />
          </ListItem>
        ))}
      </List>

      <ImageConfirmationDialog open={confOpen} onOpenChange={closeImageConfirmationDialog} selectedItems={selectedImages} />
      <UserConfirmationDialog open={userOpen} onOpenChange={closeUserConfirmationDialog} selectedItems={selectedUsers} />
    </>
  );
};

const ImageConfirmationDialog = (props: Omit<DialogProps, 'children'> & { selectedItems: SelectionItemId[] }) => {
  const { open, onOpenChange, selectedItems } = props;

  const deletedFiles = images.filter((image) => selectedItems.includes(image.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Deleted {selectedItems.length} images</DialogTitle>
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

const UserConfirmationDialog = (props: Omit<DialogProps, 'children'> & { selectedItems: SelectionItemId[] }) => {
  const { open, onOpenChange, selectedItems } = props;

  const deletedFiles = users.filter((user) => selectedItems.includes(user.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Removed {selectedItems.length} users</DialogTitle>
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

export default ListHome;