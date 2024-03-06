import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useStore from "@/utils/store";
import { IoClose } from "react-icons/io5";
import { FaExclamationCircle } from "react-icons/fa";

const EditPopUp = ({ classInfo, onClose }) => {
  const { editClass } = useStore(); 

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "En az 3 karakter olmalıdır.")
      .required("Bu alan zorunludur."),
    numericName: Yup.number()
      .required("Bu alan zorunludur.")
      .positive("Pozitif bir değer giriniz.")
      .min(1, "0'dan büyük olmalıdır."),
    capacity: Yup.number()
      .required("Bu alan zorunludur.")
      .positive("Pozitif bir değer giriniz.")
      .min(1, "0'dan büyük olmalıdır."),
  });

  return (
    <div
      id="editpopuppage"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
    >
      <div className="relative bg-white p-4 sm:p-8 rounded-md shadow-md w-[285px] sm:w-[450px]">
        <h2 className="text-sm sm:text-2xl font-bold mb-4">
          Sınıf Bilgilerini Düzenle
        </h2>
        <Formik
          initialValues={{
            name: classInfo.name,
            numericName: classInfo.numericName,
            capacity: classInfo.capacity,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            editClass(classInfo.id, values);
            onClose();
          }}
        >
          <Form>
            <div id="classnameinput" className="mb-4">
              <label className="w-full flex flex-row items-center ">
                <p className="w-[85px] sm:w-[150px] text-[14px] sm:[16px]">
                  Sınıf Adı:
                </p>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className={`border focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md mr-6 max-w-[180px] sm:max-w-[238px] text-sm`}
                />
              </label>
              <ErrorMessage
                name="name"
                component={({ children }) => (
                  <div className="z-10 bg-[#ef4444] text-white flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                    <FaExclamationCircle className="mr-2" />
                    {children}
                  </div>
                )}
              />
            </div>
            <div id="numericnameinput" className="mb-4">
              <label className="w-full flex flex-row items-center ">
                <p className="w-[85px] sm:w-[150px] text-[14px] sm:[16px]">
                  Sınıf Sayısal Adı:
                </p>
                <Field
                  type="text"
                  name="numericName"
                  id="numericName"
                  className={`border focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md mr-6 max-w-[180px] sm:max-w-[238px] text-sm`}
                />
              </label>
              <ErrorMessage
                name="numericName"
                component={({ children }) => (
                  <div className="z-10 bg-[#ef4444] text-white flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                    <FaExclamationCircle className="mr-2" />
                    {children}
                  </div>
                )}
              />
            </div>
            <div id="studentcapacityinput" className="mb-4">
              <label className="w-full flex flex-row items-center ">
                <p className="w-[85px] sm:w-[150px] text-[14px] sm:[16px]">
                  Öğrenci Kapasitesi:
                </p>
                <Field
                  type="number"
                  name="capacity"
                  id="capacity"
                  className={`border focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md mr-6 max-w-[180px] sm:max-w-[238px] text-sm`}
                />
              </label>
              <ErrorMessage
                name="capacity"
                component={({ children }) => (
                  <div className="z-10 bg-[#ef4444] text-white flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                    <FaExclamationCircle className="mr-2" />
                    {children}
                  </div>
                )}
              />
            </div>
            <div id="buttons" className="flex justify-end">
              <button
                type="submit"
                id="savebutton"
                className="flex items-center justify-center bg-primary/75 text-white py-2 sm:py-4 px-4 sm:px-6 rounded-full hover:scale-105 hover:bg-primary w-16 sm:w-24 cursor-pointer"
              >
                Kaydet
              </button>
              <button
                id="closebutton"
                className="absolute top-4 right-4 text-[#ef4444] hover:scale-105 hover:text-[#dc2626]"
                onClick={onClose}
              >
                <IoClose className="w-5 sm:w-8 h-5 smh-8" />
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditPopUp;
