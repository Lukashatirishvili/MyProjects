// Elements
const addBtn = document.querySelector(".add-btn");
const input = document.querySelector(".input");
const btnContainer = document.querySelector(".btn-container");
const itemCounterEl = document.querySelector(".item-counter");
const listSection = document.querySelector(".list-section");
let itemCounter = 0;
let Arr = [];

// Function to Create new item
const createNewItem = function (event) {
  if (event.type === "click" || event.key === "Enter") {
    if (input.value !== "") {
      // Creating new element and setting classname and textcontent
      let newLi = document.createElement("li");
      newLi.setAttribute("class", "list active");
      newLi.textContent = input.value;

      // Get the parent element and append new element to the DOM
      const parentEl = document.querySelector(".list-section");
      parentEl.appendChild(newLi);

      // Save list element in array
      Arr.push(newLi);

      // Clear input field and update itemCounter element
      input.value = "";
      itemCounter++;
      itemCounterEl.textContent = `${itemCounter} items left`;
    }
  }
};

// Mark item as completed
const completeList = function (event) {
  const clickedItem = event.target;
  if (clickedItem.classList.contains("list")) {
    // Remove active class and toggle 'completed' class
    clickedItem.classList.toggle("active");
    clickedItem.classList.toggle("completed");
    // Update itemCounter
    itemCounter = clickedItem.classList.contains("completed")
      ? (itemCounter = itemCounter - 1)
      : (itemCounter = itemCounter + 1);
    itemCounterEl.textContent = `${itemCounter} items left`;
  }
};

// All, Active and Completed buttons logic
const filterBtn = function (event) {
  const clickedItem = event.target; // store element which will happen click

  // Select elements separately which classlist contains 'completed' and 'active'
  const completedEl = Arr.filter((el) => el.classList.contains("completed"));
  const activeEl = Arr.filter((el) => el.classList.contains("active"));

  // If user click on completed button
  if (clickedItem.textContent === "Completed") {
    activeEl.forEach((el) => el.classList.add("hidden"));
    completedEl.forEach((el) => el.classList.remove("hidden"));
  }

  // If user click on active button
  else if (clickedItem.textContent === "Active") {
    activeEl.forEach((el) => el.classList.remove("hidden"));
    completedEl.forEach((el) => el.classList.add("hidden"));
  } else {
    activeEl.forEach((el) => el.classList.remove("hidden"));
    completedEl.forEach((el) => el.classList.remove("hidden"));
  }
};

// Event listeners
input.addEventListener("keydown", createNewItem);
addBtn.addEventListener("click", createNewItem);
listSection.addEventListener("click", completeList);
btnContainer.addEventListener("click", filterBtn);
