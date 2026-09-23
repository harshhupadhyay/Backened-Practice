import axios from "axios";
import React from "react";

const AllNotesCard = ({ note,handleDelete,handleUpdate}) => {





  return (
    <div className="note-card">
      <div className="note-card-topline">
        <span className="note-dot" aria-hidden="true" />
        <span className="note-label">Personal note</span>
      </div>
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div className="note-actions">
        <button onClick={()=>handleUpdate(note)} className="action-button action-update">update</button>
        <button onClick={()=>handleDelete(note._id)} className="action-button action-delete">
          delete
        </button>
      </div>
    </div>
  );
};

export default AllNotesCard;
