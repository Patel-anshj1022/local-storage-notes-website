import React from "react";
import NotesApp from "./components/NotesApp";

function App() {
  return (
    <div className="app-container">
      <div className="logo">🪺</div>
      <h1>NoteNest</h1>
      <p className="subtitle">Your cozy place for ideas ✨</p>
      <NotesApp />
    </div>
  );
}

export default App;
