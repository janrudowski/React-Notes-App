import React from 'react';
import ReactMde from 'react-mde';
import Showdown from 'showdown';
import { ACTIONS } from './Notes';

export default function Editor({ notes, dispatch }) {
  const [selectedTab, setSelectedTab] = React.useState('write');
  const currentNote = notes.items.find((el) => el.id === notes.current);
  function toggleTab() {
    setSelectedTab((prev) => (prev === 'write' ? 'preview' : 'write'));
  }

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <div className='editor-container'>
      {notes.items.length === 0 ? (
        <h1>
          Create a <span className='orange'>note</span> to start.
        </h1>
      ) : (
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
          />
        </>
      )}
    </div>
  );
}
