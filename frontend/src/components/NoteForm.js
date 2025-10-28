import React, { useState } from "react";
export default function NoteForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(title, content);
        setTitle("");
        setContent("");
      }}
      style={{ marginBottom: 16 }}
    >
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
        style={{ marginRight: 8 }}
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Content"
        required
        style={{ verticalAlign: "top", marginRight: 8 }}
      />
      <button type="submit">Add Note</button>
    </form>
  );
}
