// ******** Selecting elements ******** //
const input = document.querySelector(".input");
const taskSection = document.querySelector(".task-section");
const filterSection = document.querySelector(".filter-section");
const filterButton = document.querySelector(".filter-buttons");
const arrowBtn = document.querySelector(".arrow-img");
const allBtn = document.querySelector(".all-button");
const activeBtn = document.querySelector(".active-button");
const completedBtn = document.querySelector(".completed-button");
const clearButton_El = document.querySelector(".clear-task");

function defaultApp() {
  const taskEl = document.querySelectorAll(".task");
  if (taskEl.length == 0) {
    filterSection.classList.add("hidden");
    arrowBtn.classList.add("hidden");
    activeBtn.classList.remove("active");
    completedBtn.classList.remove("active");
    allBtn.classList.add("active");
  }
}
// ******** Functions ******** //
function clearBtn_logic() {
  const allCompletedBtn = document.querySelectorAll(".task.completed");
  allCompletedBtn.forEach((task) => {
    task.remove();
  });
  displayClearBtn();

  defaultApp();
}

function removeBtn_logic(e) {
  const target = e.target;
  if (target.matches(".remove-img")) {
    target.parentElement.remove();
    itemCouner();
  }
  defaultApp();
}

function displayRemoveBtn(e) {
  const targetElement = e.target;
  if (
    e.type === "mouseover" &&
    (targetElement.classList.contains("task") || targetElement.closest(".task"))
  ) {
    const removeBtn = targetElement.closest(".task").children[2];
    removeBtn.classList.remove("hidden");
  } else if (
    e.type === "mouseout" &&
    (targetElement.classList.contains("task") || targetElement.closest(".task"))
  ) {
    const removeBtn = targetElement.closest(".task").children[2];
    removeBtn.classList.add("hidden");
  }
}

function createTask(e) {
  if (e.key === "Enter" && input.value) {
    // Create and append "task" element
    const task = document.createElement("div");
    task.classList.add("task", "active");
    task.innerHTML = `<img src="images/unchecked-btn.png" class="check-img unchecked" />
    <input type="text" class="task-field" placeholder='${input.value}' readonly />
    <img src="images/remove-btn.png" class="remove-img hidden" />`;
    taskSection.appendChild(task);

    // Clear input field, display arrow button and display filter section
    input.value = "";
    arrowBtn.classList.remove("hidden");
    filterSection.classList.remove("hidden");

    // Display item
    itemCouner();

    // Display arrow btn
    displayArrowBtn();
  }
}

function filterBtnLogic(e) {
  const target = e.target;

  const allCompletedTask = document.querySelectorAll(".task.completed");
  const allActiveTask = document.querySelectorAll(".task.active");
  if (target.matches(".active-button")) {
    allBtn.classList.remove("active");
    completedBtn.classList.remove("active");
    activeBtn.classList.add("active");
    allActiveTask.forEach((task) => {
      task.classList.remove("hidden");
    });
    allCompletedTask.forEach((task) => {
      task.classList.add("hidden");
    });
  } else if (target.matches(".completed-button")) {
    activeBtn.classList.remove("active");
    allBtn.classList.remove("active");
    completedBtn.classList.add("active");
    allActiveTask.forEach((task) => {
      task.classList.add("hidden");
    });
    allCompletedTask.forEach((task) => {
      task.classList.remove("hidden");
    });
  } else if (target.matches(".all-button")) {
    activeBtn.classList.remove("active");
    completedBtn.classList.remove("active");
    allBtn.classList.add("active");
    allActiveTask.forEach((task) => {
      task.classList.remove("hidden");
    });
    allCompletedTask.forEach((task) => {
      task.classList.remove("hidden");
    });
  }
}

function completeTask(e) {
  const target = e.target; // element which will be clicked
  const taskEl = document.querySelectorAll(".task");
  checkBtn(target);
  // display arrow btn
  displayArrowBtn();
  displayClearBtn();
  itemCouner();
}

function checkBtn(target) {
  const taskEl = document.querySelectorAll(".task");
  if (target.matches(".unchecked")) {
    // modify check button
    target.classList.remove("unchecked");
    target.classList.add("checked");
    target.src = "images/checked-btn.png";
    // modify task element
    target.parentElement.classList.remove("active");
    target.parentElement.classList.add("completed");
    if (activeBtn.matches(".active")) {
      target.parentElement.classList.add("hidden");
    }
    // display clearbtn
  } else if (target.matches(".checked")) {
    // modify check button
    target.classList.remove("checked");
    target.classList.add("unchecked");
    target.src = "images/unchecked-btn.png";
    // modify task element
    target.parentElement.classList.remove("completed");
    target.parentElement.classList.add("active");
    if (completedBtn.matches(".active")) {
      target.parentElement.classList.add("hidden");
    }
  }
  // update item counter
  itemCouner();
}

