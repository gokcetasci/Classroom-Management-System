"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useStore from "@/utils/store";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import Modal from "@/components/modal";
import { FaCheck } from "react-icons/fa6";

const AddClassPage = () => {
  const { addClass } = useStore();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required("This field is required"),
    numericName: Yup.number()
      .required("This field is required")
      .positive("Class Numeric Name must be positive"),
    capacity: Yup.number()
      .required("This field is required")
      .positive("Student Capacity must be positive"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      numericName: "",
      capacity: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addClass(values);
      formik.resetForm();
      setIsSuccessModalOpen(true);
    },
  });

  return (
    <div className="container mx-auto">
      <div className="flex flex-row ml-6 items-center h-[120px]">
        <Link href={"/class"} className="mr-2">
          <FaArrowLeft className="w-6 h-6" />
        </Link>
        <h2 className="text-[26px] ">Add Class</h2>
      </div>
      <div className="my-2 pb-[15px] text-[18px] text-tablehead leading-[21px] font-semibold tracking-wide mx-6">
        <h2>CLASS INFORMATION </h2>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-3 mb-6">
          <div className="flex flex-col items-left relative ">
            <label
              htmlFor="name"
              className="absolute left-4 -top-3 font-semibold bg-white px-1 text-[#818386] text-[14px]"
            >
              Class Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border border-[#9ca3af]
            } focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md mr-6`}
            />

            {formik.touched.name && formik.errors.name ? (
              <div className="z-10 bg-[#ef4444] text-white w-48 flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd]">
                <FaExclamationCircle className="mr-2" />
                {formik.errors.name}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-left relative ">
            <label
              htmlFor="name"
              className="absolute left-4 -top-3 font-semibold bg-white px-1 text-[#818386] text-[14px]"
            >
              Class Numeric Name*
            </label>
            <input
              type="number"
              id="numericName"
              name="numericName"
              value={formik.values.numericName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border border-[#9ca3af]
            } focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md mr-6`}
            />
            {formik.touched.numericName && formik.errors.numericName ? (
              <div className="z-10 bg-[#ef4444] text-white w-48 flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd]">
                <FaExclamationCircle className="mr-2" />
                {formik.errors.numericName}
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-left relative ">
            <label
              htmlFor="name"
              className="absolute left-4 -top-3 font-semibold bg-white px-1 text-[#818386] text-[14px]"
            >
              Student Capacity*
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formik.values.capacity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border border-[#9ca3af]
            } focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md mr-6`}
            />
            {formik.touched.capacity && formik.errors.capacity ? (
              <div className="z-10 bg-[#ef4444] text-white w-48 flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd]">
                <FaExclamationCircle className="mr-2 " />
                {formik.errors.capacity}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center bg-primary/75 text-white py-4 px-6 rounded-full hover:scale-105 hover:bg-primary w-44 cursor-pointer">
          <button type="submit" className="flex flex-row items-center ">
            <span className="mr-2">
              <FaPlus />
            </span>
            Add Class
          </button>
        </div>
      </form>
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <div className="p-4 relative">
          <div className="flex flex-row items-center justify-center">
            <div className="absolute -top-12 right-18 w-16 h-16 flex items-center justify-center bg-[#71c341] rounded-full animate-bounce ">
              <FaCheck className="w-8 h-8 fill-white z-1 " />
            </div>

            <div className="flex flex-col items-center justify-center py-6">
              <h1 className="text-2xl pb-4 font-bold">Success!</h1>
              <p className="text-lg text-black/75 font-normal pb-8">
              New class information added!
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSuccessModalOpen(false)}
            className="text-white w-full rounded-md py-4 sm:py-2 bg-[#71c341] hover:scale-105 text-semibold"
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddClassPage;
