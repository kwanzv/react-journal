export default function Sidebar({
  notes,
  createNote,
  setCurrentNoteId,
  currentNote,
  deleteNote,
}) {
  console.log(currentNote.id);
  const noteList = notes.map((note) => {
    return (
      <div
        className={`note ${note.id === currentNote.id ? "selected-note" : ""}`}
        key={note.id}
        onClick={() => setCurrentNoteId(note.id)}
      >
        <div className="sidebar-title">
          <p>{note.body.split("\n")[0]} </p>
          <button
            className="delete-btn"
            onClick={(event) => deleteNote(event, note.id)}
          >
            <i className="gg-trash"></i>
          </button>
        </div>
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
    </section>
  );
}
