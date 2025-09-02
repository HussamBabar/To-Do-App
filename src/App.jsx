import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    // load saved tasks from localStorage
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");

  // Save tasks in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <h1>✨ My Advanced To-Do List</h1>

      <div className="task-input">
        <input
          type="text"
          value={newTask}
          placeholder="Enter a new task..."
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="stats">
        <p>Total: {tasks.length}</p>
        <p>Completed: {tasks.filter((t) => t.completed).length}</p>
        <p>Remaining: {tasks.filter((t) => !t.completed).length}</p>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleTask(index)}>{task.text}</span>
            <div className="buttons">
              <button className="done" onClick={() => toggleTask(index)}>
                {task.completed ? "Undo" : "Done"}
              </button>
              <button className="delete" onClick={() => deleteTask(index)}>
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
