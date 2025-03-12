import React,{useState} from 'react'
import "./TodoItem.css"

export default function TodoItem({task,onToggleComplete,onRemoveTask}) {
  return (
    <div className={`todo-item ${task.completed ? "completed" : ""}`}>
      <span className='task'>{task.task}</span>
      {
        task.completed && <span className='task-completed'>Completed</span> 
      }
      <span className='time'>{task.time}</span>
      <span className='category'>{task.category}</span>
      <input className='complete-btn' type='checkbox' onChange={() => { onToggleComplete(task.id)}}/>
      <button className='remove-btn' onClick={() => {onRemoveTask(task.id)}}>&#10006;</button>
    </div>
  )
}
