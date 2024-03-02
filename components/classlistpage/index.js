"use client";
import React, { useEffect, useState } from "react";
import useStore from "@/utils/store";
import EditPopUp from "../editpopup";
import ViewStudentList from "../studentlist";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
const ClassListPage = () => {
  const { classes, addStudent, deleteStudent } = useStore();
  const [currentClass, setCurrentClass] = useState(null);
  const [editClassId, setEditClassId] = useState(null);
  const [showEditPopUp, setShowEditPopUp] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

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

  const handleDropdownToggle = (classId) => {
    setDropdownOpen(dropdownOpen === classId ? null : classId);
  };

  const handleDropdownSelect = (action, classId) => {
    setDropdownOpen(null);
    if (action === "edit") {
      handleEditClick(classId);
    } else if (action === "view") {
      handleViewStudentList(classId);
    }
  };
  
  return (
    <div>
      <div>
        {currentClass ? (
          <ViewStudentList
            classInfo={classes.find(
              (classInfo) => classInfo.id === currentClass
            )}
            onDeleteStudent={(studentId) =>
              deleteStudent(currentClass, studentId)
            }
            onAddStudent={(studentName, studentEmail) =>
              addStudent(currentClass, studentName, studentEmail)
            }
            onBackToClassList={handleBackToClassList}
          />
        ) : (
          <>
            <div className="container mx-auto ">
              <table className="table-auto border-collapse  border-b border-tableborder w-full ">
                <thead>
                  <tr className="text-tablehead text-[15px] font-semibold leading-[21px] ">
                  <th className="border-b border-tableborder p-[10px] text-center w-[60px] px-6">
                      İmage
                    </th>
                    <th className="border-b border-tableborder p-[10px] text-left">
                      Class Name
                    </th>
                    <th className="border-b border-tableborder p-[10px] text-left">
                      Class Numeric Value
                    </th>
                    <th className="border-b border-tableborder p-[10px] text-left">
                      Student Capacity
                    </th>
                    <th className="border-b border-tableborder p-[10px] w-[40px] px-6">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-tablepcolor text-[14px] leading-[15px] font-normal w-full ">
                  {classes.map((classInfo) => (
                    <tr key={classInfo.id} >
                      <td className="border-b border-tableborder py-4 px-[10px]">
                      <PiStudentFill className="ml-6 w-4 h-4"/>
                      </td>
                      <td className="border-b border-tableborder py-4 px-[10px]">
                        {classInfo.name}
                      </td>
                      <td className="border-b border-tableborder py-4 px-[10px]">
                        {classInfo.numericName}
                      </td>
                      <td className="border-b border-tableborder py-4 px-[10px]">
                        {classInfo.capacity}
                      </td>
                      <td className="border-b border-tableborder text-tablepcolor">
                        <div className="relative inline-block flex items-center justify-center  ">
                          <div>
                            <button
                              type="button"
                              className="inline-flex text-tablepcolor"
                              onClick={() => handleDropdownToggle(classInfo.id)}
                            >
                              <BsThreeDotsVertical className="fill-tablepcolor w-[26px] h-[26px] " />
                            </button>
                          </div>

                          {dropdownOpen === classInfo.id && (
                            <div
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="options-menu"
                            >
                              <div role="none">
                                <button
                                  className="block p-[10px] flex flex-row items-center text-[15px] hover:bg-[#f3f4f6] w-full"
                                  role="menuitem"
                                  onClick={() =>
                                    handleDropdownSelect("edit", classInfo.id)
                                  }
                                >
                                  <FaEdit className="mr-2 w-4 h-4"/>
                                  Edit
                                </button>
                                <button
                                  className="block p-[10px] flex flex-row items-center text-[15px] hover:bg-[#f3f4f6] w-full"
                                  onClick={() =>
                                    handleDropdownSelect("view", classInfo.id)
                                  }
                                >
                                  <FaList className="mr-2 w-4 h-4" />
                                  View Student List
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
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
            classInfo={classes.find(
              (classInfo) => classInfo.id === editClassId
            )}
            onClose={() => setShowEditPopUp(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ClassListPage;
