// Get references to DOM elements
var taskInput = document.getElementById("task-input");
var addBtn = document.getElementById("add-btn");
var searchInput = document.getElementById("search-input");
var taskList = document.getElementById("task-list");

// Key to store tasks array in localStorage
var TASKS_KEY = "todos";

// This array will hold all todo objects: { id, text, completed }
var tasks = [];

// ---------------- Helper: Save and Load from localStorage ----------------

// Save current tasks array to localStorage as JSON string
function saveTasks() {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

// Load tasks array from localStorage (if present)
function loadTasks() {
  var stored = localStorage.getItem(TASKS_KEY);
  if (stored) {
    tasks = JSON.parse(stored);
  } else {
    tasks = [];
  }
}

// ---------------- Render function ----------------

// Render tasks on the page based on current array and search text
function renderTasks() {
  // Clear current list
  taskList.innerHTML = "";

  // Get current search text (lowercased for case-insensitive match)
  var searchText = searchInput.value.toLowerCase();

  // Loop through tasks and create list items
  tasks.forEach(function (task) {
    // Filter: show only tasks that include the search text
    if (!task.text.toLowerCase().includes(searchText)) {
      return; // skip this task if it doesn't match search
    }

    // Create list item for this task
    var li = document.createElement("li");

    // Add completed class if task is done
    if (task.completed) {
      li.classList.add("completed");
    }

    // Span to show task text
    var span = document.createElement("span");
    span.textContent = task.text;

    // Button to toggle completion
    var toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed ? "Undo" : "Done";

    // Button to remove task
    var removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    // When toggle button is clicked, change completion status
    toggleBtn.addEventListener("click", function () {
      task.completed = !task.completed; // flip boolean
      saveTasks(); // save updated array
      renderTasks(); // re-render list
    });

    // When remove button is clicked, delete this task from array
    removeBtn.addEventListener("click", function () {
      // Filter out this task by id
      tasks = tasks.filter(function (t) {
        return t.id !== task.id;
      });
      saveTasks();
      renderTasks();
    });

    // Append elements into li
    li.appendChild(span);
    li.appendChild(toggleBtn);
    li.appendChild(removeBtn);

    // Append li into the main task list
    taskList.appendChild(li);
  });
}

// ---------------- Add new task ----------------

addBtn.addEventListener("click", function () {
  var text = taskInput.value.trim();

  // Validation: do not add empty task
  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  // Create a unique ID (using timestamp)
  var newTask = {
    id: Date.now(), // unique ID
    text: text,
    completed: false, // default status
  };

  // Add to array and persist
  tasks.push(newTask);
  saveTasks();

  // Clear input and re-render
  taskInput.value = "";
  renderTasks();
});

// Optional: add task on Enter key in the input
taskInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addBtn.click();
  }
});

// ---------------- Real-time search ----------------

searchInput.addEventListener("input", function () {
  // Just re-render; renderTasks will filter based on searchInput value
  renderTasks();
});

// ---------------- On page load ----------------

// Load tasks from localStorage and render them
loadTasks();
renderTasks();
