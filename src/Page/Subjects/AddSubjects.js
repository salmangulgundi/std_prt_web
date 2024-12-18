import React, { useEffect, useState } from "react";
import ReusableModal from "../Modal/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddSubjects.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [subjectInputs, setSubjectInputs] = useState([""]);
  const [editModal, setEditModal] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [deleteModal , setDeleteModal] = useState(false);
  const [deleteSubject , setDeleteSubject] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const standard = localStorage.getItem("selectedStandard");
        if (!standard) {
          alert("Standard is missing in localStorage!");
          return;
        }
  
        const response = await axios.post("http://localhost:8443/api/getSubjects", {
          standard,
        });
  
        if (response.status === 200) {
          if (response.data.message) {
            setSubjects([]); // Set subjects to empty array if message is found
           
          } else {
            setSubjects(response.data.result.subject); // Set the subjects if found
          }
        } else {
          alert("Failed to fetch subjects. Please try again.");
        }
      } catch (error) {
        alert("An error occurred while fetching subjects: " + error.message);
      }
    };
  
    fetchSubjects();
  }, []);
  
  // Add a new subject field
  const addSubjectField = () => setSubjectInputs([...subjectInputs, ""]);

  // Handle input changes
  const handleSubjectChange = (index, value) => {
    const updatedInputs = [...subjectInputs];
    updatedInputs[index] = value;
    setSubjectInputs(updatedInputs);
  };

  // Remove a specific field
  const removeSubjectField = (index) => {
    const updatedInputs = subjectInputs.filter((_, i) => i !== index);
    setSubjectInputs(updatedInputs);
  };

  // Save subjects
  const saveSubjects = async () => {
    const standard = localStorage.getItem("selectedStandard");
    const newSubjects = subjectInputs
      .filter((name) => name.trim())
      .map((name, index) => ({
        id: subjects.length + index + 1,
        subjectName: name,
      }));

    if (!standard) {
      alert("Standard is missing in localStorage!");
      return;
    }

    if (newSubjects.length === 0) {
      alert("Please add at least one subject.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8443/api/addSubjects", {
        standard,
        subjects: newSubjects,
      });

      if (response.status === 200) {
        setShowModal(false);
        setSubjectInputs([""]);
        setSubjects([...subjects, ...response.data.Subjects.subject]);
        alert("Subjects added successfully!");
      } else {
        alert("Failed to add subjects. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while adding subjects.");
    }
  };

  // Open edit modal with selected subject
  const handleEditSubject = (subject) => {
    console.log(subject);
    setEditSubject(subject);
    setEditModal(true);
  };

  const handledeleteSubject = (subject) => {
    console.log(subject);
    setDeleteSubject(subject);
    setDeleteModal(true);
  }

  // Save edited subject
  const saveEditedSubject = async () => {
    if (!editSubject || !editSubject.subjectName.trim()) {
      alert("Subject name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8443/api/editSubject", {
        id: editSubject.id,
        subjectName: editSubject.subjectName,
        standard: localStorage.getItem("selectedStandard"),
      });

      if (response.status === 200) {
        setSubjects((prev) =>
          prev.map((subject) =>
            subject.id === editSubject.id ? { ...subject, ...response.data.subject } : subject
          )
        );
        setEditModal(false);
        setEditSubject(null);
        window.location.reload();
      } else {
        alert("Failed to edit the subject. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while editing the subject.");
    }
  };

  const saveDeleteSubject = async () => {
    if (!deleteSubject || !deleteSubject.subjectName.trim()) {
      alert("Subject name cannot be empty.");
      return;
    }

    console.log("inside the save delete function" ,  deleteSubject.id , deleteSubject.subjectName)
    try {
      const response = await axios.post("http://localhost:8443/api/deleteSubject", {
        id: deleteSubject.id,
        subjectName: deleteSubject.subjectName,
        standard: localStorage.getItem("selectedStandard"),
      });

      if (response.status === 200) {
        setSubjects((prev) =>
          prev.map((subject) =>
            subject.id === deleteSubject.id ? { ...subject, ...response.data.subject } : subject
          )
        );
        
        setDeleteModal(false);
        setDeleteSubject(null);
        window.location.reload();
      } else {
        alert("Failed to delete the subject. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while editing the subject.");
    }
  };

  const handleQuiz = () => {
    navigate("/addquiz")
  }

  return (
    <div className="containerStyle py-4">
      <div className="card-style">
        <h2 className="heading text-center mb-4">Subject Management</h2>

        <button
          className="btn btn-primary mb-3 d-block mx-auto"
          onClick={() => setShowModal(true)}
        >
          Add Subject
        </button>

        <ReusableModal
          show={showModal}
          onHide={() => setShowModal(false)}
          title="Add Subjects"
          onSave={saveSubjects}
        >
          <div className="form-group">
            {subjectInputs.map((subject, index) => (
              <div key={index} className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Subject Name ${index + 1}`}
                  value={subject}
                  onChange={(e) => handleSubjectChange(index, e.target.value)}
                />
                <button
                  className="btn btn-danger"
                  onClick={() => removeSubjectField(index)}
                >
                  Cancel
                </button>
              </div>
            ))}
            <button className="btn btn-warning w-100" onClick={addSubjectField}>
              Add More Subjects
            </button>
          </div>
        </ReusableModal>

        {/* Edit Modal */}
        <ReusableModal
          show={editModal}
          onHide={() => setEditModal(false)}
          title="Edit Subject"
          onSave={saveEditedSubject}
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={editSubject?.subjectName || ""}
              onChange={(e) =>
                setEditSubject({ ...editSubject, subjectName: e.target.value })
              }
            />
          </div>
        </ReusableModal>

          <ReusableModal
          show={deleteModal}
          onHide={() => setDeleteModal(false)}
          title="Are you sure you want to delete the subject"
          onSave={saveDeleteSubject}
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={deleteSubject?.subjectName || ""}
              onChange={(e) =>
                setDeleteSubject({ ...deleteSubject, subjectName: e.target.value })
              }
              disabled
            />
          </div>
        </ReusableModal>

        <div className="table-responsive">
          <table className="tabHeader table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>Sl.No</th>
                <th>Subject Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <tr key={subject.id}>
                  <td>{index + 1}</td>
                  <td>{subject.subjectName}</td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm me-2"
                      onClick={() => handleEditSubject(subject)}
                    >
                      Edit Subject
                    </button>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handledeleteSubject(subject)}
                    >
                      Delete Subject
                    </button>
                    <button className="btn btn-warning btn-sm me-2" onClick={handleQuiz}>Add Quiz</button>
                    <button className="btn btn-info btn-sm me-2">Add Videos</button>
                    <button className="btn btn-success btn-sm">Add Document</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  {subjects.length === 0 ? "No subjects found for the standard." : "Loading..."}
                </td>
              </tr>
            )}
          </tbody>
          

          </table>
        </div>
      </div>
    </div>
  );
}
