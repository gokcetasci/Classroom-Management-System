"use client"
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useStore from '@/utils/store';

const AddClassPage = () => {
  const { addClass } = useStore();

  const validationSchema = Yup.object({
    name: Yup.string().required('This field is required'),
    numericName: Yup.number().required('This field is required').positive('Class Numeric Name must be positive'),
    capacity: Yup.number().required('This field is required').positive('Student Capacity must be positive'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      numericName: '',
      capacity: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addClass(values);//add global state
      formik.resetForm();
    },
  });

  return (
    <div>
      <h1>Add Class Page</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Class Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </div>
        <div>
          <label htmlFor="numericName">Class Numeric Name:</label>
          <input
            type="number"
            id="numericName"
            name="numericName"
            value={formik.values.numericName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.numericName && formik.errors.numericName ? <div>{formik.errors.numericName}</div> : null}
        </div>
        <div>
          <label htmlFor="capacity">Student Capacity:</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formik.values.capacity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.capacity && formik.errors.capacity ? <div>{formik.errors.capacity}</div> : null}
        </div>
        <button type="submit">Add Class</button>
      </form>
    </div>
  );
};

export default AddClassPage;
