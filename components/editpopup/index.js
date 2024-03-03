import React, { useState } from "react";
import useStore from "@/utils/store";
import { IoClose } from "react-icons/io5";

const EditPopUp = ({ classInfo, onClose }) => {
  const { editClass } = useStore();
  const [editedValues, setEditedValues] = useState({
    name: classInfo.name,
    numericName: classInfo.numericName,
    capacity: classInfo.capacity,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSave = () => {
    editClass(classInfo.id, editedValues);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="relative bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit Class Information</h2>
        <div className="mb-4">
          <label className="w-full flex flex-row items-center ">
            <p className="w-[150px]">Class Name:</p>
            <input
              type="text"
              name="name"
              value={editedValues.name}
              onChange={handleInputChange}
              className={`border border-[#9ca3af] focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md mr-6`}
              />
          </label>
        </div>
        <div className="mb-4">
        <label className="w-full flex flex-row items-center ">
          <p className="w-[150px]">Numeric Name:</p>
            <input
              type="text"
              name="numericName"
              value={editedValues.numericName}
              onChange={handleInputChange}
              className={`border border-[#9ca3af] focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md mr-6`}
              />
          </label>
        </div>
        <div className="mb-4">
        <label className="w-full flex flex-row items-center ">
          <p className="w-[150px]">Student Capacity:</p>
            <input
              type="number"
              name="capacity"
              value={editedValues.capacity}
              onChange={handleInputChange}
              className={`border border-[#9ca3af] focus:outline-none hover:ring-primary hover:ring-1 p-2 rounded-md mr-6`}
              />
          </label>
        </div>
        <div className="flex justify-end">
          <button className="flex items-center justify-center bg-primary/75 text-white py-4 px-6 rounded-full hover:scale-105 hover:bg-primary w-24 cursor-pointer" onClick={handleSave}>Save</button>
          <button className="absolute top-4 right-4 text-[#ef4444] hover:scale-105 hover:text-[#dc2626]" onClick={onClose}><IoClose className="w-8 h-8"/></button>
        </div>
      </div>
    </div>
  );
};

export default EditPopUp;
