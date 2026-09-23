import axios from "axios";
import { useEffect, useState } from "react";
import AllNotesCard from "./components/AllNotesCard";

const App = () => {
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [updateNotes, setUpdateNotes] = useState(null);

  const handleChange = (e) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  let getAllData = async () => {
    try {
      let res = await axios.get("http://localhost:3000/notes/allNotes");
      setAllNotes(res.data.data);
      console.log(res);
    } catch (error) {
      console.log("error in getting data", error.message);
    }
  };
  useEffect(() => {
    getAllData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updateNotes) {
      //api call for update ka logic
      let res = await axios.put(
        `http://localhost:3000/notes/${updateNotes}`,
        inputValue,
      );
    }
    else {
      //api call for creation
      let res = await axios.post(
        "http://localhost:3000/notes/create",
        inputValue,
      );
      console.log(res);
    }

    setInputValue({
      title: "",
      description: "",
    });
    getAllData();
  };

  let handleUpdate = async (note) => {
    setUpdateNotes(note._id);
    setInputValue({
      title: note.title,
      description: note.description,
    });
    getAllData();
  };

  let handleDelete = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:3000/notes/${id}`);
      console.log(res);
      getAllData();
    } catch (error) {
      console.log("error in deleting", error.message);
    }
  };

  return (
    <div className="notes-page">
      <header className="notes-header">
        <div>
          <p className="eyebrow">Your quiet corner</p>
          <h1>Notes App</h1>
        </div>
        <div className="note-count">{allNotes.length} notes</div>
      </header>

      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-heading">
          <span className="form-icon">+</span>
          <div>
            <h2>Capture a thought</h2>
            <p>Put it somewhere you can find it later.</p>
          </div>
        </div>
        <input
          name="title"
          value={inputValue.title}
          onChange={handleChange}
          className="note-input"
          type="text"
          placeholder="Note title"
        />
        <input
          name="description"
          value={inputValue.description}
          onChange={handleChange}
          className="note-input note-description"
          type="text"
          placeholder="What is on your mind?"
          minLength={12}
          required
        />
        <button className="submit-button">
          Add note <span aria-hidden="true">↗</span>
        </button>
      </form>

      <section className="notes-section">
        <div className="section-heading">
          <h2>Recent notes</h2>
          <span>All thoughts, in one place</span>
        </div>
        <div className="notes-grid">
          {allNotes.map((item) => (
            <AllNotesCard
              key={item._id}
              note={item}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
