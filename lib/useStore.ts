// import create from 'https://dev.jspm.io/zustand';
// import create from 'https://esm.sh/zustand';
import create from '../.packages/zustand/index.js';

const useStore = create((set: any) => ({
  people: ['John', 'Jane'],
  addPerson: (person: string) =>
    set((state: any) => ({ people: [...state.people, person] })),
}));

export default useStore;