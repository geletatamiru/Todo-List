import React from 'react'
import "./Body.css";
import TaskInput from './TaskInput';
export default function Body() {
  const handleTask = (obj) => {
    console.log(obj);
  }
  return (
    <div className='body'>
      <h1>Today's Tasks</h1>
      <TaskInput onAddTask={handleTask}/>
    </div>
  )
}
