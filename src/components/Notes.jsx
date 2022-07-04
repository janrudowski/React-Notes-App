import React from 'react';
import Split from 'react-split';
import Editor from './Editor';
import Sidebar from './Sidebar';
import { nanoid } from '../utils/generateId';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const ACTIONS = {
  CREATE_NOTE: 'create-note',
  UPDATE_NOTE: 'update-note',
  CHANGE_SELECTED_NOTE: 'change-note',
  DELETE_NOTE: 'delete-note',
};

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat(navigator.language, options).format(date);
}

function getTitle(str) {
  return str.split('\n')[0].slice(0, 30);
}

function getSlug(title, id) {
  let newTitle = title
    .trim()
    .replace(/[^a-zA-Z ]/g, '') //replace empty spaces and special characters
    .replace(/\s+/g, '-')
    .toLowerCase();
  return `${newTitle}-${id}`;
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.CREATE_NOTE:
      let newNote = {
        id: nanoid(),
        body: 'Start typing',
        time: Date.now(),
      };
      const title = getTitle(newNote.body);
      const slug = getSlug(title, newNote.id);
      newNote = {
        ...newNote,
        title: title,
        slug: slug,
      };
      payload(`/notes/${newNote.id}`);
      return {
        ...state,
        items: [newNote, ...state.items],
        current: newNote.id,
      };
    case ACTIONS.UPDATE_NOTE:
      let newTitle = getTitle(payload);
      let updatedItems = state.items.map((note) =>
        note.id === state.current
          ? {
              ...note,
              body: payload,
              title: newTitle,
              slug: getSlug(newTitle, note.id),
              time: Date.now(),
            }
          : note
      );
      let sortedItems = [...updatedItems].sort((a, z) => z.time - a.time);
      return {
        ...state,
        items: sortedItems,
      };
    case ACTIONS.CHANGE_SELECTED_NOTE:
      return {
        ...state,
        current: payload,
      };
    case ACTIONS.DELETE_NOTE:
      return {
        ...state,
        items: state.items.filter((el) => el.id !== payload),
      };
    default:
      return new Error('Invalid action');
  }
}

function init() {
  let items = JSON.parse(localStorage.getItem('notes'));
  return { items: items || [], current: items[0]?.id || null };
}

export default function Notes() {
  const navigation = useNavigate();
  const [notes, dispatch] = React.useReducer(reducer, {}, init);
  React.useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes.items));
  }, [notes]);

  // React.useEffect(() => {
  //   if (notes.items.length == 0) return;
  //   const currentNote = notes.items.find((el) => el.id === notes.current);
  //   navigation(`/notes/${currentNote.slug}`);
  // }, [notes.current]);

  const params = useParams();

  React.useEffect(() => {
    if (
      Object.keys(params).length === 0 &&
      params.constructor === Object &&
      notes.items.length !== 0
    ) {
      //checks if we just navigated to /notes and if notes exist navigates to the first one
      const firstNote = notes.items[0];
      navigation(`/notes/${firstNote?.id}`);
    } else if (params.note) {
      dispatch({
        type: ACTIONS.CHANGE_SELECTED_NOTE,
        payload: params.note,
      });
    } else return;
  }, [params]);

  return (
    <main>
      <Split
        className='split'
        sizes={[20, 80]}
        cursor='col-resize'
        gutterSize={2}
      >
        <Sidebar dispatch={dispatch} notes={notes} />
        <Editor notes={notes} dispatch={dispatch} />
      </Split>
    </main>
  );
}
