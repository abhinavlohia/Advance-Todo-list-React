import React from 'react';
import Task from './Task';

const TodoList = ({ title, tasks, onDrop, onDragOver }) => {
  return (
    <div className="list" onDrop={(event) => onDrop(event, title)} onDragOver={onDragOver}>
      <div className="heading">
        <h1>{title}</h1>
      </div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TodoList;
