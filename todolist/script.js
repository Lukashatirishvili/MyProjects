// ******** Selecting Elements ********
const input = document.querySelector(".input");
const taskSection_el = document.querySelector(".task-section");
const arrowButton_el = document.querySelector(".arrow-btn");
const filterSection_el = document.querySelector(".filter-section");
const allBtn = document.querySelector(".all-button");
const activeBtn = document.querySelector(".active-button");
const completedBtn = document.querySelector(".completed-button");

// ******** Functions ********
function createTask(e) {
  if (e.keyCode === 13 && input.value) {
    const task_el = document.createElement("div");
    task_el.classList.add("task", "active");
    task_el.innerHTML = `<img src="images/unchecked-btn.png" class="check-btn unchecked" />
    <input type="text" class="task-field" readonly />
    <img src="images/remove-btn.png" class="remove-btn hidden" />`;

    taskSection_el.appendChild(task_el);

    const taskField_el = task_el.children[1];
    const checkBtn = task_el.children[0];
    taskField_el.value = input.value;

    input.value = "";

    displayItem();

    // when user click on check button
    checkBtn.addEventListener("click", () => {
      if (task_el.matches(".task.active")) {
        task_el.classList.replace("active", "completed");
        checkBtn.src = "images/checked-btn.png";
        checkBtn.classList.replace("unchecked", "checked");
        if (activeBtn.matches(".active")) {
          task_el.classList.add("hidden");
        }
      } else if (task_el.matches(".task.completed")) {
        task_el.classList.replace("completed", "active");
        checkBtn.src = "images/unchecked-btn.png";
        checkBtn.classList.replace("checked", "unchecked");
        if (completedBtn.matches(".active")) {
          task_el.classList.add("hidden");
        }
      }
      displayItem();
    });

    // remove btn
    const removeBtn = task_el.children[2];
    task_el.addEventListener("mouseover", () => {
      removeBtn.classList.remove("hidden");
    });
    task_el.addEventListener("mouseout", () => {
      removeBtn.classList.add("hidden");
    });
  }
}

function updateTask(e) {
  const target = e.target;
  const checkBtn = target.previousElementSibling;
  if (target.matches(".task-field")) {
    target.removeAttribute("readonly");
    checkBtn.classList.add("hidden");

    target.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        if (!target.value) {
          target.parentElement.remove();
          displayItem();
        }
        target.setAttribute("readonly", "readonly");
        checkBtn.classList.remove("hidden");
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.matches(".task-field")) {
        target.setAttribute("readonly", "readonly");
        checkBtn.classList.remove("hidden");
        if (!target.value) {
          target.parentElement.remove();
          displayItem();
        }
      }
    });
  }
}

function deleteTask(e) {
  const target = e.target;
  const taskCompleted_el = document.querySelectorAll(".task.completed");
  if (target.matches(".remove-btn")) {
    target.parentElement.remove();
  }

  if (target.matches(".clear-task")) {
    taskCompleted_el.forEach((task) => {
      task.remove();
    });
  }
  displayItem();
}

input.addEventListener("keydown", createTask);
taskSection_el.addEventListener("dblclick", updateTask);
document.addEventListener("click", deleteTask);
document.addEventListener("click", filterSection_logic);
arrowButton_el.addEventListener("click", arrowBtn_logic);

function displayItem() {
  const task_el = document.querySelectorAll(".task");
  const taskActive_el = document.querySelectorAll(".task.active");
  const taskCompleted_el = document.querySelectorAll(".task.completed");
  const itemCounter_el = document.querySelector(".items-left");
  const clearButton_el = document.querySelector(".clear-task");
  // display arrow button and filter section
  if (task_el.length > 0) {
    arrowButton_el.classList.remove("hidden");
    filterSection_el.classList.remove("hidden");
  } else {
    arrowButton_el.classList.add("hidden");
    filterSection_el.classList.add("hidden");
  }
  // display item counter
  itemCounter_el.textContent = `${taskActive_el.length} item left`;

  // display clear button
  if (taskCompleted_el.length > 0) {
    clearButton_el.classList.remove("hidden");
  }

  // display arrow button or hide
  if (taskActive_el.length == 0 && taskCompleted_el.length > 0) {
    arrowButton_el.classList.remove("unclicked");
    arrowButton_el.classList.add("clicked");
    arrowButton_el.src = "images/arrow-clicked.png";
  } else if (taskActive_el.length > 0) {
    arrowButton_el.classList.remove("clicked");
    arrowButton_el.classList.add("unclicked");
    arrowButton_el.src = "images/arrow.png";
  }
}

function arrowBtn_logic(e) {
  const target = e.target;
  const taskAll_el = document.querySelectorAll(".task");

  if (target.matches(".unclicked")) {
    taskAll_el.forEach((task) => {
      const checkBtn = task.children[0];
      task.classList.replace("active", "completed");
      checkBtn.classList.replace("unchecked", "checked");
      checkBtn.src = "images/checked-btn.png";
    });
    arrowButton_el.classList.replace("unclicked", "clicked");
  } else if (target.matches(".clicked")) {
    taskAll_el.forEach((task) => {
      const checkBtn = task.children[0];
      task.classList.replace("completed", "active");
      checkBtn.classList.replace("checked", "unchecked");
      checkBtn.src = "images/unchecked-btn.png";
    });
    arrowButton_el.classList.replace("clicked", "unclicked");
  }
  displayItem();
}

function filterSection_logic(e) {
  const target = e.target;
  const task_el = document.querySelectorAll(".task");
  if (target.matches(".active-button")) {
    task_el.forEach((task) => {
      allBtn.classList.remove("active");
      completedBtn.classList.remove("active");
      activeBtn.classList.add("active");
      if (task.matches(".completed")) {
        task.classList.add("hidden");
      } else {
        task.classList.remove("hidden");
      }
    });
  }
  if (target.matches(".completed-button")) {
    task_el.forEach((task) => {
      allBtn.classList.remove("active");
      activeBtn.classList.remove("active");
      completedBtn.classList.add("active");
      if (task.matches(".active")) {
        task.classList.add("hidden");
      } else {
        task.classList.remove("hidden");
      }
    });
  }
  if (target.matches(".all-button")) {
    task_el.forEach((task) => {
      activeBtn.classList.remove("active");
      completedBtn.classList.remove("active");
      allBtn.classList.add("active");
      task.classList.remove("hidden");
    });
  }
}
