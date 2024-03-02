import { create } from "zustand";

const useStore = create((set) => ({
  classes: [
    {
      id: 1,
      name: "Class 1",
      numericName: "101",
      capacity: 30,
      students: [
        { id: 1, name: "Student 1" },
        { id: 2, name: "Student 2" },
      ],
    },
    {
      id: 2,
      name: "Class 2",
      numericName: "102",
      capacity: 25,
      students: [
        { id: 3, name: "Student 3" },
        { id: 4, name: "Student 4" },
      ],
    },
    {
      id: 3,
      name: "Class 3",
      numericName: "103",
      capacity: 28,
      students: [
        { id: 5, name: "Student 5" },
        { id: 6, name: "Student 6" },
      ],
    },
    {
      id: 4,
      name: "Class 4",
      numericName: "104",
      capacity: 32,
      students: [
        { id: 7, name: "Student 7" },
        { id: 8, name: "Student 8" },
      ],
    },
    {
      id: 5,
      name: "Class 5",
      numericName: "105",
      capacity: 27,
      students: [
        { id: 9, name: "Student 9" },
        { id: 10, name: "Student 10" },
      ],
    },
    {
      id: 6,
      name: "Class 6",
      numericName: "106",
      capacity: 29,
      students: [
        { id: 11, name: "Student 11" },
        { id: 12, name: "Student 12" },
      ],
    },
    {
      id: 7,
      name: "Class 7",
      numericName: "107",
      capacity: 26,
      students: [
        { id: 13, name: "Student 13" },
        { id: 14, name: "Student 14" },
      ],
    },
    {
      id: 8,
      name: "Class 8",
      numericName: "108",
      capacity: 31,
      students: [
        { id: 15, name: "Student 15" },
        { id: 16, name: "Student 16" },
      ],
    },
    {
      id: 9,
      name: "Class 9",
      numericName: "109",
      capacity: 24,
      students: [
        { id: 17, name: "Student 17" },
        { id: 18, name: "Student 18" },
      ],
    },
    {
      id: 10,
      name: "Class 10",
      numericName: "110",
      capacity: 30,
      students: [
        { id: 19, name: "Student 19" },
        { id: 20, name: "Student 20" },
      ],
    },
  ],
  addClass: (formData) => {
    set((state) => {
      const newClass = {
        ...formData,
        id: state.classes.length + 1,
        students: [],
      };
      return { classes: [...state.classes, newClass] };
    });
  },

  editClass: (classId, editedValues) =>
    set((state) => {
      const updatedClasses = state.classes.map((classInfo) =>
        classInfo.id === classId ? { ...classInfo, ...editedValues } : classInfo
      );

      return { classes: updatedClasses };
    }),

  deleteClass: (classId) =>
    set((state) => ({
      classes: state.classes.filter((classInfo) => classInfo.id !== classId),
    })),
    addStudent: (classId, studentName) =>
    set((state) => {
      console.log('Updating state with new student:', classId, studentName);
      const updatedClasses = state.classes.map((classInfo) =>
        classInfo.id === classId
          ? {
              ...classInfo,
              students: [
                ...classInfo.students,
                { id: classInfo.students.length + 1, name: studentName },
              ],
            }
          : classInfo
      );
  
      return { classes: updatedClasses };
    }),
  
  
  

  deleteStudent: (classId, studentId) =>
    set((state) => ({
      classes: state.classes.map((classInfo) =>
        classInfo.id === classId
          ? {
              ...classInfo,
              students: classInfo.students.filter(
                (student) => student.id !== studentId
              ),
            }
          : classInfo
      ),
    })),
}));

export default useStore;
