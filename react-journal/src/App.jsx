import * as React from "react";
import ReactDOM from "react-dom";
import Sidebar from "./Components/Sidebar";
import Editor from "./Components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

import "./index.css";

export default function App() {
  const [value, setValue] = React.useState("**Type something**");
  const [selectedTab, setSelectedTab] = React.useState("write");
  const [notes, setNotes] = React.useState([]);

  function createNote() {
    const newNote = {
      id: nanoid(),
      body: "Hello, is it me you're looking for",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
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
          <Sidebar notes={notes} />
          <Editor
            id="editor"
            value={value}
            setValue={setValue}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
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
