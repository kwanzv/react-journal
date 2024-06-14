import * as React from "react";
import Sidebar from "./Components/Sidebar";
import Editor from "./Components/Editor";
import Split from "react-split";
import { notesCollection, db } from "./firebase";
import { addDoc, onSnapshot, doc, deleteDoc } from "firebase/firestore";

import "./index.css";

export default function App() {
  const [notes, setNotes] = React.useState([]);
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  );

  React.useEffect(() => {
    const unsub = onSnapshot(notesCollection, (snapshot) => {
      //Sync up local notes with firebase
      const notesArray = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setNotes(notesArray);
      setCurrentNoteId(notesArray[0].id);
    });
    return unsub;
  }, []);

  async function createNote() {
    // Create a new note in firebase

    const newNote = {
      body: `Note ${notes.length + 1}`,
    };
    await addDoc(notesCollection, newNote);
  }

  function getCurrentNote() {
    return notes.find((note) => {
      return note.id === currentNoteId;
    });
  }

  async function deleteNote(noteId) {
    // Check if the currentNoteId is valid and notes array is not empty
    if (
      currentNoteId !== null && // currentNoteId should not be null
      currentNoteId !== undefined && // currentNoteId should not be undefined
      notes.find((note) => note.id === currentNoteId) !== undefined && // currentNoteId should exist in notes
      notes.find((note) => note.id === currentNoteId) !== null && // currentNoteId should not be null in notes
      notes.length > 0 // notes array should not be empty
    ) {
      // Create a new list of notes excluding the note with noteId
      const docRef = doc(db, "notes", noteId);
      await deleteDoc(docRef);
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
