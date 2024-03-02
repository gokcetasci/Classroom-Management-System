"use client"
import React, { useState } from 'react';

const ViewStudentList = ({ classInfo, onDeleteStudent, onAddStudent, onBackToClassList }) => {
  const [newStudentName, setNewStudentName] = useState('');

  const handleDeleteStudent = (studentId) => {
    onDeleteStudent(studentId);
  };

  const handleAddStudent = () => {
    onAddStudent(newStudentName);
    setNewStudentName('');
  };

  return (
    <>
      <h2>Student List</h2>
      <ul>
        {classInfo.students.map((student) => (
          <li key={student.id}>
            {student.name}
            <button onClick={() => handleDeleteStudent(student.id)}>Delete Student</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newStudentName}
        onChange={(e) => setNewStudentName(e.target.value)}
        placeholder="New Student Name"
      />
      <button onClick={handleAddStudent}>Add Student</button>
      <button onClick={onBackToClassList}>Back to Class List</button>
    </>
  );
};

export default ViewStudentList;
