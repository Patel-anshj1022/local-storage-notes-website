import React, { useState, useEffect, useRef } from "react";

function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const fileInputRef = useRef();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (input.trim() !== "") {
      setNotes([...notes, input]);
      setInput("");
      showMessage("Note added!");
    }
  };

  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    showMessage("Note deleted!");
  };

  const exportNotes = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(notes));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "notenest_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showMessage("Notes exported!");
  };

  const importNotes = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedNotes = JSON.parse(event.target.result);
        if (Array.isArray(importedNotes)) {
          setNotes(importedNotes);
          showMessage("Notes imported!");
        } else {
          alert("Invalid file format.");
        }
      } catch (error) {
        alert("Error reading file.");
      }
    };
    reader.readAsText(file);
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="notes-container">
      <div className="input-section">
        <input
          type="text"
          placeholder="Write your note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addNote}>Add</button>
      </div>

      <div className="backup-section">
        <button onClick={exportNotes}>Export Notes 📦</button>
        <button onClick={() => fileInputRef.current.click()}>Import Notes 📂</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={importNotes}
          accept=".json"
        />
      </div>

      {message && <div className="message">{message}</div>}

      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note-item fade-in">
            <p>{note}</p>
            <button onClick={() => deleteNote(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesApp;
