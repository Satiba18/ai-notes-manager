from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import Note
from ai import get_embedding, score_similarity
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class NoteIn(BaseModel):
    title: str
    content: str

class NoteOut(NoteIn):
    id: int

@app.post("/notes", response_model=NoteOut)
def create_note(note: NoteIn, db: Session = Depends(get_db)):
    embedding = get_embedding(note.content)
    db_note = Note(title=note.title, content=note.content, embedding=embedding)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return NoteOut(id=db_note.id, title=db_note.title, content=db_note.content)

@app.get("/notes", response_model=list[NoteOut])
def list_notes(db: Session = Depends(get_db)):
    notes = db.query(Note).all()
    return [NoteOut(id=n.id, title=n.title, content=n.content) for n in notes]

class SearchIn(BaseModel):
    query: str

@app.post("/search", response_model=list[NoteOut])
def search_notes(input: SearchIn, db: Session = Depends(get_db)):
    notes = db.query(Note).all()
    query_emb = get_embedding(input.query)
    scored = []
    for n in notes:
        score = score_similarity(n.embedding, query_emb)
        scored.append((score, n))
    scored.sort(reverse=True, key=lambda x: x[0])
    top_matches = [NoteOut(id=n.id, title=n.title, content=n.content) for score, n in scored[:3]]
    return top_matches

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)