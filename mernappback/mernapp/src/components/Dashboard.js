import React, { useState,useEffect } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import axios from "axios";

const Dashboard = () => {
  const [isSessionActive, setIsSessionActive] = useState(true);
  let timeout;

  const resetTimeout = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(Lo, 15 * 60 * 1000); // 15 minutes
  };

    const uid = sessionStorage.getItem("uid");
    useEffect(() => {
        if (!uid) {
            alert("Please Login First");
            window.location.href = "/"; 
            return;
            
      }
      getNotes();
      getothersNotes();
      const handleUserActivity = () => {
        resetTimeout();
      };
  
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("keypress", handleUserActivity);
  
      resetTimeout();
  
      return () => {
        window.removeEventListener("mousemove", handleUserActivity);
        window.removeEventListener("keypress", handleUserActivity);
        clearTimeout(timeout);
      };
      
       
      }, [uid]);
    
  const [currentView, setCurrentView] = useState("home");
  const [notes, setNotes] = useState([]);
    const [othersnotes, setothersNotes] = useState([]);
    const [editNote, setEditNote] = useState(null);
    const [newNote, setNewNote] = useState({ title: "", content: "" });
   
    const editExistingNote = (note) => {
        setEditNote(note);
        setCurrentView("editnote")
  };
    const getNotes = async () => {
        const res = await axios.get(`http://localhost:5000/note_view/${uid}`)
        setNotes(res.data);
    };
    const getothersNotes = async () => {
        const res = await axios.get(`http://localhost:5000/note_viewothers/${uid}`)
        setothersNotes(res.data);
  };
  
  const Logout = () => {
        setIsSessionActive(false);
        sessionStorage.removeItem("uid");
        alert("You have logged out");
    window.location.href = "/";
  }
  const Lo = () => {
    setIsSessionActive(false);
    sessionStorage.removeItem("uid");
window.location.href = "/";
 }
    
   

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value });
  };

  const addNote = async(e) => {
    e.preventDefault();
    if (newNote.title && newNote.content) {
        const res = await axios.post('http://localhost:5000/note_post', {title: newNote.title, content:newNote.content,uid: uid})
        if (res.data.status === "ok") {
            setNewNote({ title: "", content: "" });
            getNotes();
            setCurrentView("view-notes");
        } else {
            alert("Failed to add note.");
        }
      
    } else {
      alert("Please fill out both fields.");
    }
    };
    const handleEditNoteChange = (e) => {
        const { name, value } = e.target;
        setEditNote({ ...editNote, [name]: value });
      };
    const saveEditedNote = async (e) => {
        e.preventDefault();
        if (editNote.title && editNote.content) {
          try {
            await axios.post(`http://localhost:5000/note_update`, {
              title: editNote.title,
              content: editNote.content,
              id: editNote._id
            });
              setEditNote(null);

              getNotes();
              setCurrentView("view-notes")
          } catch (error) {
            alert("Failed to update note.");
          }
        } else {
          alert("Please fill out both fields.");
        }
      };
    
      const deleteNote = async (noteId) => {
        try {
          await axios.get(`http://localhost:5000/note_delete/${noteId}`);
          getNotes();
        } catch (error) {
          alert("Failed to delete note.");
        }
      };
    

  return (
    <Container fluid className="dashboard-container">
      {isSessionActive ? (
        <Row style={{height:"100vh"}}>
        {/* Sidebar */}
        <Col xs={3} md={2} className="sidebar bg-dark text-white">
          <h3 className="text-center py-3 border-bottom">My Dashboard</h3>
          <Nav className="flex-column">
            <Nav.Item className="my-2">
              <Nav.Link
                className={`text-white ${currentView === "home" ? "active-link" : ""}`}
                onClick={() => setCurrentView("home")}
              >
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="my-2">
              <Nav.Link
                className={`text-white ${currentView === "add-note" ? "active-link" : ""}`}
                onClick={() => setCurrentView("add-note")}
              >
                Add Note
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="my-2">
              <Nav.Link
                className={`text-white ${currentView === "view-notes" ? "active-link" : ""}`}
                onClick={() => setCurrentView("view-notes")}
              >
                View Notes
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <button
            className="btn btn-danger mt-auto mx-3 mb-3"
            onClick={() => Logout()}
          >
            Logout
          </button>
        </Col>

        {/* Main Content */}
        <Col xs={9} md={10} className="content p-4">
          {currentView === "home" && (
            <div>
              <h2>Welcome Back!</h2>
              <div className="row">
                {othersnotes.map((note) => (
                  <div className="col-md-4 mb-4" key={note.id}>
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === "add-note" && (
            <div>
              <h2>Add a New Note</h2>
              <form onSubmit={addNote} className="mb-4">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control custom-input"
                    name="title"
                    placeholder="Note Title"
                    value={newNote.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control custom-input"
                    name="content"
                    rows="3"
                    placeholder="Note Content"
                    value={newNote.content}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn custom-btn">
                  Add Note
                </button>
              </form>
            </div>
                  )}
                   {currentView === "editnote" && (
            <div>
              <h2>Edit Note</h2>
              <form onSubmit={saveEditedNote} className="mb-4">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control custom-input"
                    name="title"
                    placeholder="Note Title"
                    value={editNote.title}
                    onChange={handleEditNoteChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control custom-input"
                    name="content"
                    rows="3"
                    placeholder="Note Content"
                    value={editNote.content}
                    onChange={handleEditNoteChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn custom-btn">
                  Edit Note
                </button>
              </form>
            </div>
          )}

          {currentView === "view-notes" && (
            <div>
              <h2>Your Notes</h2>
              <p>You have {notes.length} notes saved.</p>
              
              <div className="row">
                {notes.map((note) => (
                  <div className="col-md-4 mb-4" key={note.id}>
                    <div className="card shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                                <p className="card-text">{note.content}</p>
                                <button
                      className="btn btn-warning me-3"
                      onClick={() => editExistingNote(note)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteNote(note._id)}
                    >
                      Delete
                    </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Col>
      </Row>
      ): (
        <h1>Session Expired. Please log in again.</h1>
      )}
      
    </Container>
  );
};

export default Dashboard;
