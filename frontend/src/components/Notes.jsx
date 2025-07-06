import "../styles/Note.css";

function Notes({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="note-container">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>
      <div className="note-footer">
        <span className="note-date">{formattedDate}</span>
        <button className="delete-button" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Notes;
