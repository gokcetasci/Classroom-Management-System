"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import { FaExclamationCircle } from "react-icons/fa";

const ViewStudentList = ({
  classInfo,
  onDeleteStudent,
  onAddStudent,
  onBackToClassList,
  setShowClassButton,
}) => {
  // Hata mesajını saklamak tanımlanan state.
  const [errorMessage, setErrorMessage] = useState("");

  // Yup kütüphanesi kullanılarak form doğrulama şemaları belirlenir.
  const validationSchema = Yup.object({
    newStudentName: Yup.string()
      .min(3, "Must be at least 3 characters")
      .required("This filed is required"),
    newStudentEmail: Yup.string()
      .email("Invalid email address")
      .required("This filed is required"),
  });

  // useFormik hook'u kullanılarak form işlemleri yönetilir.
  const formik = useFormik({
    initialValues: {
      newStudentName: "",
      newStudentEmail: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Yeni öğrenci adı ve e-posta boş değilse, öğrenciyi ekler.
      if (
        values.newStudentName.trim() === "" ||
        values.newStudentEmail.trim() === ""
      ) {
        // Hata mesajı ayarlanır.
        setErrorMessage("Please enter both name and email information!");
      } else {
        // Yeni öğrenci eklenir, form sıfırlanır ve hata mesajı temizlenir.
        onAddStudent(values.newStudentName, values.newStudentEmail);
        formik.resetForm();
        setErrorMessage("");
      }
    },
  });

  // Öğrenci silme işlevi tanımlanır. Belirtilen öğrenci ID'sine göre silme gerçekleştirilir.
  const handleDeleteStudent = (studentId) => {
    onDeleteStudent(studentId);
  };

  return (
    <div id="studentlist" className="container mx-auto">
      <div className="flex flex-row pl-6 items-center h-[60px] sm:h-[90px] md:h-[120px]">
        {/* Geri tuşuna basıldığında sınıf listesine dönmeyi sağlar */}
        <button
          id="backtoclasslistbutton"
          onClick={() => {
            onBackToClassList();
            setShowClassButton(true);
          }}
          className="mr-2"
        >
          <FaArrowLeft className="w-3 sm:w-6 h-3 sm:h-6" />
        </button>
        {/* Sınıf adını ve "Student List" başlığını görüntüler */}
        <h2 className="text-[14px] sm:text-[20px] md:text-[26px] font-semibold ">
          {classInfo.name} Student List
        </h2>
      </div>

      {/* Yeni öğrenci eklemek için form elemanlarını içeren bölüm */}
      <div
        id="addstudentform"
        className="flex flex-col lg:flex-row items-center justify-center mb-[50px] shadow-md p-8 rounded-md bg-[#eef2ff] mx-6 sm:mx-8 md:mx-12 relative"
      >
        <div className="mr-0 lg:mr-8 flex flex-col sm:flex-row items-center justify-center mb-5 lg:mb-0">
          <div className="flex flex-col mr-0 sm:mr-6 mb-3 sm:mb-0 ">
            <input
              type="text"
              name="newStudentName"
              value={formik.values.newStudentName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="New Student Name"
              className={`border focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md max-w-[180px] sm:max-w-[238px] text-[8px] sm:text-[16px]`}
            />
            {formik.errors.newStudentName && formik.touched.newStudentName ? (
              <div className="z-10 bg-[#ef4444] text-white w-full mt-1 flex items-center justify-center rounded-md border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-[16px]">
                <FaExclamationCircle className="mr-2 " />
                {formik.errors.newStudentName}
              </div>
            ) : null}
          </div>
          <div className="mr-0 lg:mr-6">
            <input
              type="email"
              name="newStudentEmail"
              value={formik.values.newStudentEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="New Student E-mail"
              className={`border focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md max-w-[180px] sm:max-w-[238px] text-[8px] sm:text-[16px]`}
            />

            {formik.errors.newStudentEmail && formik.touched.newStudentEmail ? (
              <div className="z-10 bg-[#ef4444] text-white w-full flex items-center justify-center mt-1 rounded-md border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-[16px]">
                <FaExclamationCircle className="mr-2 " />
                {formik.errors.newStudentEmail}
              </div>
            ) : null}
          </div>
        </div>

        {/* Hata mesajını görüntüler */}
        {errorMessage && (
          <div className="absolute -top-10 z-20 flex items-center justify-center mx-12">
            <div className="bg-[#ef4444] text-white w-full sm:w-96 flex items-center justify-center rounded-md p-1 border border-[2px] border-solid border-[#dddddd]">
              {errorMessage}
            </div>
          </div>
        )}

        {/* Yeni öğrenci eklemek için kullanılan buton */}
        <div
          id="addstudentbutton"
          className="flex flex-row items-center justify-center bg-primary/75 text-white py-2 px-4 sm:px-6 rounded-full hover:scale-105 hover:bg-primary w-28 sm:w-36 md:w-48 text-[8px] sm:text-[16px]"
        >
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

      {/* Öğrenci listesini görüntüleyen tablo */}
      <div
        id="studentlisttable"
        className="flex items-center justify-center mx-6 sm:mx-12"
      >
        <table className="table-auto border-collapse border-b border-tableborder w-full max-w-[900px] ">
          <thead>
            <tr className="text-tablehead text-[10px] sm:text-[12px] md:text-[15px] font-semibold leading-[21px] ">
              <th className="border-b border-tableborder py-[5px] sm:py-[10px] text-center w-[20px] sm:w-[60px] px-2 sm:px-6 ">
                Photo
              </th>
              <th className="border-b border-tableborder p-[5px] sm:p-[10px] text-left">
                Student Name & Email
              </th>
              <th className="border-b border-tableborder p-[5px] sm:p-[10px] text-left">
                Class Name
              </th>
              <th className="border-b border-tableborder p-[5px] sm:p-[10px] text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-tablepcolor text-[8px] sm:text-[10px] md:text-[14px] leading-[20px] font-normal w-full ">
            {classInfo.students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="border-b border-tableborder py-4 px-[5px] sm:px-[10px] text-center ">
                  <PiStudentFill className="ml-2 sm:ml-6 w-4 sm:w-6 h-4 sm:h-6" />
                </td>
                <td className="border-b border-tableborder py-4 px-[5px] sm:px-[10px]">
                  <div className="text-[#333333] text-[9px] sm:text-[12px] md:text-[15px] font-semibold">
                    {student.name}
                  </div>
                  <div>{student.email}</div>
                </td>
                <td className="border-b border-tableborder py-4 px-[5px] sm:px-[10px]">
                  {classInfo.name}
                </td>
                <td
                  id="deletestudentbutton"
                  className="border-b border-tableborder py-4 px-[10px] text-center"
                >
                  <button
                    onClick={() => handleDeleteStudent(student.id)}
                    className=""
                  >
                    <RiDeleteBinFill className="fill-deletebutton w-3 sm:w-5 h-3 sm:h-5 hover:scale-105" />
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
