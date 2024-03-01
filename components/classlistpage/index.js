"use client"
import React, { useState } from 'react';
import { useEffect } from 'react';
import useStore from '@/utils/store';

const ClassListPage = () => {
  const { classes, editClass, addStudent, deleteStudent } = useStore();
  const [editMode, setEditMode] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [newStudentName, setNewStudentName] = useState('');
  const [currentClass, setCurrentClass] = useState(null);

  useEffect(() => {
    console.log(classes);
  }, [classes]);

  const handleEditClick = (classId) => {
    setEditMode(classId);
    const editedClass = classes.find((classInfo) => classInfo.id === classId);
    setEditedValues(editedClass);
  };

  const handleSaveEdit = (classId) => {
    editClass(classId, editedValues);
    setEditMode(null);
    setEditedValues({});
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedValues({});
  };

  const handleAddStudent = (classId) => {
    addStudent(classId, newStudentName);
    setNewStudentName('');
  };

  const handleDeleteStudent = (classId, studentId) => {
    deleteStudent(classId, studentId);
  };

  const handleViewStudentList = (classId) => {
    setCurrentClass(classId);
  };
  

  const handleBackToClassList = () => {
    setCurrentClass(null);
  };

  return (
    <div>
      <h1>Class List Page</h1>
      <div>
        {currentClass ? (
          <>
            <h2>Student List</h2>
            <ul>
              {classes
                .find((classInfo) => classInfo.id === currentClass)
                ?.students.map((student) => (
                  <li key={student.id}>
                    {student.name}
                    <button onClick={() => handleDeleteStudent(currentClass, student.id)}>Delete Student</button>
                  </li>
                ))}
            </ul>
            <input
              type="text"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              placeholder="New Student Name"
            />
            <button onClick={() => handleAddStudent(currentClass)}>Add Student</button>
            <button onClick={handleBackToClassList}>Back to Class List</button>
          </>
        ) : (
          <>
            <h2>Class List</h2>
            <ul>
              {classes.map((classInfo) => (
                <li key={classInfo.id}>
                  {editMode === classInfo.id ? (
                    <>
                      <input
                        type="text"
                        name="name"
                        value={editedValues.name || ''}
                        onChange={(e) => setEditedValues({ ...editedValues, name: e.target.value })}
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        name="numericName"
                        value={editedValues.numericName || ''}
                        onChange={(e) => setEditedValues({ ...editedValues, numericName: e.target.value })}
                        placeholder="Numeric Name"
                      />
                      <input
                        type="text"
                        name="capacity"
                        value={editedValues.capacity || ''}
                        onChange={(e) => setEditedValues({ ...editedValues, capacity: e.target.value })}
                        placeholder="Capacity"
                      />
                      <button onClick={() => handleSaveEdit(classInfo.id)}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {classInfo.name} - {classInfo.numericName} - Capacity: {classInfo.capacity}
                      <button onClick={() => handleEditClick(classInfo.id)}>Edit</button>
                      <button onClick={() => handleViewStudentList(classInfo.id)}>View Student List</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ClassListPage;
