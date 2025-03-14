import { useReducer } from 'react';
import TaskInput from './TaskInput';
import TodoItem from './TodoItem';
import "./Body.css";

const getFormattedDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // "YYYY-MM-DD"
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        [action.payload.date]: [...(state[action.payload.date] || []), action.payload]
      };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        [action.payload.date]: state[action.payload.date].map(task =>
          task.id === action.payload.id ? { ...task, completed: !task.completed } : task
        ).sort((a, b) => a.completed - b.completed)
      };
    case "REMOVE_TASK":
      return {
        ...state,
        [action.payload.date]: state[action.payload.date].filter(task => task.id !== action.payload.id)
      };
    default:
      return state;
  }
};

export default function Body() {
  const [tasks, dispatch] = useReducer(taskReducer, {});
  const today = getFormattedDate();
  console.log(tasks);
  const handleTask = (task) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  const toggleComplete = (task) => {
    dispatch({ type: "TOGGLE_COMPLETE", payload: task });
  };

  const removeTask = (task) => {
    dispatch({ type: "REMOVE_TASK", payload: task });
  };

  return (
    <div className='body'>
      <h1>Today's Tasks</h1>
      <TaskInput onAddTask={handleTask} />
      <div className='tasks'>
        {tasks[today] && tasks[today].map(task => (
          <TodoItem 
            key={task.id} 
            task={task} 
            onToggleComplete={() => toggleComplete(task)} 
            onRemoveTask={() => removeTask(task)}
          />
        ))}
      </div>
    </div>
  );
}
