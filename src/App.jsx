import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { notesCollection, db } from "./firebase";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState();

  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId);
    await setDoc(docRef, { body: text }, { merge: true });
  }

  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentNoteId) {
      // The use of '?' is called optional chaining
      // setCurrentNoteId(notes[0]?.id) || "",
      setCurrentNoteId(notes[0] && notes[0].id);
    }
  }, [notes]);

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            handleDelete={deleteNote}
          />

          <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
