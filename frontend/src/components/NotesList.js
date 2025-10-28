import React from "react";
export default function NotesList({ notes }) {
  if (!notes.length) return <div>No notes found.</div>;
  return (
    <ul>
      {notes.map(note => (
        <li key={note.id} style={{ marginBottom: 8 }}>
          <strong>{note.title}</strong>: {note.content}
        </li>
      ))}
    </ul>
  );
}
