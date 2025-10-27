# ai-notes-manager
📝 Setup Steps
1. Clone the Repository
     git clone https://github.com/Satiba18/ai-notes-manager.git
     cd ai-notes-manager

2. Backend Setup (FastAPI + SQLite)
a. Create and Activate Python Virtual Environment
   cd backend
   python -m venv venv
   # On Windows:
   venv\Scripts\activate

b. Install Dependencies
   pip install -r requirements.txt

Or manually:
   pip install fastapi uvicorn sqlalchemy sentence-transformers numpy pydantic

c. Run the Backend
   uvicorn main:app --reload
   Backend will run on http://127.0.0.1:8000
   API docs available at http://127.0.0.1:8000/docs

3. Frontend Setup (React)
    cd ../frontend
    npm install
    npm start
    The React app will open at http://localhost:3000

4. Project Structure
ai-notes-manager/
  backend/
    main.py
    models.py
    database.py
    ai.py
    requirements.txt
  frontend/
    src/
      App.js
      api.js
      components/
        NoteForm.js
        SearchBar.js
        NotesList.js
    package.json
README.md

5. Notes
    Be sure to set the API base in frontend/src/api.js to "http://127.0.0.1:8000" (or "http://localhost:8000").
    SQLite database will be auto-created as notes.db in the backend folder.
    For CORS issues, ensure CORS middleware is enabled in main.py.
