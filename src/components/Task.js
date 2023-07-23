import React from "react";

const Task = ({ task, openPopup, deleteTask, drag }) => {
  const { id, heading, description } = task;

  return (
    <div className="list-item" draggable="true" onDragStart={drag} id={id}>
      <h4>{heading}</h4>
      <button className="viewTaskbtn" onClick={() => openPopup(heading, description)}>
        <i className="fa-solid fa-eye"></i>
      </button>
      <button className="deleteTaskbtn" onClick={() => deleteTask(id)}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default Task;
