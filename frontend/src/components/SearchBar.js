import React, { useState } from "react";
export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (query.trim()) onSearch(query);
        setQuery("");
      }}
      style={{ marginBottom: 16 }}
    >
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
        required
        style={{ marginRight: 8 }}
      />
      <button type="submit">Search</button>
    </form>
  );
}
