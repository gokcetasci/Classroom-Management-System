"use client";
import React, { useEffect, useState } from 'react';
import useStore from '@/utils/store';
import EditPopUp from '../editpopup';
import ViewStudentList from '../studentlist';

const ClassListPage = () => {
  const { classes, addStudent, deleteStudent } = useStore();
  const [currentClass, setCurrentClass] = useState(null);
  const [editClassId, setEditClassId] = useState(null);
  const [showEditPopUp, setShowEditPopUp] = useState(false);

  useEffect(() => {
    console.log(classes);
  }, [classes]);

  const handleEditClick = (classId) => {
    setShowEditPopUp(true);
    setEditClassId(classId);
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
          
           <ViewStudentList
            classInfo={classes.find((classInfo) => classInfo.id === currentClass)}
            onDeleteStudent={(studentId) => deleteStudent(currentClass, studentId)}
            onAddStudent={(studentName) => addStudent(currentClass, studentName)}
            onBackToClassList={handleBackToClassList}
          />
          
        ) : (
          <>
            <div className='container mx-auto'>
              <table className="table-auto border-collapse  border-b border-tableborder w-full ">
                <thead>
                  <tr className='text-tablehead text-[15px] font-semibold leading-[21px] '>
                    <th className='border-b border-tableborder p-[10px]'>Class Name</th>
                    <th className='border-b border-tableborder p-[10px]'>Class Numeric Value</th>
                    <th className='border-b border-tableborder p-[10px]'>Student Capacity</th>
                    <th className='border-b border-tableborder p-[10px] w-[40px]'>Action</th>
                  </tr>
                </thead>
                <tbody className='text-tablepcolor text-[14px] leading-[15px] font-normal '>
                  {classes.map((classInfo) => (
                    <tr key={classInfo.id}>
                      <td className='border-b border-tableborder py-4 px-[10px]'>{classInfo.name}</td>
                      <td className='border-b border-tableborder py-4 px-[10px]'>{classInfo.numericName}</td>
                      <td className='border-b border-tableborder py-4 px-[10px]'>{classInfo.capacity}</td>
                      <td className='border-b border-tableborder text-tablepcolor'>
                      <button onClick={() => handleEditClick(classInfo.id)}>
                            Edit
                          </button>
                          <button onClick={() => handleViewStudentList(classInfo.id)}>View Student List</button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {showEditPopUp && (
          <EditPopUp
            classInfo={classes.find((classInfo) => classInfo.id === editClassId)}
            onClose={() => setShowEditPopUp(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ClassListPage;
