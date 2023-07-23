import './App.css';

function App() {
  return (
    <body>

  <div id="role-container">
    <label id="role-label" for="role-selector">Select Your role:</label>
    <select id="role-selector" onchange="switchRole()">
      <option value="developer">Developer</option>
      <option value="tester">Tester</option>
    </select>
    <button id="addNewTask" onclick="addNewTask()">Add Task in Todo</button>
    <button id="deleteAllTask" onclick="deleteAllTask()">Delete all Tasks</button>
  </div>

  <div id="popup" class="popup">
    <h2 id="popup-heading"></h2>
    <p id="popup-description"></p>
    <button onclick="closePopup()">Close</button>
  </div>

  <div class="main-container">
    <div class="list" id="todo" ondrop="drop(event, 'todo')" ondragover="allowDrop(event)">
      <div class="heading">
        <h1>Todo</h1>
      </div>
      {/* <div class="list-item" draggable="true" ondragstart="drag(event)" id="task1">
        Task 1
        <button class="deleteTaskbtn">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="list-item" draggable="true" ondragstart="drag(event)" id="task2">
        Task 2
        <button class="deleteTaskbtn">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div> */}

    </div>

    <div class="list" id="in-dev" ondrop="drop(event, 'in-dev')" ondragover="allowDrop(event)">
      <div class="heading">
        <h1>Under Development</h1>
      </div>
    </div>

    <div class="list" id="in-testing" ondrop="drop(event, 'in-testing')" ondragover="allowDrop(event)">
      <div class="heading">
        <h1>Under Testing</h1>
      </div>
    </div>

    <div class="list" id="completed" ondrop="drop(event, 'completed')" ondragover="allowDrop(event)">
      <div class="heading">
        <h1>Completed</h1>
      </div>
    </div>

  </div>

  <script src="index2.js"></script>
</body>
  );
}

export default App;
