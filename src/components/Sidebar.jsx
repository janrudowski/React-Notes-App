import React from 'react';
import { ACTIONS } from './Notes';
import { formatDate } from './Notes';
import { Navigate, useNavigate } from 'react-router-dom';
import { NavContext } from './Context';
export default function Sidebar({ dispatch, notes }) {
  const { notesVisible, setNotesVisible } = React.useContext(NavContext);
  const navigation = useNavigate();
  function handleDelete(e, id) {
    e.stopPropagation();
    dispatch({ type: ACTIONS.DELETE_NOTE, payload: id });
  }
  const noteElements = notes.items.map((note) => {
    return (
      <div
        key={note.id}
        onClick={() =>
          // dispatch({ type: ACTIONS.CHANGE_SELECTED_NOTE, payload: note })
          navigation(`/notes/${note.id}`)
        }
        className={`sidebar-note ${
          notes.current === note.id ? 'sidebar-note-active' : ''
        }`}
      >
        <h2 className='sidebar-note-title'>{note.title}</h2>
        <p className='sidebar-note-content'>{note.body.slice(0, 50)}</p>
        <div className='sidebar-note-time'>{formatDate(note.time)}</div>
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
              dispatch({ type: ACTIONS.CREATE_NOTE, payload: navigation });
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
