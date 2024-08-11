import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createNote, deleteNote } from './graphql/mutations';
import { listNotes } from './graphql/queries';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const result = await API.graphql(graphqlOperation(listNotes));
    setNotes(result.data.listNotes.items);
  };

  const addNote = async () => {
    const input = { content: noteContent };
    await API.graphql(graphqlOperation(createNote, { input }));
    setNoteContent("");
    fetchNotes();
  };

  const removeNote = async (id) => {
    await API.graphql(graphqlOperation(deleteNote, { input: { id } }));
    fetchNotes();
  };

  return (
    <div>
      <h1>Notes</h1>
      <input
        type="text"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <button onClick={addNote}>Add Note</button>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.content}
            <button onClick={() => removeNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
