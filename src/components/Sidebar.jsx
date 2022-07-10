import React from 'react';
import { ACTIONS } from './Notes';
import { formatDate } from './Notes';
import { useNavigate } from 'react-router-dom';
import { useNavContext } from './NavContext';
export default function Sidebar({ dispatch, notes }) {
  const { notesVisible } = useNavContext();
  const navigation = useNavigate();
  function handleDelete(e, id) {
    e.stopPropagation();
    dispatch({ type: ACTIONS.DELETE_NOTE, payload: { id: id } });
  }

  const noteElements = notes.items.map((note) => {
    return (
      <div
        key={note.id}
        onClick={() => {
          dispatch({
            type: ACTIONS.CHANGE_SELECTED_NOTE,
            payload: { id: note.id },
          });
          navigation(`/notes/${note.id}`);
        }}
        className={`sidebar-note ${
          notes.current === note.id ? 'sidebar-note-active' : ''
        }`}
      >
        <h2 className='sidebar-note-title'>{note.title}</h2>
        <p className='sidebar-note-content'>{note.body.slice(0, 50)}</p>
        <div className='sidebar-note-time'>{formatDate(note.time.seconds)}</div>
        <div
          onClick={(e) => {
            handleDelete(e, note.id);
            let route;
            if (notes.items.length === 1) route = '/notes/';
            else route = `/notes/${notes.items[0].id}`;
            navigation(route);
          }}
          className='sidebar-note-delete'
        >
          <img src='/images/trash-can.svg' alt='delete' />
        </div>
      </div>
    );
  });
  return (
    <div className={`sidebar ${!notesVisible ? 'hide-sidebar' : ''}`}>
      <div className='flex-sidebar'>
        <div className='sidebar-button-container'>
          <button
            onClick={() => {
              dispatch({
                type: ACTIONS.CREATE_NOTE,
                payload: { navigation: navigation },
              });
            }}
            className='sidebar-button'
          >
            Create Note
          </button>
        </div>
        <div className='sidebar-title'>Notes</div>
        <div className='sidebar-notes-container'>{noteElements}</div>
      </div>
    </div>
  );
}
