// ******** Selecting elements ******** //
const input = document.querySelector(".input");
const taskSection = document.querySelector(".task-section");
const filterSection = document.querySelector(".filter-section");
const itemCounter_el = document.querySelector(".items-left");
const clearTask_el = document.querySelector(".clear-task");
const all_btn = document.querySelector(".all-button");
const active_btn = document.querySelector(".active-button");
const completed_btn = document.querySelector(".completed-button");

// ******** Variables ******** //
let itemCounter = 0;

// ******** Functions ******** //
function createTask(e) {
  if (e.key === "Enter") {
    if (input.value) {
      // Create and append "task" element
      const task = document.createElement("div");
      task.classList.add("task", "active");
      task.innerHTML = `<img src="images/unchecked-btn.png" class="check-img" />
      <input readonly type="text" class="task-field" placeholder='${input.value}' />
      <img src="images/remove-btn.png" class="remove-img hidden" />`;
      taskSection.appendChild(task);

      // Clear input
      input.value = "";

      // Display filter section after task added
      filterSection.classList.remove("hidden");

      update_ItemCounter("increase");
    }
  }
}

function filterBtn(e) {
  //
  const target = e.target;

  // select elements
  const task_elements = document.querySelectorAll(".task");

  // remove active class on "all_btn"
  all_btn.classList.remove("active");

  // If user click on active button
  if (target.classList.contains("active-button")) {
    task_elements.forEach((task) => {
      // add active class on 'active-btn'
      active_btn.classList.add("active");
      completed_btn.classList.remove("active");

      if (task.classList.contains("completed")) {
        task.classList.add("hidden");
      } else {
        task.classList.remove("hidden");
      }
    });
  }

  // If user click on completed button
  if (target.classList.contains("completed-button")) {
    task_elements.forEach((task) => {
      // add active class on 'completed-btn'
      completed_btn.classList.add("active");
      active_btn.classList.remove("active");

      if (task.classList.contains("active")) {
        task.classList.add("hidden");
      } else {
        task.classList.remove("hidden");
      }
    });
  }

  // If user click on all button
  if (target.classList.contains("all-button")) {
    task_elements.forEach((task) => {
      // add active class on 'allbtn'
      all_btn.classList.add("active");
      active_btn.classList.remove("active");
      completed_btn.classList.remove("active");
      // remove hidden class on all task elements
      task.classList.remove("hidden");
    });
  }
}

function completeTask(e) {
  const targetElement = e.target;
  if (targetElement.classList.contains("check-img")) {
    // select task element
    const task = targetElement.parentElement;

    // If user checked task
    if (!targetElement.classList.contains("checked")) {
      targetElement.src = "images/checked-btn.png";
      targetElement.classList.add("checked");
      targetElement.parentElement.classList.remove("active");
      targetElement.parentElement.classList.add("completed");

      update_ItemCounter("decrease");
      if (active_btn.classList.contains("active")) {
        task.classList.add("hidden");
      }
    }
    // If user unchecked task
    else if (targetElement.classList.contains("checked")) {
      targetElement.src = "images/unchecked-btn.png";
      targetElement.classList.remove("checked");
      targetElement.parentElement.classList.remove("completed");
      targetElement.parentElement.classList.add("active");

      update_ItemCounter("increase");
      if (completed_btn.classList.contains("active")) {
        task.classList.add("hidden");
      }
    }
    // display clear button - if at least one task is checked
    if (document.querySelectorAll(".checked").length > 0) {
      display_clearBtn("display");
    } else {
      display_clearBtn("hidden");
    }
  }
}

function display_RemoveBtn(e) {
  const targetElement = e.target;
  if (
    e.type === "mouseover" &&
    (targetElement.classList.contains("task") || targetElement.closest(".task"))
  ) {
    const removeBtn = targetElement
      .closest(".task")
      .querySelector(":nth-child(3)");
    removeBtn.classList.remove("hidden");
  } else if (
    e.type === "mouseout" &&
    (targetElement.classList.contains("task") || targetElement.closest(".task"))
  ) {
    const removeBtn = targetElement
      .closest(".task")
      .querySelector(":nth-child(3)");
    removeBtn.classList.add("hidden");
  }
}

function update_ItemCounter(order) {
  if (order === "increase") {
    itemCounter++;
    itemCounter_el.textContent = `${itemCounter} item left`;
  } else {
    itemCounter--;
    itemCounter_el.textContent = `${itemCounter} item left`;
  }
}

function display_clearBtn(order) {
  if (order === "display") {
    clearTask_el.classList.remove("hidden");
  } else {
    clearTask_el.classList.add("hidden");
  }
}

// ******** Event Listeners ******** //
taskSection.addEventListener("mouseover", display_RemoveBtn);
taskSection.addEventListener("mouseout", display_RemoveBtn);
input.addEventListener("keydown", createTask);
taskSection.addEventListener("click", completeTask);
filterSection.addEventListener("click", filterBtn);
// taskSection.addEventListener("dblclick", editTask);
