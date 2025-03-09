import React, {useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addTodo, filterTodo } from "./state/todo/todoSlice"
import Todo from './Todo';
export default function App() {
  const [input, setInput] = useState("");
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo({id: Math.random(),text: input, completed: false}));
    setInput("");
  }
  return (
    <div>
      <h1>My Todo</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => { setInput(e.target.value) }} value={input} />
        <button type='submit'>Add Todo</button>
      </form>
          {
            todos.map(todo => {
              return <Todo key={todo.id} todo={todo} />
            })
          }
    </div>
  );
}
