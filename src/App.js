import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import Popup from './components/Popup';

const App = () => {
  const [role, setRole] = useState('developer');
  const [tasks, setTasks] = useState([]);
  const [taskIdCounter, setTaskIdCounter] = useState(1);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const taskKeys = Object.keys(storedTasks);
    let maxTaskId = 0;
    const parsedTasks = taskKeys.map((taskId) => {
      const task = storedTasks[taskId];
      const taskIdNumber = parseInt(taskId.replace('Task ', ''));
      if (taskIdNumber > maxTaskId) {
        maxTaskId = taskIdNumber;
      }
      return { id: taskId, ...task };
    });
    setTasks(parsedTasks);
    let nextTaskIdCounter = maxTaskId + 1;
    if (!Number.isFinite(nextTaskIdCounter)) {
      nextTaskIdCounter = 1;
    }
    setTaskIdCounter(nextTaskIdCounter);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks.reduce((acc, task) => ({ ...acc, [task.id]: task }), {})));
  }, [tasks]);

  const switchRole = () => {
    const selectedRole = document.getElementById('role-selector').value;
    setRole(selectedRole);
  };

  const addNewTask = () => {
    const taskHeading = prompt('Enter the task heading:');
    if (taskHeading) {
      const taskDescription = prompt('Enter the task description:');
      if (taskDescription) {
        const taskId = `Task ${taskIdCounter}`;
        const newTask = { id: taskId, column: 'todo', heading: taskHeading, description: taskDescription };
        setTasks([...tasks, newTask]);
        setTaskIdCounter(taskIdCounter + 1);
      }
    }
  };


  const updateTaskColumn = (taskId, column) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, column } : task))
    );
  };

  // const openPopup = (heading, description) => {
  //   setPopupData({ heading, description });
  // };

  const closePopup = () => {
    setPopupData(null);
  };

  const onDrop = (event, column) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text');
    const currentColumn = tasks.find((task) => task.id === taskId).column;

    if (role === 'developer') {
      if (currentColumn === 'todo' && column === 'in-dev') {
        updateTaskColumn(taskId, column);
      } else if (currentColumn === 'in-dev' && column === 'in-testing') {
        updateTaskColumn(taskId, column);
      } else if (currentColumn === 'in-testing' && column === 'in-dev') {
        updateTaskColumn(taskId, column);
      } else if (currentColumn === 'in-dev' && column === 'todo') {
        updateTaskColumn(taskId, column);
      }
    } else if (role === 'tester') {
      if (currentColumn === 'in-testing' && column === 'completed') {
        updateTaskColumn(taskId, column);
      } else if (currentColumn === 'completed' && column === 'in-testing') {
        updateTaskColumn(taskId, column);
      }
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div id="role-container">
        <label id="role-label" htmlFor="role-selector">Select Your role:</label>
        <select id="role-selector" onChange={switchRole}>
          <option value="developer">Developer</option>
          <option value="tester">Tester</option>
        </select>
        <button id="addNewTask" onClick={addNewTask}>Add Task in Todo</button>
        <button id="deleteAllTask" onClick={() => setTasks([])}>Delete all Tasks</button>
      </div>

      {popupData && (
        <Popup heading={popupData.heading} description={popupData.description} onClose={closePopup} />
      )}

      <div className="main-container">
        <TodoList
          title="Todo"
          tasks={tasks.filter((task) => task.column === 'todo')}
          onDrop={onDrop}
          onDragOver={onDragOver}
        />
        <TodoList
          title="Under Development"
          tasks={tasks.filter((task) => task.column === 'in-dev')}
          onDrop={onDrop}
          onDragOver={onDragOver}
        />
        <TodoList
          title="Under Testing"
          tasks={tasks.filter((task) => task.column === 'in-testing')}
          onDrop={onDrop}
          onDragOver={onDragOver}
        />
        <TodoList
          title="Completed"
          tasks={tasks.filter((task) => task.column === 'completed')}
          onDrop={onDrop}
          onDragOver={onDragOver}
        />
      </div>
    </div>
  );
};

export default App;
