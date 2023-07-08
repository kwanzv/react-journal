import * as React from "react";
import Sidebar from "./Components/Sidebar";
import Editor from "./Components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

import "./index.css";

export default function App() {
  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  function createNote() {
    const newNote = {
      id: nanoid(),
      body: "Hello, is it me you're looking for?",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function getCurrentNote() {
    return notes.find((note) => {
      return note.id === currentNoteId;
    });
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  }

  function updateNote(text) {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) => {
        return note.id === currentNoteId ? { ...note, body: text } : note;
      });
      return updatedNotes;
    });
  }

  return (
    <div className="container">
      {notes.length > 0 ? (
        <Split
          gutterSize={10}
          sizes={[30, 70]}
          direction="horizontal"
          className="split"
        >
          <Sidebar
            notes={notes}
            createNote={createNote}
            currentNote={getCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            deleteNote={deleteNote}
          />
          <Editor
            id="editor"
            notes={notes}
            currentNote={getCurrentNote()}
            updateNote={updateNote}
          />
        </Split>
      ) : (
        <div className="empty">
          <h1>You haven't started your journal yet</h1>
          <img
            src="https://img.icons8.com/?size=512&id=l6iocFkbmCrh&format=png"
            alt=""
          />
          <button onClick={createNote}>Start now!</button>
        </div>
      )}
    </div>
  );
}
