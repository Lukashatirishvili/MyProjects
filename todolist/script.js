// **** Selecting elements **** //
const input = document.querySelector(".input");
const taskSection = document.querySelector(".task-section");
const filterSection = document.querySelector(".filter-section");
const itemCounter_el = document.querySelector(".items-left");

// **** Variables **** //
let itemCounter = 0;

// **** Functions **** //
function update_ItemCounter(order) {
  if (order === "increase") {
    itemCounter++;
    itemCounter_el.textContent = `${itemCounter} item left`;
  } else {
    itemCounter--;
    itemCounter_el.textContent = `${itemCounter} item left`;
  }
}

function createTask(e) {
  if (e.key === "Enter") {
    if (input.value) {
      // Create and append "task" element
      const task = document.createElement("div");
      task.classList.add("task");
      task.innerHTML = `<img src="images/unchecked-btn.png" class="check-img" />
      <input type="text" class="task-field" placeholder='${input.value}' readonly />
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
  if (targetElement.classList.contains("check-img")) {
    // If user checked task
    if (!targetElement.classList.contains("checked")) {
      targetElement.src = "images/checked-btn.png";
      targetElement.classList.add("checked");
      targetElement.parentElement.classList.add("completed");

      update_ItemCounter("decrease");
    }
    // If user unchecked task
    else if (targetElement.classList.contains("checked")) {
      targetElement.src = "images/unchecked-btn.png";
      targetElement.classList.remove("checked");
      targetElement.parentElement.classList.remove("completed");

      update_ItemCounter("increase");
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

// **** Event Listeners **** //
taskSection.addEventListener("mouseover", display_RemoveBtn);
taskSection.addEventListener("mouseout", display_RemoveBtn);
input.addEventListener("keydown", createTask);
taskSection.addEventListener("click", completeTask);
