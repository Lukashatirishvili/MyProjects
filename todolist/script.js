// Elements
const addBtn = document.querySelector(".add-btn");
const input = document.querySelector(".input");
const btnContainer = document.querySelector(".btn-container");
const listEl = document.querySelectorAll(".list");
const allBtn = document.querySelector(".all-btn");
const activeBtn = document.querySelector(".active-btn");
const completeBtn = document.querySelector(".completed-btn");
const itemCounterEl = document.querySelector(".item-counter");
const liElements = document.querySelectorAll("li");
const listSection = document.querySelector(".list-section");
let itemCounter = 0;

// Function to Create new item
const createNewItem = function (event) {
  if (event.type === "click" || event.key === "Enter") {
    if (input.value !== "") {
      // Creating new element and setting classname and textcontent
      const newLi = document.createElement("li");
      newLi.setAttribute("class", "list");
      newLi.textContent = input.value;

      // Get the parent element and append new element to the DOM
      const parentEl = document.querySelector(".list-section");
      parentEl.appendChild(newLi);

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
    // Remove or add 'completed' class
    clickedItem.classList.toggle("completed");
    // Update itemCounter
    itemCounter = clickedItem.classList.contains("completed")
      ? (itemCounter = itemCounter - 1)
      : (itemCounter = itemCounter + 1);
    itemCounterEl.textContent = `${itemCounter} items left`;
  }
};

// All, Active and Completed buttons logic
const filterBtn = function (event) {};

// Event listeners
input.addEventListener("keydown", createNewItem);
addBtn.addEventListener("click", createNewItem);
listSection.addEventListener("click", completeList);

/*
let i = 0;
let itemCounter = 0;
const createElement = function (event) {
  if (event.type === "click" || event.key === "Enter") {
    if (input.value !== "") {
      if (liElements[i].classList.contains("hidden")) {
        liElements[i].classList.remove("hidden");
        liElements[i].classList.add("active");
        liElements[i].textContent = input.value;
        liElements[i].style.display = "block";
        input.value = "";
        itemCounter++;
        itemCounterEl.textContent = `${itemCounter} items left`;
      }
      i++;
    }
  }
};

input.addEventListener("keydown", createElement);
addBtn.addEventListener("click", createElement);

// click list element for complete task
for (let i = 0; i < listEl.length; i++) {
  listEl[i].addEventListener("click", function () {
    listEl[i].classList.remove("active");
    listEl[i].classList.add("completed");
    itemCounter--;
    itemCounterEl.textContent = `${itemCounter} items left`;

    //
    // itemCouner.textContent = `${j} items left`;
  });
}

// All button
allBtn.addEventListener("click", function () {
  liElements.forEach((li) => {
    if (li.classList.contains("hidden")) {
      li.style.display = "none";
    } else {
      li.style.display = "block";
    }
  });
});

// active button
activeBtn.addEventListener("click", function () {
  liElements.forEach((li) => {
    if (li.classList.contains("active")) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  });
});


// completed button
completeBtn.addEventListener("click", function () {
  liElements.forEach((li) => {
    if (li.classList.contains("completed")) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  });
});


let j = 0;

// add to do list
const createElement = function (event) {
  if (event.type === "click" || event.key === "Enter") {
    // create element
    // const li_el = document.createElement("li");
    listEl[j].classList.remove("hidden");
    listEl[j].classList.add("active");
    // assing class name and textcontent
    // li_el.classList.add("list");
    listEl[j].textContent = input.value;

    input.value = "";

    // append new element
    // const ul_el = document.querySelector(".user-todolist");
    // ul_el.appendChild(li_el);

    j++;
    // itemCouner.textContent = `${j} item left`;
  }
};
*/
