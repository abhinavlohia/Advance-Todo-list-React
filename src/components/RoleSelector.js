import React from "react";

const RoleSelector = ({ switchRole, addNewTask, deleteAllTask }) => {
  return (
    <div id="role-container">
      <label id="role-label" htmlFor="role-selector">
        Select Your role:
      </label>
      <select id="role-selector" onChange={switchRole}>
        <option value="developer">Developer</option>
        <option value="tester">Tester</option>
      </select>
      <button id="addNewTask" onClick={addNewTask}>
        Add Task in Todo
      </button>
      <button id="deleteAllTask" onClick={deleteAllTask}>
        Delete all Tasks
      </button>
    </div>
  );
};

export default RoleSelector;
