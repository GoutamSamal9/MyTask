// define ui vars
const form = document.querySelector("#task-form");
const clearBtn = document.querySelector(".clear-tasks");
const taskList = document.querySelector(".collection");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListeners();
// load all event listeners
function loadEventListeners() {
  // Dom load event listener
  document.addEventListener("DOMContentLoaded", getTasks);
  // add task event
  form.addEventListener("submit", addTask);
  //   remove task
  taskList.addEventListener("click", removeTask);
  //   clear task
  clearBtn.addEventListener("click", clearTask);
  //   filter task
  filter.addEventListener("keyup", filterTask);
}
// Get Tasks
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    //   create li element
    const li = document.createElement("li");
    // add class
    li.className = "collection-item";
    // create node and appent to li
    li.appendChild(document.createTextNode(task));

    // create link
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //   appnd to link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
  });
}

// Add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add some value");
  }
  //   create li element
  const li = document.createElement("li");
  // add class
  li.className = "collection-item";
  // create node and appent to li
  li.appendChild(document.createTextNode(taskInput.value));

  // create link
  const link = document.createElement("a");
  // add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //   appnd to link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);

  //   store in ls
  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = "";

  e.preventDefault();
}

// local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      //   remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  e.preventDefault();
}

// removefrom ls
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear Task
function clearTask() {
  //   taskList.innerHTML = "";
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //   clar task form ls
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// filter Task
function filterTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// // Define UI Vars
// const form = document.querySelector("#task-form");
// const taskList = document.querySelector(".collection");
// const clearBtn = document.querySelector(".clear-tasks");
// const filter = document.querySelector("#filter");
// const taskInput = document.querySelector("#task");

// // Load all event listeners
// loadEventListeners();

// // Load all event listeners
// function loadEventListeners() {
//   // Add task event
//   form.addEventListener("submit", addTask);
// }

// // Add Task
// function addTask(e) {
//   if (taskInput.value === "") {
//     alert("Add a task");
//   }

//   // Create li element
//   const li = document.createElement("li");
//   // Add class
//   li.className = "collection-item";
//   // Create text node and append to li
//   li.appendChild(document.createTextNode(taskInput.value));
//   // Create new link element
//   const link = document.createElement("a");
//   // Add class
//   link.className = "delete-item secondary-content";
//   // Add icon html
//   link.innerHTML = '<i class="fa fa-remove"></i>';
//   // Append the link to li
//   li.appendChild(link);

//   // Append li to ul
//   taskList.appendChild(li);

//   // Clear input
//   taskInput.value = "";

//   e.preventDefault();
// }
