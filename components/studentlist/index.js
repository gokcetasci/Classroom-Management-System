"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";

const ViewStudentList = ({
  classInfo,
  onDeleteStudent,
  onAddStudent,
  onBackToClassList,
  setShowClassButton,
}) => {

  const [errorMessage, setErrorMessage] = useState("");


  const validationSchema = Yup.object({
    newStudentName: Yup.string()
      .min(3, "Must be at least 3 characters")
      .required("Required"),
    newStudentEmail: Yup.string()
      .email("Invalid email address")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      newStudentName: "",
      newStudentEmail: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (
        values.newStudentName.trim() === "" ||
        values.newStudentEmail.trim() === ""
      ) {
        setErrorMessage("Please enter both name and email information!");
      } else {
        onAddStudent(values.newStudentName, values.newStudentEmail);
        setNewStudentName("");
        setNewStudentEmail("");
        setErrorMessage("");
      }
    },
  });

  
  const handleDeleteStudent = (studentId) => {
    onDeleteStudent(studentId);
  };
  
  return (
    <div className="container mx-auto">
      <div className="flex flex-row pl-6  items-center h-[120px]">
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

      <div className="flex flex-col lg:flex-row items-center justify-center mb-[50px] shadow-md p-8 rounded-md bg-[#eef2ff] mx-6 md:mx-12 relative">
        <div className="mr-0 lg:mr-8 flex flex-col sm:flex-row items-center justify-center mb-5 lg:mb-0">
          <input
            type="text"
            name="newStudentName"
            value={formik.values.newStudentName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="New Student Name"
            className={`border ${
              formik.errors.newStudentName && formik.touched.newStudentName
                ? "border-red-500"
                : "border-[#9ca3af]"
            } focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md mr-0 sm:mr-6 mb-3 sm:mb-0`}
          />
          {formik.errors.newStudentName && formik.touched.newStudentName && (
            <div className="text-red-500">{formik.errors.newStudentName}</div>
          )}

          <input
            type="email"
            name="newStudentEmail"
            value={formik.values.newStudentEmail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="New Student E-mail"
            className={`border ${
              formik.errors.newStudentEmail && formik.touched.newStudentEmail
                ? "border-red-500"
                : "border-[#9ca3af]"
            } focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md mr-0 lg:mr-6`}
          />
          {formik.errors.newStudentEmail && formik.touched.newStudentEmail && (
            <div className="text-red-500">{formik.errors.newStudentEmail}</div>
          )}
        </div>
        {errorMessage && (
          <div className="absolute -top-10 z-20 flex items-center justify-center mx-12">
            <div className="bg-[#ef4444] text-white w-full sm:w-96 flex items-center justify-center rounded-md p-1 border border-[2px] border-solid border-[#dddddd]">
              {errorMessage}
            </div>
          </div>
        )}
        <div className="flex flex-row items-center justify-center bg-primary/75 text-white py-2 px-6 rounded-full hover:scale-105 hover:bg-primary w-48 ">
          <button
            onClick={formik.handleSubmit}
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
        <table className="table-auto border-collapse border-b border-tableborder w-full max-w-[900px] ">
          <thead>
            <tr className="text-tablehead text-[12px] sm:text-[15px] font-semibold leading-[21px] ">
              <th className="border-b border-tableborder p-[10px] text-center w-[20px] sm:w-[60px] px-6 ">
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
                <td className="border-b border-tableborder py-4 px-[10px] text-center ">
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
                    <RiDeleteBinFill className="fill-[#DC143C] w-5 h-5 hover:scale-105" />
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
