import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

let defaultNoteDatete = [
  {
    id: nanoid(),
    text: "This is my first note!",
    date: "15/04/2021"
  },
  {
    id: nanoid(),
    text: "This is my second note!",
    date: "21/04/2021"
  },
  {
    id: nanoid(),
    text: "This is my third note!",
    date: "28/04/2021"
  },
  {
    id: nanoid(),
    text: "This is my new note!",
    date: "30/04/2021"
  }
];

const App = () => {
  const [notes, setNotes] = useState(defaultNoteDatete);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // this useEffect will run once when app render since its dep is []
  // to get stuff from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // this useEffect is run when state `notes` change, to update localStorage
  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    };
    // put this obj into newNotes array
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    // className can also come with JSX {} and have conditional logic
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          // we show only filtered note to list
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};

export default App;
