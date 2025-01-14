import * as React from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Field,
  TagPicker,
  TagPickerList,
  TagPickerInput,
  TagPickerControl,
  TagPickerProps,
  TagPickerOption,
  TagPickerGroup,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
  useTagPickerFilter,
  Text,
} from "@fluentui/react-components";
import type {
  DialogProps,
} from "@fluentui/react-components";

import './lists.css';
import Header from './Header';

const users = [
  "John Doe",
  "Jane Doe",
  "Max Mustermann",
  "Erika Mustermann",
  "Pierre Dupont",
  "Amelie Dupont",
  "Mario Rossi",
  "Maria Rossi",
];

const initialTags = [
  "biology",
  "cats"
];


const MetadataPage = () => {
  const [userQuery, setUserQuery] = React.useState<string>("");
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);

  const [editorQuery, setEditorQuery] = React.useState<string>("");
  const [selectedEditors, setSelectedEditors] = React.useState<string[]>([]);

  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [activeTag, setActiveTag] = React.useState('');

  const [tags, setTags] = React.useState<string[]>(initialTags);
  const [selectedTags, setSelectedTags] = React.useState<string[]>(initialTags);
  const [tagQuery, setTagQuery] = React.useState<string>("");

  const onUserSelect: TagPickerProps["onOptionSelect"] = (e, data) => {
    if (data.value === "no-matches") {
      return;
    }
    setSelectedUsers(data.selectedOptions);
    setUserQuery("");
  };

  const onEditorSelect: TagPickerProps["onOptionSelect"] = (e, data) => {
    if (data.value === "no-matches") {
      return;
    }
    setSelectedEditors(data.selectedOptions);
    setEditorQuery("");
  };

  const onTagClick = (tag: string) => {
    setActiveTag(tag);
    setDetailsOpen(true);
  }

  const onTagSelect: TagPickerProps["onOptionSelect"] = (e, data) => {
    if (data.value === "new") {
      if (tagQuery.length < 2) {
        return;
      }

      setTags([...tags, tagQuery]);
      setSelectedTags([...selectedTags, tagQuery]);
      setTagQuery("");
      return;
    }
    setSelectedTags(data.selectedOptions);
    setTagQuery("");
  };

  const userData = useTagPickerFilter({
    query: userQuery,
    options: users,
    noOptionsElement: (
      <TagPickerOption value="no-matches">
        We couldn't find any matches
      </TagPickerOption>
    ),
    renderOption: (option: any) => (
      <TagPickerOption
        secondaryContent="Fable FTE"
        key={option}
        media={
          <Avatar shape="square" aria-hidden name={option} color="colorful" />
        }
        value={option}
      >
        {option}
      </TagPickerOption>
    ),

    filter: (option: any) =>
      !selectedUsers.includes(option) &&
      option.toLowerCase().includes(userQuery.toLowerCase()),
  });

  const editorData = useTagPickerFilter({
    query: editorQuery,
    options: users,
    noOptionsElement: (
      <TagPickerOption value="no-matches">
        We couldn't find any matches
      </TagPickerOption>
    ),
    renderOption: (option: any) => (
      <TagPickerOption
        secondaryContent="Fable FTE"
        key={option}
        media={
          <Avatar shape="square" aria-hidden name={option} color="colorful" />
        }
        value={option}
      >
        {option}
      </TagPickerOption>
    ),

    filter: (option: any) =>
      !selectedEditors.includes(option) &&
      option.toLowerCase().includes(editorQuery.toLowerCase()),
  });

  const tagData = useTagPickerFilter({
    query: tagQuery,
    options: tags,
    noOptionsElement: (
      <TagPickerOption value="new">
        {tagQuery}
      </TagPickerOption>
    ),
    renderOption: (option: any) => (
      <TagPickerOption
        key={option}
        value={option}
      >
        {option}
      </TagPickerOption>
    ),

    filter: (option: any) =>
      !selectedTags.includes(option) &&
      option.toLowerCase().includes(tagQuery.toLowerCase()),
  });


  return (
    <>
      <Header />
      <Text as="h2" size={900}>Edit Site Metadata</Text>

      <Field label="Manage admins" style={{ maxWidth: 600 }}>
        <TagPicker
          onOptionSelect={onUserSelect}
          selectedOptions={selectedUsers}
        >
          <TagPickerControl>
            <TagPickerGroup aria-label="Selected admins">
              {selectedUsers.map((option: any) => (
                <InteractionTag value={option} key={option}>
                  <InteractionTagPrimary
                    hasSecondaryAction
                    onClick={() => onTagClick(option)}
                    media={<Avatar aria-hidden name={option} color="colorful" />}
                    role="option"
                  >
                    {option}
                  </InteractionTagPrimary>
                  <InteractionTagSecondary role="option" aria-label="remove" />
                </InteractionTag>
              ))}
            </TagPickerGroup>
            <TagPickerInput
              aria-label="Manage admins"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
            />
          </TagPickerControl>

          <TagPickerList>{userData}</TagPickerList>
        </TagPicker>
      </Field>

      <Field label="Manage editors" style={{ maxWidth: 600 }}>
        <TagPicker
          onOptionSelect={onEditorSelect}
          selectedOptions={selectedEditors}
        >
          <TagPickerControl>
            <TagPickerGroup aria-label="Selected editors" role="grid">
              <div role="row">
                {selectedEditors.map((option: any) => (
                  <InteractionTag value={option} key={option} role="presentation">
                    <InteractionTagPrimary
                      hasSecondaryAction
                      onClick={() => onTagClick(option)}
                      role="gridcell"
                    >
                      {option}
                    </InteractionTagPrimary>
                    <InteractionTagSecondary aria-label="remove" role="gridcell" />
                  </InteractionTag>
                ))}
              </div>
            </TagPickerGroup>
            <TagPickerInput
              aria-label="Update editors"
              value={editorQuery}
              onChange={(e) => setEditorQuery(e.target.value)}
            />
          </TagPickerControl>

          <TagPickerList>{editorData}</TagPickerList>
        </TagPicker>
      </Field>

      <Field label="Update content tags" style={{ maxWidth: 600 }}>
        <TagPicker
          onOptionSelect={onTagSelect}
          selectedOptions={selectedTags}
        >
          <TagPickerControl>
            <TagPickerGroup aria-label="Selected tags" role="toolbar">
              {selectedTags.map((option: any) => (
                <InteractionTag value={option} key={option}>
                  <InteractionTagPrimary
                    hasSecondaryAction
                    onClick={() => onTagClick(option)}
                  >
                    {option}
                  </InteractionTagPrimary>
                  <InteractionTagSecondary aria-label="remove" />
                </InteractionTag>
              ))}
            </TagPickerGroup>
            <TagPickerInput
              aria-label="Update tags"
              value={tagQuery}
              onChange={(e) => setTagQuery(e.target.value)}
            />
          </TagPickerControl>

          <TagPickerList>{tagData}</TagPickerList>
        </TagPicker>
      </Field>

      <TagDetailsDialog open={detailsOpen} onOpenChange={(_, data: { open: boolean }) => setDetailsOpen(data.open)} tag={activeTag} />
    </>
  );
};

const TagDetailsDialog = (props: Omit<DialogProps, 'children'> & { tag: string }) => {
  const {open, onOpenChange, tag} = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{tag}</DialogTitle>
          <DialogContent>
            <Text>You successfully viewed more information about {tag}!</Text>
          </DialogContent>
          <DialogActions>
            <Button appearance="primary" onClick={(ev) => onOpenChange?.(ev, {open: false} as any)}>Close</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}


export default MetadataPage;