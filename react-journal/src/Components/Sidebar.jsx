import * as React from "react";
// import { format } from "date-fns";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";

export default function Sidebar({ notes, createNote }) {
  // const [selected, setSelected] = React.useState();
  // let footer = <p>Please pick a day.</p>;
  // if (selected) {
  //   footer = <p>You picked {format(selected, "PP")}.</p>;
  // }

  const noteList = notes.map((note) => {
    return (
      <div className="note" key={note.id}>
        {note.body}
      </div>
    );
  });

  return (
    <section className="side-bar-container">
      <div className="side-bar-header">
        <h3>Daily Journal</h3>
        <button className="new-note" onClick={createNote}>
          +
        </button>
      </div>
      {noteList}
      {/* <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={footer}
      /> */}
    </section>
  );
}
