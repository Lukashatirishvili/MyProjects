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

let i = 0;
let itemCounter = 0;
const createElement = function (event) {
  if (event.type === "click" || event.key === "Enter") {
    if (input.value == "") {
    } else {
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

/*
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
