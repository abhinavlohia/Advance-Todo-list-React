import React from 'react';

const Task = ({ task, onDragStart, openPopup, deleteTask }) => {
  return (
    <div className="list-item" draggable="true" onDragStart={(event) => onDragStart(event, task.id)} id={task.id}>
      <h4>{task.heading}</h4>
      <button className="viewTaskbtn" onClick={() => openPopup(task.heading, task.description)}>
        <i className="fa-solid fa-eye"></i>
      </button>
      <button className="deleteTaskbtn" onClick={() => deleteTask(task.id)}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default Task;
