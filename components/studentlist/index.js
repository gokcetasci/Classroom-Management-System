"use client";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";

const ViewStudentList = ({
  classInfo,
  onDeleteStudent,
  onAddStudent,
  onBackToClassList,
  setShowClassButton,
}) => {
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");

  const handleDeleteStudent = (studentId) => {
    onDeleteStudent(studentId);
  };
  const handleAddStudent = () => {
    onAddStudent(newStudentName, newStudentEmail);
    setNewStudentName("");
    setNewStudentEmail("");
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row items-center h-[120px]">
        <button
          onClick={() => {
            onBackToClassList();
            setShowClassButton(true);
          }}
          className="mr-2"
        >
          <FaArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-[26px] font-semibold ">
          {classInfo.name} Student List
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center mb-[50px] shadow-md p-8 rounded-md bg-[#eef2ff] mx-12 ">
        <div className="mr-0 sm:mr-8 flex-col sm:flex-row items-center justify-center mb-5 sm:mb-0">
          <input
            type="text"
            value={newStudentName}
            onChange={(e) => {
              setNewStudentName(e.target.value);
              console.log("New Student Name:", e.target.value);
            }}
            placeholder="New Student Name"
            className={`border border-[#9ca3af] focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md mr-0 sm:mr-6 mb-3 sm:mb-0`}
          />

          <input
            type="email"
            value={newStudentEmail}
            onChange={(e) => {
              setNewStudentEmail(e.target.value);
              console.log("New Student Email:", e.target.value);
            }}
            placeholder="New Student E-mail"
            className={`border border-[#9ca3af] focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md mr-0 sm:mr-6`}
          />
        </div>

        <div className="flex flex-row items-center justify-center bg-primary/75 text-white py-2 px-6 rounded-full hover:scale-105 hover:bg-primary w-48">
          <button
            onClick={handleAddStudent}
            className="flex flex-row items-center "
          >
            <span className="mr-2">
              <FaPlus />
            </span>
            Add Student
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center mx-12">
  <table className="table-auto border-collapse border-b border-tableborder w-full max-w-[900px] sm:max-w-full">
          <thead>
            <tr className="text-tablehead text-[12px] sm:text-[15px] font-semibold leading-[21px] ">
              <th className="border-b border-tableborder p-[10px] text-center w-[60px] px-6 hidden sm:flex">
                Photo
              </th>
              <th className="border-b border-tableborder p-[10px] text-left">
                Student Name & Email
              </th>
              <th className="border-b border-tableborder p-[10px] text-left">
                Class Name
              </th>
              <th className="border-b border-tableborder p-[10px] text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-tablepcolor text-[11px] sm:text-[14px] leading-[20px] font-normal w-full ">
            {classInfo.students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="border-b border-tableborder py-4 px-[10px] text-center hidden sm:flex">
                  <PiStudentFill className="ml-6 w-6 h-6" />
                </td>
                <td className="border-b border-tableborder py-4 px-[10px]">
                  <div className="text-[#333333] text-[12px] sm:text-[15px] font-semibold">
                    {student.name}
                  </div>
                  <div>{student.email}</div>
                </td>
                <td className="border-b border-tableborder py-4 px-[10px]">
                  {classInfo.name}
                </td>
                <td className="border-b border-tableborder py-4 px-[10px] text-center">
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className=""
                  >
                    <RiDeleteBinFill className="fill-[#DC143C] w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudentList;
