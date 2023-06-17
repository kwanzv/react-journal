import * as React from "react";
import ReactDOM from "react-dom";
import Sidebar from "./Components/Sidebar";
import Editor from "./Components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

import "./index.css";

export default function App() {
  const [notes, setNotes] = React.useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [noteID, setNoteID] = React.useState((notes[0] && notes[0].id) || "");
  const [activeNote, setActiveNote] = React.useState();

  function createNote() {
    const newNote = {
      id: nanoid(),
      body: "Hello, is it me you're looking for?",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setNoteID(newNote.id);
  }

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function currentNote() {
    return notes.find((note) => {
      return note.id === noteID;
    });
  }

  function updateNote(text) {
    setNotes(
      (prevNotes) => {
        const newNotes = [];
        for (let i = 0; i < prevNotes.length; i++) {
          const prevNote = prevNotes[i];
          if (prevNote.id === noteID) {
            newNotes.unshift({ ...prevNote, body: text });
          } else {
            newNotes.push(prevNote);
          }
        }
        return newNotes;
      }

      // prevNotes.map((prevNote) => {
      //   return prevNote.id === noteID ? { ...prevNote, body: text } : prevNote;
      // })
    );
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
            currentNote={currentNote()}
            setNoteID={setNoteID}
            activeNote={activeNote}
          />
          <Editor
            id="editor"
            notes={notes}
            currentNote={currentNote()}
            updateNote={updateNote}
            setActiveNote={setActiveNote}
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

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
