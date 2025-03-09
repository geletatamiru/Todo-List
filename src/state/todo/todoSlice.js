 import { createSlice } from "@reduxjs/toolkit";
 const initialState = [
  { id: 1, text: "Learn Redux", completed: false },
  { id: 2, text: "Build a project", completed: false },
];
 const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
       state.push(action.payload);
    },
    toggleTodo: (state, action) => {
      state.forEach(todo => {
        if(todo.id == action.payload){
          todo.completed = (todo.completed) ? false : true;
        }
      })
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id != action.payload);
    },
    filterTodo: (state, action) => {

    }
  }
 })

 export const { addTodo, toggleTodo, deleteTodo, filterTodo } = todoSlice.actions;
 export default todoSlice.reducer;