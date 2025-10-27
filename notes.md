1. Backend Design Approach
The backend was built using FastAPI, chosen for its speed, built-in async support, and automatic API docs generation. The project is organized with clear separation between the API routes (main.py), database models (models.py), database connection logic (database.py), and AI/embedding logic (ai.py). This separation allows for simpler maintenance and testing. All external dependencies are managed in requirements.txt. Standard FastAPI practices were followed for API input validation and serialization using Pydantic models.

2. Database Schema Rationale
The SQLite database (via SQLAlchemy ORM) uses a single table, notes, with the following columns:

id (int, primary key): Uniquely identifies each note.

title (string): The title of the note.

content (string): The main body/content of the note.

embedding (bytes/blob): Stores the serialized vector embedding for each note (generated from the note’s content/title).

This schema is simple, performant for small-scale projects, and easily extensible if more fields are needed in the future. Using a BLOB for embeddings enables efficient search and avoids recomputation.

3. How the AI Search Works
When a new note is created or updated, the backend uses sentence-transformers (MiniLM model) to generate a dense vector embedding for the note's text. During a search, the query string is similarly embedded, and the backend performs a vector similarity (cosine similarity) between the search embedding and each stored note embedding. The most similar notes (above a threshold or the top-N results) are returned in the response.

This method enables semantic search, letting users find notes by meaning rather than exact words. No large LLM is used; the search is lightweight and fast.

4. Trade-offs Made
SQLite & SQLAlchemy: Chosen for simplicity, portability, and no-setup requirements. Not suited for high concurrency or very large datasets, but ideal for fast prototyping and demo projects.

Embedding Storage: Storing vector embeddings directly avoids recomputation on every search but does increase database size. For bigger datasets, a vector database (like FAISS or Pinecone) might be better.

Synchronous DB Access: As FastAPI supports async, for larger scale async DB drivers could improve performance, but sync SQLAlchemy is sufficient for this system’s needs.

Security & Auth: No authentication is implemented due to project scope and for easier testing.

Frontend Simplicity: Used plain React and inline CSS for speed and minimal dependencies; for better UX, could integrate with a design system (e.g., Material-UI).
