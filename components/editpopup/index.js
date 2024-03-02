import React, { useState } from "react";
import useStore from "@/utils/store";

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit Class</h2>
        <div className="mb-4">
          <label className="w-full flex flex-row items-center ">
            <p className="w-[150px]">Class Name:</p>
            <input
              type="text"
              name="name"
              value={editedValues.name}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md"
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
              className="border border-gray-300 p-2 rounded-md"
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
              className="border border-gray-300 p-2 rounded-md"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <button className="bg-blue-500 text-black px-4 py-2 rounded-md mr-2" onClick={handleSave}>Save</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditPopUp;
