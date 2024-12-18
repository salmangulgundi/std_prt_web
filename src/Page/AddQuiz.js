import React, { useEffect, useState } from 'react';
import './AddQuiz.css'; // Import the CSS file
import axios from 'axios';
import { Button, Form, Card, Row, Col } from 'react-bootstrap'; // Import components from react-bootstrap

export default function AddQuiz() {
  const [quizName, setQuizName] = useState(''); // Separate state for quiz name
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [quizArray, setQuizArray] = useState([
    {
      id: Date.now(),
      question: '',
      answers: { a: '', b: '', c: '', d: '' },
      correctAnswer: '',
    },
  ]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const standard = localStorage.getItem('selectedStandard');
        if (!standard) {
          alert('Standard is missing in localStorage!');
          return;
        }

        const response = await axios.post('http://localhost:8443/api/getSubjects', {
          standard,
        });

        if (response.status === 200) {
          if (response.data.message) {
            setSubjects([]); // Set subjects to empty array if message is found
          } else {
            setSubjects(response.data.result.subject); // Set the subjects if found
          }
        } else {
          alert('Failed to fetch subjects. Please try again.');
        }
      } catch (error) {
        alert('An error occurred while fetching subjects: ' + error.message);
      }
    };

    fetchSubjects();
  }, []);

  const handleAddCard = () => {
    const newCard = {
      id: Date.now(),
      question: '',
      answers: { a: '', b: '', c: '', d: '' },
      correctAnswer: '',
    };
    setQuizArray([...quizArray, newCard]);
  };

  const handleDeleteCard = (id) => {
    setQuizArray(quizArray.filter((quiz) => quiz.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setQuizArray(
      quizArray.map((quiz) =>
        quiz.id === id
          ? {
              ...quiz,
              [field]:
                field === 'question' || field === 'correctAnswer'
                  ? value
                  : { ...quiz.answers, ...value },
            }
          : quiz
      )
    );
  };

  const handleSaveQuizData = async () => {
    if (!quizName.trim()) {
      alert('Please enter a quiz name.');
      return;
    }

    // Validation to ensure all fields are filled out
    if (
      quizArray.every(
        (quiz) =>
          quiz.question &&
          quiz.correctAnswer &&
          Object.values(quiz.answers).every((a) => a.trim() !== '')
      )
    ) {
      try {
        const selectedStandard = localStorage.getItem('selectedStandard');
        console.log(selectedStandard);

        const response = await axios.post('http://localhost:8443/api/addQuiz', {
          standard: selectedStandard,
          quizName, // Include quiz name
          selectedSubject,
          quizzes: quizArray,
        });

        if (response.status === 200) {
          alert('Quiz data saved successfully!');
          console.log('Saved Quiz Data:', response.data);
          setQuizName(''); // Reset quiz name
          setQuizArray([
            {
              id: Date.now(),
              question: '',
              answers: { a: '', b: '', c: '', d: '' },
              correctAnswer: '',
            },
          ]);
        } else {
          throw new Error(response.data.message || 'Failed to save quiz data.');
        }
      } catch (error) {
        console.error('Error saving quiz data:', error.message);
        alert('Error saving quiz data. Please try again.');
      }
    } else {
      alert('Please fill out all fields in all quiz cards before saving.');
    }
  };

  return (
    <div className="mainContainer">
      <div className="quiz-container">
        <h2 className="quiz-title">Add Quiz Questions</h2>

        {/* Quiz Name Input */}
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="quizName">
              <Form.Label>Quiz Name</Form.Label>
              <Form.Control
                type="text"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                placeholder="Enter quiz name"
              />
            </Form.Group>
          </Col>

          {/* Subject Dropdown */}
          <Col>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                as="select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select a subject</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject.subjectName}>
                    {subject.subjectName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Quiz Cards */}
        <div> 
          {quizArray.map((quiz) => (
            <Card key={quiz.id} className="mb-3 quiz-card">
              <Card.Body>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteCard(quiz.id)}
                  className="delete-card-btn"
                >
               x
                </Button>

                <Form.Group controlId={`question-${quiz.id}`} className="mb-3">
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    type="text"
                    value={quiz.question}
                    onChange={(e) => handleInputChange(quiz.id, 'question', e.target.value)}
                    placeholder="Enter question"
                  />
                </Form.Group>

                {['a', 'b', 'c', 'd'].map((key) => (
                  <Form.Group key={key} controlId={`answer-${key}-${quiz.id}`} className="mb-3">
                    <Form.Label>Answer {key.toUpperCase()}</Form.Label>
                    <Form.Control
                      type="text"
                      value={quiz.answers[key]}
                      onChange={(e) =>
                        handleInputChange(quiz.id, 'answers', { [key]: e.target.value })
                      }
                      placeholder={`Enter answer ${key.toUpperCase()}`}
                    />
                  </Form.Group>
                ))}

                <Form.Group controlId={`correctAnswer-${quiz.id}`} className="mb-3">
                  <Form.Label>Correct Answer</Form.Label>
                  <Form.Control
                    as="select"
                    value={quiz.correctAnswer}
                    onChange={(e) =>
                      handleInputChange(quiz.id, 'correctAnswer', e.target.value)
                    }
                  >
                    <option value="">Select Correct Answer</option>
                    {['a', 'b', 'c', 'd'].map((key) => (
                      <option key={key} value={key}>
                        {key.toUpperCase()}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* Buttons */}
        <div className="button-group">
          <Button variant="primary" onClick={handleAddCard} className="add-card-btn">
            Add Another Quiz
          </Button>
          <Button variant="success" onClick={handleSaveQuizData} className="save-data-btn">
            Save Quiz Data
          </Button>
        </div>
      </div>
    </div>
  );
}
