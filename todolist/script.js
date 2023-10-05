// Elements
const taskSection = document.querySelector(".task-section");
const filterSection = document.querySelector(".filter-section-hidden");
const input = document.querySelector(".input");
const filter_buttons = document.querySelector(".filter-buttons");
const all_button = document.querySelector(".all-button");
const active_button = document.querySelectorAll(".active-button");
const completed_button = document.querySelector(".completed-button");

// variables which will be declared in function
let unchecked_img;
let task;
let task_field;
let remove_btn;

// create task
function createTask(event) {
  if (!input.value == "") {
    if (event.keyCode === 13) {
      // Create div container
      task = document.createElement("div");
      task.classList.add("task", "active");

      // create unchecked img
      unchecked_img = document.createElement("img");
      unchecked_img.classList.add("unchecked-img");
      unchecked_img.src = "images/unchecked-btn.png";

      // create task field
      task_field = document.createElement("input");
      task_field.classList.add("task-field");
      task_field.type = "text";
      task_field.placeholder = input.value;
      task_field.setAttribute("readonly", "readonly");

      // create remove btn element
      remove_btn = document.createElement("img");
      remove_btn.classList.add("remove-img");
      remove_btn.src = "images/remove-btn.png";

      // Append those elements to the div container
      task.appendChild(unchecked_img);
      task.appendChild(task_field);
      task.appendChild(remove_btn);

      // append div container to task section
      taskSection.appendChild(task);

      // Showing filter section
      filterSection.classList.remove("filter-section-hidden");
      filterSection.classList.add("filter-section");

      input.value = "";

      all_button.classList.add("btn-active");
    }
  }
}

function completeTask(event) {
  let target = event.target;
  let check_img = document.querySelectorAll(".unchecked-img");
  let task = document.querySelectorAll(".task");
  if (target.classList.contains("unchecked-img")) {
    target.parentElement.classList.remove("active");
    target.parentElement.classList.add("completed");
    target.classList.remove("unchecked-img");
    target.classList.add("checked-img");
    target.src = "images/checked-btn.png";
  } else if (target.classList.contains("checked-img")) {
    target.parentElement.classList.remove("completed");
    target.parentElement.classList.add("active");
    target.classList.remove("checked-img");
    target.classList.add("unchecked-img");
    target.src = "images/unchecked-btn.png";
  }
}
function click_filterButtons(event) {
  let target = event.target;
  let tasks = document.querySelectorAll(".task");

  // If uesr click on active button
  if (target.classList.contains("active-button")) {
    tasks.forEach((task) => {
      task.classList.remove("hidden");
      if (task.classList.contains("completed")) {
        task.classList.add("hidden");
      }
    });
  }

  // If user click on completed button
  else if (target.classList.contains("completed-button")) {
    tasks.forEach((task) => {
      task.classList.remove("hidden");
      if (task.classList.contains("active")) {
        task.classList.add("hidden");
      }
    });
  }

  // If user click on all button
  else {
    tasks.forEach((task) => task.classList.remove("hidden"));
  }
}

input.addEventListener("keydown", createTask);
filter_buttons.addEventListener("click", click_filterButtons);
taskSection.addEventListener("click", completeTask);
