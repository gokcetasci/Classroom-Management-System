"use client"
import React from 'react';
import { useEffect } from 'react';
import useStore from '@/utils/store';

const ClassListPage = () => {
  const { classes } = useStore();

  useEffect(() => {
    console.log(classes);
  }, [classes]);

  return (
    <div>
      <h1>Class List Page</h1>
      <div>
        <h2>Class List</h2>
        <ul>
          {classes.map((classInfo) => (
            <li key={classInfo.id}>
              {classInfo.name} - {classInfo.numericName} - Capacity: {classInfo.capacity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClassListPage;
