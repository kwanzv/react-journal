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
      body: `Note ${notes.length + 1}`,
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
    // Prevent the event from propagating to parent elements.
    event.stopPropagation();

    // Check if the currentNoteId is valid and notes array is not empty
    if (
      currentNoteId !== null && // currentNoteId should not be null
      currentNoteId !== undefined && // currentNoteId should not be undefined
      notes.find((note) => note.id === currentNoteId) !== undefined && // currentNoteId should exist in notes
      notes.find((note) => note.id === currentNoteId) !== null && // currentNoteId should not be null in notes
      notes.length > 0 // notes array should not be empty
    ) {
      // Create a new list of notes excluding the note with noteId
      const newNotes = notes.filter((note) => note.id !== noteId);

      // If the note to be deleted is the current note
      if (currentNoteId === noteId) {
        // Set the current note to the first note in the new list or null if newNotes is empty
        const newCurrentNoteId = newNotes.length > 0 ? newNotes[0].id : null;
        setCurrentNoteId(newCurrentNoteId);
      }

      // Update the notes state with the new list
      setNotes(newNotes);
    } else {
      // Log an error if the conditions are not met
      console.error(
        "Error in deleteNote: currentNoteId is null or undefined, or notes is empty"
      );
    }
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
