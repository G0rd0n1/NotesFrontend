import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container } from "react-bootstrap";
import { FaTrash, FaPen } from "react-icons/fa";
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({
    id: "",
    title: "",
    content: "",
  });
  useEffect(() => {
    getNotes();
  }, []);
  const API_URL =
    "https://notesbackend.azurewebsites.net/api/Notes/GetAllNotes";
  const getNotes = async () => {
    const response = await axios.get(API_URL);
    setNotes(response.data);
  };
const createNote = async () => {
  const now = new Date(); // get the current date and time
  const response = await axios.post(
    "https://notesbackend.azurewebsites.net/api/Notes/AddNotes",
    { ...currentNote, createdDate: now } // add the createdAt property to the new note
  );
  setNotes([...notes, response.data]);
  setCurrentNote({
    id: "",
    title: "",
    content: "",
  });
};

  const updateNote = async () => {
    const response = await axios.patch(
      `${"https://notesbackend.azurewebsites.net/api/Notes/UpdateNotes"}/${
        currentNote.id
      }`,
      currentNote
    );
    setNotes(
      notes.map((note) =>
        note.notesId === currentNote.id ? { ...response.data } : note
      )
    );
    setCurrentNote({
      id: "",
      title: "",
      content: "",
    });
    getNotes();
  };


const deleteNote = async (id) => {
  try {
    await axios.delete(
      `https://notesbackend.azurewebsites.net/api/Notes/DeleteNote/${id}`
    );
    setNotes(notes.filter((note) => note.notesId !== id));
  } catch (error) {
    console.log(error);
  }
};



return (
  <Container>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <img
            src="https://igamingbusiness.com/wp-content/uploads/2022/12/GG-Website_White.png"
            className="img-fluid"
            alt="img"
            style={{ paddingBottom: "20px" }}
          />
        </div>
        <div className="col-md-12">
          <h1 className="text-center">Notes</h1>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={currentNote.title}
              onChange={(e) =>
                setCurrentNote({ ...currentNote, title: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={currentNote.content}
              onChange={(e) =>
                setCurrentNote({ ...currentNote, content: e.target.value })
              }
              className="form-control"
            ></textarea>
          </div>
          <div>
            <button onClick={createNote} className="btn btn-success mr-2">
              Add note
            </button>
            <button onClick={updateNote} className="btn btn-primary">
              Update note
            </button>
          </div>
        </div>
        <div className="col-md-12">
          <h1 className="text-center">Notes List</h1>
          <table className="table notes-list table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Content</th>
                <th>Date &amp; Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr key={note.notesId}>
                  <td>{note.title}</td>
                  <td>{note.content}</td>
                  <td style={{ fontStyle: "italic", fontWeight: "bold" }}>
                    {new Date(note.createdDate).toLocaleString([], {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </td>
                  <td>
                    <button
                      onClick={() => setCurrentNote(note)}
                      className="btn btn-primary mr-2"
                    >
                      <FaPen style={{ color: "white" }} />
                    </button>
                    <button
                      onClick={() => deleteNote(note.notesId)}
                      className="btn btn-danger"
                    >
                      <FaTrash style={{ color: "white" }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Container>
);
};
export default Notes;

