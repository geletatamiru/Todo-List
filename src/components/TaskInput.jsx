import React,{useState} from 'react'
import "./TaskInput.css";
export default function TaskInput({onAddTask}) {
  const [task, setTask] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Work");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    onAddTask({ task, time, priority, category });
    setTask("");
    setTime("");
    setPriority("Medium");
    setCategory("Work");
  } 
  return (
    <form className='task-input' onSubmit={handleSubmit}>
      <input 
        className='task'
        type='text'
        value={task} 
        placeholder="Add a new task..."
        onChange={(e) => setTask(e.target.value)}
      />
      <input 
        className='time'
        type='time'
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <select
        className='priority'
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
      <select
        className='category'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Health">Health</option>
        <option value="Others">Others</option>
      </select>
      <button className='btn' type='submit'>Add</button>
    </form>
  )
}
