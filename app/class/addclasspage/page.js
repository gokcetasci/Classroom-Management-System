"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaArrowLeft,
  FaPlus,
  FaExclamationCircle
} from "react-icons/fa";
import useStore from "@/utils/store";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'

const AddClassPage = () => {
  const { addClass } = useStore(); // store'daki addClass'ı aldık
  const router = useRouter()

  //form için yup ile doğrulama şeması
  const validationSchema = Yup.object({
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

  //form durumu ve validasyonları yöneten fonksiyon başlangıç değerleri alınıyor ve form gönderildiğinde onsubmit fonksiyonu çalışıyor
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
      toast.success("Yeni sınıf bilgileri eklendi!", {
        onClose: () => {
          // Redirect to /class page after the toast is closed
          router.back();
        },
      });
    },
  });

  return (
    <div id="addclasspage" className="container mx-auto">
      {/* Sınıf listesine sayfasına geri dönmek için button*/}
      <div
        id="backtoclasspagebutton"
        className="flex flex-row ml-6 items-center h-[60px] sm:h-[120px]"
      >
        <Link href={"/class"} className="mr-2">
          <FaArrowLeft className=" w-3 sm:w-6 h-3 sm:h-6 hover:scale-105 hover:text-[#6366f1]" />
        </Link>
        <h2 className="text-[14px] sm:text-[20px] md:text-[26px]">Sınıf Ekle</h2>
      </div>
      <div className="pb-[15px] sm:pb-[30px] text-[12px] sm:text-[18px] text-tablehead leading-[21px] font-semibold tracking-wide m-4 sm:m-8">
        <h2>SINIF BİLGİLERİ </h2>
      </div>

      {/* Yeni sınıf eklemek için form*/}
      <form
        id="addclassform"
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div
          id="addclassinputs"
          className="flex flex-col lg:flex-row gap-6 lg:gap-3 mb-6"
        >
          <div
            id="classnameinput"
            className="flex flex-col items-left relative "
          >
            <label
              htmlFor="name"
              className="absolute left-4 -top-3 font-semibold bg-white px-1 text-[#818386] text-[10px] sm:text-[14px]"
            >
              Sınıf Adı*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border border-[#9ca3af]
            focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md sm:mr-6 max-w-[180px] sm:max-w-[238px]`}
            />
            {/* Class Name için error mesajı */}
            {formik.touched.name && formik.errors.name ? (
              <div className="z-10 bg-[#ef4444] text-white flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                <FaExclamationCircle className="mr-2" />
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div
            id="numericnameinput"
            className="flex flex-col items-left relative "
          >
            <label
              htmlFor="name"
              className="absolute left-4 -top-3 font-semibold bg-white px-1 text-[#818386] text-[10px] sm:text-[14px]"
            >
              Sınıf Sayısal Adı*
            </label>
            <input
              type="number"
              id="numericName"
              name="numericName"
              value={formik.values.numericName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border border-[#9ca3af]
            focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md sm:mr-6 max-w-[180px] sm:max-w-[238px]`}
            />
            {/* Class Name Numeric için error mesajı */}
            {formik.touched.numericName && formik.errors.numericName ? (
              <div className="z-10 bg-[#ef4444] text-white flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                <FaExclamationCircle className="mr-2" />
                {formik.errors.numericName}
              </div>
            ) : null}
          </div>

          <div
            id="capacityinput"
            className="flex flex-col items-left relative "
          >
            <label
              htmlFor="name"
              className="absolute left-4 -top-3 font-semibold bg-white px-1 text-[#818386] text-[10px] sm:text-[14px]"
            >
              Öğrenci Kapasitesi*
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formik.values.capacity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border border-[#9ca3af]
              focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md sm:mr-6 max-w-[180px] sm:max-w-[238px]`}
            />
            {/* Student Capacity için error mesajı */}
            {formik.touched.capacity && formik.errors.capacity ? (
              <div className="z-10 bg-[#ef4444] text-white flex items-center justify-center rounded-md p-1 mt-2 border border-[2px] border-solid border-[#dddddd] text-[8px] sm:text-sm">
                <FaExclamationCircle className="mr-2 " />
                {formik.errors.capacity}
              </div>
            ) : null}
          </div>
        </div>

        <div
          id="addclassbutton"
          className="flex flex-row items-center justify-center bg-primary/75 text-white py-4 px-6 rounded-full hover:scale-105 hover:bg-primary w-36 sm:w-40 md:w-44 h-14 sm:f-full text-sm cursor-pointer"
        >
          <button type="submit" className="flex flex-row items-center ">
            <span className="mr-2">
              <FaPlus />
            </span>
            Sınıf Ekle
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddClassPage;
