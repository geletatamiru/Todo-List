import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo } from './state/todo/todoSlice';

export default function Todo( {todo} ) {
  const dispatch = useDispatch();
  return (
    <div>
      <li 
        style={{ textDecoration: todo.completed ? "line-through" : "none", margin: "0 10px", display: "inline"}} 
        onClick={() => {dispatch(toggleTodo(todo.id))}}>{todo.text}
      </li>
      <button onClick={() => {dispatch(deleteTodo(todo.id))}}>Delete</button>
    </div>
  )
}
