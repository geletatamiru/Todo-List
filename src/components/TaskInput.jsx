import React, { useReducer } from "react";
import "./TaskInput.css";

const INITIAL_STATE = {
  id: null,
  task: "",
  time: "",
  date: new Date().toISOString().split("T")[0], // Default to today's date
  category: "Work",
  completed: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "task":
      return { ...state, task: action.payload.value };
    case "time":
      return { ...state, time: action.payload.value };
    case "date":
      return { ...state, date: action.payload.value };
    case "category":
      return { ...state, category: action.payload.value };
    default:
      return state;
  }
};

export default function TaskInput({ onAddTask }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.task.trim()) return;
    onAddTask({ ...state, id: Date.now() });

    dispatch({ type: "task", payload: { value: "" } });
    dispatch({ type: "time", payload: { value: "" } });
    dispatch({ type: "date", payload: { value: new Date().toISOString().split("T")[0] } });
    dispatch({ type: "category", payload: { value: "Work" } });
  };

  const handleTimeChange = (e) => {
    const timeValue = e.target.value;
    if (timeValue) {
      const [hours, minutes] = timeValue.split(":");
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      dispatch({ type: "time", payload: { value: `${formattedHours}:${minutes} ${ampm}` } });
    }
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        className="task"
        type="text"
        value={state.task}
        placeholder="Add a new task..."
        onChange={(e) => dispatch({ type: "task", payload: { value: e.target.value } })}
      />
      <input className="time" type="time" value={state.time} onChange={handleTimeChange} />
      <input
        className="date"
        type="date"
        value={state.date}
        onChange={(e) => dispatch({ type: "date", payload: { value: e.target.value } })}
      />
      <select
        className="category"
        value={state.category}
        onChange={(e) => dispatch({ type: "category", payload: { value: e.target.value } })}
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Health">Health</option>
        <option value="Others">Others</option>
      </select>
      <button className="btn" type="submit">
        Add
      </button>
    </form>
  );
}
