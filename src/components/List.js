import React from "react";
import Task from "./Task";

const List = ({ title, tasks, onDrop, onDragOver, drag, deleteTask, openPopup }) => {
  return (
    <div className="list" id={title} onDrop={(event) => onDrop(event, title)} onDragOver={onDragOver}>
      <div className="heading">
        <h1>{title}</h1>
      </div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} openPopup={openPopup} deleteTask={deleteTask} drag = {drag} />
      ))}
    </div>
  );
};

export default List;
