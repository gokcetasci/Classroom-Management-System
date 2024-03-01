import { create } from 'zustand';

const useStore = create((set) => ({
  classes: [
    { id: 1, name: 'Class 1', numericName: '101', capacity: 30, students: [{ id: 1, name: 'Student 1' }, { id: 2, name: 'Student 2' }] },
    { id: 2, name: 'Class 2', numericName: '102', capacity: 25, students: [{ id: 3, name: 'Student 3' }, { id: 4, name: 'Student 4' }] },
  ],
  addClass: (formData) =>
    set((state) => ({ classes: [...state.classes, { ...formData, id: state.classes.length + 1, students: [] }] })),
  editClass: (classId, editedValues) =>
    set((state) => ({
      classes: state.classes.map((classInfo) =>
        classInfo.id === classId ? { ...classInfo, ...editedValues } : classInfo
      ),
    })),
  deleteClass: (classId) => set((state) => ({ classes: state.classes.filter((classInfo) => classInfo.id !== classId) })),
  addStudent: (classId, studentName) =>
    set((state) => ({
      classes: state.classes.map((classInfo) =>
        classInfo.id === classId
          ? { ...classInfo, students: [...classInfo.students, { id: classInfo.students.length + 1, name: studentName }] }
          : classInfo
      ),
    })),
  deleteStudent: (classId, studentId) =>
    set((state) => ({
      classes: state.classes.map((classInfo) =>
        classInfo.id === classId
          ? { ...classInfo, students: classInfo.students.filter((student) => student.id !== studentId) }
          : classInfo
      ),
    })),
}));

export default useStore;
