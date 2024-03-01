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
            <div className='container mx-auto'>
            <table className="table-auto border-collapse  border-b border-tableborder w-full ">
              <thead >
                <tr className='text-tablehead text-[15px] font-semibold leading-[21px] '>
                  <th className='border-b border-tableborder w-p-[10px]'>Class Name</th>
                  <th className='border-b border-tableborder w-p-[10px]'>Class Numeric Value</th>
                  <th className='border-b border-tableborder w-p-[10px]'>Student Capacity</th>
                  <th className='border-b border-tableborder p-[10px] w-[40px]'>Action</th>
                </tr>
              </thead>
              <tbody className='text-tablepcolor text-[14px] leading-[15px] font-normal '>
                {classes.map((classInfo) => (
                  <tr key={classInfo.id}>
                    <td className='border-b border-tableborder py-4 px-[10px]'>{classInfo.name}</td>
                    <td className='border-b border-tableborder py-4 px-[10px]'>{classInfo.numericName}</td>
                    <td className='border-b border-tableborder py-4 px-[10px]'>{classInfo.capacity}</td>
                    <td className='border-b border-tableborder'>
                      
                      {editMode === classInfo.id ? (
                        <>
                          <button onClick={() => handleSaveEdit(classInfo.id)}>Save</button>
                          <button onClick={handleCancelEdit}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEditClick(classInfo.id)}>Edit</button>
                          <button onClick={() => handleViewStudentList(classInfo.id)}>View Student List</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClassListPage;
