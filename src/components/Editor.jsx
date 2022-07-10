import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React from 'react';
import ReactMde from 'react-mde';
import Showdown from 'showdown';
import { db } from '../config';
import { ACTIONS } from './Notes';

export default function Editor({ notes, dispatch }) {
  const [selectedTab, setSelectedTab] = React.useState('write');
  const [isEdited, setIsEdited] = React.useState(false);
  const currentNote = notes.items.find((el) => el.id === notes.current);
  function toggleTab() {
    setSelectedTab((prev) => (prev === 'write' ? 'preview' : 'write'));
  }

  function updateDB() {
    updateDoc(doc(db, 'notes', currentNote.id), {
      body: currentNote.body,
      time: serverTimestamp(),
      title: currentNote.title,
    });
  }

  React.useEffect(() => {
    const handleKeySave = function (e) {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        if (isEdited) {
          updateDB();
          setIsEdited(false);
        }
      }
    };
    document.addEventListener('keydown', handleKeySave);
  }, [currentNote]);

  function handleSave(e) {
    if (isEdited === true) {
      updateDB();
      setIsEdited(false);
    }
  }

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  let content;

  if (!currentNote && notes.items.length !== 0) {
    content = <h1>Note not found</h1>;
  } else if (notes.items.length === 0) {
    content = (
      <h1>
        Create a <span className='orange'>note</span> to start.
      </h1>
    );
  } else {
    content = (
      <>
        <div className='editor-buttons-container'>
          <button
            onClick={toggleTab}
            className={`editor-button ${
              selectedTab === 'write' ? 'editor-button-active' : ''
            }`}
          >
            Write
          </button>
          <button
            onClick={toggleTab}
            className={`editor-button ${
              selectedTab === 'preview' ? 'editor-button-active' : ''
            }`}
          >
            Preview
          </button>
          {selectedTab === 'write' && (
            <button
              title='ctrl+s to save'
              onClick={() => handleSave}
              className={`editor-button-save ${
                isEdited ? 'editor-button-save-active' : ''
              }`}
            >
              {isEdited ? <img src='/images/save.svg' alt='save' /> : 'Saved ✔'}
            </button>
          )}
        </div>

        <ReactMde
          value={currentNote?.body}
          onChange={(text) =>
            dispatch({ type: ACTIONS.UPDATE_NOTE, payload: text })
          }
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          minEditorHeight={80}
          maxEditorHeight={100}
          heightUnits={'vh'}
          classes={{
            reactMde: 'editor',
            textArea: 'editor-textarea',
            toolbar: 'editor-tab',
            preview: 'editor-preview',
          }}
          childProps={{
            textArea: {
              onBlur: handleSave,
              onInput: () => setIsEdited(true),
            },
          }}
        />
      </>
    );
  }

  return <div className='editor-container'>{content}</div>;
}
