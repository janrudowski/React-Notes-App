import React from 'react';
import Split from 'react-split';
import Editor from './Editor';
import Sidebar from './Sidebar';
import Nav from './Nav';
import { nanoid } from '../utils/generateId';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { db } from '../config';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { useAuth } from './AuthContext';

export const ACTIONS = {
  SET_NOTES: 'set-notes',
  CREATE_NOTE: 'create-note',
  UPDATE_NOTE: 'update-note',
  CHANGE_SELECTED_NOTE: 'change-note',
  DELETE_NOTE: 'delete-note',
};

export function formatDate(seconds) {
  const date = new Date(seconds * 1000);
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

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SET_NOTES:
      const { items, current, navigation } = payload;
      navigation(current);
      return {
        ...state,
        items: items,
        current: current,
      };

    case ACTIONS.CREATE_NOTE:
      let newNote = {
        id: nanoid(),
        body: 'Start typing',
        time: { seconds: Date.now() / 1000 },
        user: payload.currentUser.uid,
      };

      const title = getTitle(newNote.body);

      newNote = {
        ...newNote,
        title: title,
      };

      setDoc(doc(db, 'notes', newNote.id), {
        ...newNote,
        time: serverTimestamp(),
      });

      payload.navigation(newNote.id);

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
              time: { seconds: Date.now() / 1000 },
            }
          : note
      );
      let sortedItems = [...updatedItems].sort(
        (a, z) => z.time.seconds - a.time.seconds
      );
      return {
        ...state,
        items: sortedItems,
      };

    case ACTIONS.CHANGE_SELECTED_NOTE:
      return {
        ...state,
        current: payload.id,
      };

    case ACTIONS.DELETE_NOTE:
      deleteDoc(doc(db, 'notes', payload.id));
      return {
        ...state,
        items: state.items.filter((el) => el.id !== payload.id),
      };
    default:
      return new Error('Invalid action');
  }
}

export default function Notes() {
  //navigation
  const navigation = useNavigate();
  const params = useParams();

  //auth
  const { currentUser } = useAuth();

  //get notes
  async function getNotesFromDB() {
    const colRef = collection(db, 'notes');
    const q = query(
      colRef,
      where('user', '==', currentUser.uid),
      orderBy('time', 'desc')
    );
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    let current = params.note ? params.note : items[0].id;
    dispatch({
      type: ACTIONS.SET_NOTES,
      payload: { items: items, current: current, navigation: navigation },
    });
  }

  // state
  const [notes, dispatch] = React.useReducer(reducer, {
    items: [],
    current: null,
  });

  //runs only once
  React.useEffect(() => {
    getNotesFromDB();
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Split
          className='split'
          sizes={[20, 80]} //TODO: FIX SIZE WHEN SIDEBAR HIDDEN
          cursor='col-resize'
          gutterSize={2}
        >
          <Sidebar dispatch={dispatch} notes={notes} />
          <Editor notes={notes} dispatch={dispatch} />
        </Split>
      </main>
    </>
  );
}