function arrowBtn_logic(target) {
  const taskEl = document.querySelectorAll(".task");
  if (target.matches(".unclicked")) {
    arrowBtn.src = "images/arrow-clicked.png";
    arrowBtn.classList.remove("unclicked");
    arrowBtn.classList.add("clicked");
    taskEl.forEach((task) => {
      task.classList.remove("active");
      task.classList.add("completed");
      task.children[0].classList.remove("unchecked");
      task.children[0].classList.add("checked");
      task.children[0].src = "images/checked-btn.png";
      if (activeBtn.matches(".active")) {
        task.classList.add("hidden");
      }
      itemCouner();
      displayClearBtn();
    });
  } else if (target.matches(".clicked")) {
    arrowBtn.src = "images/arrow.png";
    arrowBtn.classList.remove("clicked");
    arrowBtn.classList.add("unclicked");
    taskEl.forEach((task) => {
      task.classList.remove("completed");
      task.classList.add("active");
      task.children[0].classList.remove("checked");
      task.children[0].classList.add("unchecked");
      task.children[0].src = "images/unchecked-btn.png";
      if (completedBtn.matches(".active")) {
        task.classList.add("hidden");
      }
      itemCouner();
      displayClearBtn();
    });
  }
}

function displayClearBtn() {
  const clearBtn = document.querySelector(".clear-task");
  const taskActive_El = document.querySelectorAll(".task.active");
  const taskCompleted_El = document.querySelectorAll(".task.completed");
  if (taskCompleted_El.length > 0) {
    clearBtn.classList.remove("hidden");
  } else if (taskCompleted_El.length == 0) {
    clearBtn.classList.add("hidden");
  }
}

function displayArrowBtn() {
  const taskEl = document.querySelectorAll(".task");

  const allHaveCompletedClass = [...taskEl].every((element) =>
    element.classList.contains("completed")
  );

  if (allHaveCompletedClass) {
    arrowBtn.src = "images/arrow-clicked.png";
    arrowBtn.classList.remove("unclicked");
    arrowBtn.classList.add("clicked");
  } else {
    arrowBtn.src = "images/arrow.png";
    arrowBtn.classList.remove("clicked");
    arrowBtn.classList.add("unclicked");
  }
}

function editTask(e) {
  const target = e.target;
  const taskEl = target.parentElement;
  const checkBtn = taskEl.children[0];
  const removeBtn = taskEl.children[2];
  if (target.matches(".task-field")) {
    target.removeAttribute("readonly");
    target.placeholder = "";
    target.classList.add("edit");
    removeBtn.classList.remove("hidden");
    removeBtn.classList.add("hiddenAll");
    checkBtn.classList.add("hidden");
  }

  document.addEventListener("click", function (event) {
    if (!event.target.matches(".task-field")) {
      target.placeholder = target.value;
      target.classList.remove("edit");
      removeBtn.classList.remove("hiddenAll");
      removeBtn.classList.add("hidden");
      checkBtn.classList.remove("hidden");
    }
  });
}

function confirmEditTask(e) {
  const target = e.target;
  const taskEl = target.parentElement;
  const checkBtn = taskEl.children[0];
  const removeBtn = taskEl.children[2];
  if (e.key === "Enter" && target.matches(".task-field")) {
    target.setAttribute("readonly", "readonly");
    target.placeholder = target.value;
    target.classList.remove("edit");
    removeBtn.classList.add("hidden");
    removeBtn.classList.remove("hiddenAll");
    checkBtn.classList.remove("hidden");
  }
}

function itemCouner() {
  const itemsLeft = document.querySelectorAll(".task.active").length;
  document.querySelector(".items-left").textContent = `${itemsLeft} items left`;
}

// ******** Event Listeners ******** //
input.addEventListener("keydown", createTask);
taskSection.addEventListener("click", completeTask);
taskSection.addEventListener("click", removeBtn_logic);
taskSection.addEventListener("dblclick", editTask);
taskSection.addEventListener("keydown", confirmEditTask);
taskSection.addEventListener("mouseover", displayRemoveBtn);
taskSection.addEventListener("mouseout", displayRemoveBtn);
arrowBtn.addEventListener("click", function (e) {
  arrowBtn_logic(e.target);
});
filterButton.addEventListener("click", filterBtnLogic);
clearButton_El.addEventListener("click", clearBtn_logic);
