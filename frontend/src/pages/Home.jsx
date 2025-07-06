import { useState, useEffect } from "react";
import api from "../api";
import Notes from "../components/Notes";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <header className="home-header">
          <h1 className="home-title">My Notes</h1>
          <p className="home-subtitle">Capture your thoughts and ideas</p>
        </header>

        <section className="notes-section">
          <div className="notes-header">
            <h2 className="notes-title">Your Notes</h2>
            <span className="notes-count">{notes.length} notes</span>
          </div>
          <div className="notes-list">
            {notes.length > 0 ? (
              notes.map((note) => <Notes note={note} onDelete={deleteNote} key={note.id} />)
            ) : (
              <div className="notes-empty">
                <div className="notes-empty-icon">📝</div>
                <p className="notes-empty-text">No notes yet</p>
                <p className="notes-empty-subtext">Create your first note to get started!</p>
              </div>
            )}
          </div>
        </section>

        <aside className="create-note-section">
          <h2 className="create-note-title">Create Note</h2>
          <form onSubmit={createNote} className="note-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                placeholder="Enter note title..."
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                className="form-textarea"
                placeholder="Write your note content here..."
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">
              Create Note
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}

export default Home;
