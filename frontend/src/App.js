import React, { useEffect, useState } from "react";
import { fetchNotes, addNote, searchNotes } from "./api";
import NotesList from "./components/NotesList";
import NoteForm from "./components/NoteForm";
import SearchBar from "./components/SearchBar";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [mode, setMode] = useState("list");

  useEffect(() => {
    fetchNotes().then(setNotes);
  }, []);

  const handleAddNote = async (title, content) => {
    await addNote(title, content);
    setNotes(await fetchNotes());
    setMode("list");
  };

  const handleSearch = async (query) => {
    setSearchResults(await searchNotes(query));
    setMode("search");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 24 }}>
      <h1>AI Notes Manager</h1>
      <NoteForm onAdd={handleAddNote} />
      <SearchBar onSearch={handleSearch} />
      <button onClick={() => setMode("list")}>Show All Notes</button>
      <NotesList notes={mode === "list" ? notes : searchResults} />
    </div>
  );
}

export default App;
