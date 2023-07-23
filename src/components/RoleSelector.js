import React from 'react';
 let role = "developer";

function RoleSelector({ onChange }) {

 
  function switchRole() {
    role = document.getElementById("role-selector").value;
  }


  let taskIdCounter = parseInt(localStorage.getItem("taskIdCounter")) || 1;
  function addNewTask() {
    const taskHeading = prompt("Enter the task heading:");
    if (taskHeading) {
      const taskDescription = prompt("Enter the task description:");
      if (taskDescription) {
        const taskId = "Task " + taskIdCounter++;

        const taskElement = document.createElement("div");
        taskElement.className = "list-item";
        taskElement.draggable = true;
        // taskElement.ondragstart = drag;
        taskElement.id = taskId;

        const taskHeadingElement = document.createElement("h4");
        taskHeadingElement.innerText = taskHeading;

        const viewButton = document.createElement("button");
        viewButton.className = "viewTaskbtn";
        viewButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
        viewButton.addEventListener("click", function () {
          openPopup(taskHeading, taskDescription);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "deleteTaskbtn";
        deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        deleteButton.addEventListener("click", deleteTask);

        taskElement.appendChild(taskHeadingElement);
        taskElement.appendChild(viewButton);
        taskElement.appendChild(deleteButton);

        const todoColumn = document.getElementById("todo");
        todoColumn.appendChild(taskElement);

        const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
        tasks[taskId] = {
          column: "todo",
          heading: taskHeading,
          description: taskDescription,
        };
        localStorage.setItem("tasks", JSON.stringify(tasks));

        localStorage.setItem("taskIdCounter", taskIdCounter.toString());
      }
    }
  }

  function deleteTask(event) {
    const taskElement = event.target.closest(".list-item");
    const taskId = taskElement.id;
  
    if (taskElement.parentNode.id === 'todo') {
      taskElement.remove();
  
      const tasks = JSON.parse(localStorage.getItem("tasks")) || {};
      delete tasks[taskId];
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
  }

  function openPopup(heading, description) {
    const popup = document.getElementById("popup");
    const popupHeading = document.getElementById("popup-heading");
    const popupDescription = document.getElementById("popup-description");
  
    popupHeading.innerText = heading;
    popupDescription.innerText = description;
    popup.style.display = "block";
  }

  function deleteAllTask() {
    localStorage.clear();
  }

  return (
    <div id="role-container">
      <label id="role-label" for="role-selector">Select Your role:</label>
      <select id="role-selector" onchange={switchRole}>
        <option value="developer">Developer</option>
        <option value="tester">Tester</option>
      </select>
      <button id="addNewTask" onclick={addNewTask}>Add Task in Todo</button>
      <button id="deleteAllTask" onclick={deleteAllTask}>Delete all Tasks</button>
    </div>
  );
}

export default RoleSelector;
