// ******** Selecting elements ******** //
const input = document.querySelector(".input");
const taskSection = document.querySelector(".task-section");
const filterSection = document.querySelector(".filter-section");
const filterButton = document.querySelector(".filter-buttons");
const arrowBtn = document.querySelector(".arrow-img");
const allBtn = document.querySelector(".all-button");
const activeBtn = document.querySelector(".active-button");
const completedBtn = document.querySelector(".completed-button");

// ******** Functions ******** //
function createTask(e) {
  if (e.key === "Enter" && input.value) {
    // Create and append "task" element
    const task = document.createElement("div");
    task.classList.add("task", "active");
    task.innerHTML = `<img src="images/unchecked-btn.png" class="check-img unchecked" />
    <input readonly type="text" class="task-field" placeholder='${input.value}' />
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

function itemCouner() {
  const itemsLeft = document.querySelectorAll(".task.active").length;
  document.querySelector(".items-left").textContent = `${itemsLeft} items left`;
}

// ******** Event Listeners ******** //
input.addEventListener("keydown", createTask);
taskSection.addEventListener("click", function (e) {
  completeTask(e);
});
arrowBtn.addEventListener("click", function (e) {
  arrowBtn_logic(e.target);
});
filterButton.addEventListener("click", filterBtnLogic);

/*
// ******** Selecting elements ******** //
const input = document.querySelector(".input");
const taskSection = document.querySelector(".task-section");
const filterSection = document.querySelector(".filter-section");
const itemCounter_el = document.querySelector(".items-left");
const clearTask_el = document.querySelector(".clear-task");
const all_btn = document.querySelector(".all-button");
const active_btn = document.querySelector(".active-button");
const completed_btn = document.querySelector(".completed-button");
const arrowBtn = document.querySelector(".arrow-img");

// ******** Variables ******** //
let itemCounter = 0;

// ******** Functions ******** //
function createTask(e) {
  if (e.key === "Enter") {
    if (input.value) {
      // display arrow btn
      arrowBtn.classList.remove("hidden");
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

function completeTask(e) {
  const targetElement = e.target;
  const task_elements = document.querySelectorAll(".task");
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

      task_elements.forEach((task) => {
        if (!task.classList.contains("active")) {
          arrowBtn.src = "images/arrow-bold.png";
        }
      });
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

      document.querySelectorAll(".task").forEach((task) => {
        if (task.classList.contains("completed")) {
          arrowBtn.src = "images/arrow.png";
          arrowBtn.classList.add("marked");
        }
      });
    }
    // display clear button - if at least one task is checked
    if (document.querySelectorAll(".checked").length > 0) {
      display_clearBtn("display");
    } else {
      display_clearBtn("hidden");
    }

    if (document.querySelectorAll(".checked").length !== task_elements.length) {
      arrowBtn.classList.remove("marked");
    }

    task_elements.forEach((task) => {
      if (!task.classList.contains("active")) {
        arrowBtn.src = "images/arrow-bold.png";
        arrowBtn.classList.add("marked");
      } else {
        arrowBtn.src = "images/arrow.png";
        arrowBtn.classList.remove("marked");
      }
    });
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
  } else if (order === "decrease") {
    itemCounter--;
    itemCounter_el.textContent = `${itemCounter} item left`;
  } else if (order === "arrowbtn") {
    itemCounter = 0;
    itemCounter_el.textContent = `${itemCounter} item left`;
  } else if (order === "arrowBoldbtn") {
    itemCounter = document.querySelectorAll(".task.active").length;
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

function arrowBtn_logic(e) {
  const target = e.target;
  const task_elements = document.querySelectorAll(".task");
  // change arrow img

  if (target.classList.contains("marked")) {
    arrowBtn.src = "images/arrow.png";
    arrowBtn.classList.remove("marked");

    task_elements.forEach((task) => {
      //
      task.classList.remove("completed");
      task.classList.add("active");

      // change all check button as checked
      const checkButtons = document.querySelectorAll(".check-img");
      checkButtons.forEach((check) => {
        check.src = "images/unchecked-btn.png";
        check.classList.remove("checked");
      });
      update_ItemCounter("arrowBoldbtn");

      //

      // display clear button - if at least one task is checked
      if (document.querySelectorAll(".checked").length > 0) {
        display_clearBtn("display");
      } else {
        display_clearBtn("hidden");
      }
    });
  } else {
    arrowBtn.src = "images/arrow-bold.png";
    arrowBtn.classList.add("marked");

    task_elements.forEach((task) => {
      //
      task.classList.remove("active");
      task.classList.add("completed");

      // change all check button as checked
      const checkButtons = document.querySelectorAll(".check-img");
      checkButtons.forEach((check) => {
        check.src = "images/checked-btn.png";
        check.classList.add("checked");
      });

      update_ItemCounter("arrowbtn");

      // display clear button - if at least one task is checked
      if (document.querySelectorAll(".checked").length > 0) {
        display_clearBtn("display");
      } else {
        display_clearBtn("hidden");
      }
    });
  }
}

// ******** Event Listeners ******** //
taskSection.addEventListener("mouseover", display_RemoveBtn);
taskSection.addEventListener("mouseout", display_RemoveBtn);
input.addEventListener("keydown", createTask);
taskSection.addEventListener("click", completeTask);
filterSection.addEventListener("click", filterBtn);
arrowBtn.addEventListener("click", arrowBtn_logic);
// taskSection.addEventListener("dblclick", editTask);
*/
