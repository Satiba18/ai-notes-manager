const API_BASE = "http://127.0.0.1:8000";

export async function fetchNotes() {
  const res = await fetch(`${API_BASE}/notes`);
  return await res.json();
}

export async function addNote(title, content) {
  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  return await res.json();
}

export async function searchNotes(query) {
  const res = await fetch(`${API_BASE}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return await res.json();
}
