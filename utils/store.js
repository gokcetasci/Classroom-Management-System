import { create } from 'zustand';

const useStore = create((set) => ({
  classes: [
    { id: 1, name: 'Class 1', numericName: '101', capacity: 30 },
    { id: 2, name: 'Class 2', numericName: '102', capacity: 25 },
  ],
  addClass: (formData) =>
    set((state) => ({ classes: [...state.classes, { ...formData, id: state.classes.length + 1 }] })),
}));

export default useStore;