import React, { useState, useEffect } from "react";
import RoleSelector from "./components/RoleSelector";
import Popup from "./components/Popup";
import List from "./components/List";
import "./App.css";

function App() {
  const [role, setRole] = useState("developer");
  const [tasks, setTasks] = useState({});
  const [popupData, setPopupData] = useState(null);
  let [taskIdCounter, setTaskIdCounter] = useState(parseInt(localStorage.getItem("taskIdCounter")) || 1);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const switchRole = (event) => {
    setRole(event.target.value);
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const drag = (event) => {
    event.dataTransfer.setData("text", event.target.id);
  };

  const drop = (event, column) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    const taskElement = document.getElementById(taskId);

    const currentColumn = taskElement.parentNode.id;

    if (role === "developer") {
      if (currentColumn === "todo" && column === "in-dev") {
        document.getElementById(column).appendChild(taskElement);
        updateTaskColumn(taskId, column);
      } else if (currentColumn === "in-dev" && column === "in-testing") {
        document.getElementById(column).appendChild(taskElement);
        updateTaskColumn(taskId, column);
      } else if (currentColumn === "in-testing" && column === "in-dev") {
        document.getElementById(column).appendChild(taskElement);
        updateTaskColumn(taskId, column);
      } else if (currentColumn === "in-dev" && column === "todo") {
        document.getElementById(column).appendChild(taskElement);
        updateTaskColumn(taskId, column);
      }
    } else if (role === "tester") {
      if (currentColumn === "in-testing" && column === "completed") {
        document.getElementById(column).appendChild(taskElement);
        updateTaskColumn(taskId, column);
      } else if (currentColumn === "completed" && column === "in-testing") {
        document.getElementById(column).appendChild(taskElement);
        updateTaskColumn(taskId, column);
      }
    }
  };

  const updateTaskColumn = (taskId, column) => {
    const updatedTasks = { ...tasks };
    updatedTasks[taskId].column = column;
    setTasks(updatedTasks);
  };

  const addNewTask = () => {
    const taskHeading = prompt("Enter the task heading:");
    if (taskHeading) {
      const taskDescription = prompt("Enter the task description:");
      if (taskDescription) {
        const taskId = "Task " + taskIdCounter++;

        const newTask = {
          id: taskId,
          column: "todo",
          heading: taskHeading,
          description: taskDescription,
        };

        setTasks((prevTasks) => ({ ...prevTasks, [taskId]: newTask }));
        setTaskIdCounter(taskIdCounter + 1);
      }
    }
  };

  const openPopup = (heading, description) => {
    setPopupData({ heading, description });
  };

  const closePopup = () => {
    setPopupData(null);
  };

  const deleteTask = (taskId) => {
    if (tasks[taskId].column === "todo") {
      const updatedTasks = { ...tasks };
      delete updatedTasks[taskId];
      setTasks(updatedTasks);
    }
  };

  const deleteAllTask = () => {
    localStorage.clear();
    setTasks({});
  };

  
  return (
    <div>
      <RoleSelector switchRole={switchRole} addNewTask={addNewTask} deleteAllTask={deleteAllTask} />
      {popupData && (
        <Popup heading={popupData.heading} description={popupData.description} closePopup={closePopup} />
      )}
      <div className="main-container">
        <List
          title="todo"
          tasks={Object.values(tasks).filter((task) => task.column === "todo")}
          onDrop={drop}
          onDragOver={allowDrop}
          drag={drag}
          deleteTask={deleteTask}
          openPopup={openPopup}
        />
        <List
          title="in-dev"
          tasks={Object.values(tasks).filter((task) => task.column === "in-dev")}
          onDrop={drop}
          onDragOver={allowDrop}
          drag={drag}
          deleteTask={deleteTask}
          openPopup={openPopup}
        />
        <List
          title="in-testing"
          tasks={Object.values(tasks).filter((task) => task.column === "in-testing")}
          onDrop={drop}
          onDragOver={allowDrop}
          drag={drag}
          deleteTask={deleteTask}
          openPopup={openPopup}
        />
        <List
          title="completed"
          tasks={Object.values(tasks).filter((task) => task.column === "completed")}
          onDrop={drop}
          onDragOver={allowDrop}
          drag={drag}
          deleteTask={deleteTask}
          openPopup={openPopup}
        />
      </div>
    </div>
  );
}

export default App;
