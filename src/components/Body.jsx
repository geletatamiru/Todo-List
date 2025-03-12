import { useState, useReducer } from 'react';
import TaskInput from './TaskInput';
import TodoItem from './TodoItem';
import "./Body.css";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "TOGGLE_COMPLETE":
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      )
      .sort((a, b) => a.completed - b.completed);
      ;
    case "REMOVE_TASK":
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};
export default function Body() {
  const [tasks, dispatch] = useReducer(taskReducer,[]);

  const handleTask = (task) => {
   dispatch({type: "ADD_TASK",payload: task});
  }

  const toggleComplete = (taskId) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: taskId });
  };

  const removeTask = (taskId) => {
    dispatch({ type: "REMOVE_TASK", payload: taskId });
  };

  const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
  tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  
  return (
    <div className='body'>
      <h1>Today's Tasks</h1>
      <TaskInput onAddTask={handleTask}/>
      <div className='tasks'>
        {
          tasks.map(task => {
            return <TodoItem 
              key={task.id} 
              task={task} 
              onToggleComplete={toggleComplete} 
              onRemoveTask={removeTask}
            />
          })
        }
      </div>
      
    </div>
  )
}
