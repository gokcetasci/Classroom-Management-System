import React, { useState } from 'react';
import useStore from '@/utils/store';

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
    <div>
      <h2>Edit Class</h2>
      <label>
        Class Name:
        <input type="text" name="name" value={editedValues.name} onChange={handleInputChange} />
      </label>
      <label>
        Numeric Name:
        <input type="text" name="numericName" value={editedValues.numericName} onChange={handleInputChange} />
      </label>
      <label>
        Student Capacity:
        <input type="number" name="capacity" value={editedValues.capacity} onChange={handleInputChange} />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditPopUp;
