// Elements
const addBtn = document.querySelector(".add-btn");
const input = document.querySelector(".input");
const btnContainer = document.querySelector(".btn-container");
const itemCouner = document.querySelector(".item-counter");
let i = 0;

const createElement = function (event) {
  if (event.type === "click" || event.key === "Enter") {
    // create element
    const li_el = document.createElement("li");

    // assing class name and textcontent
    li_el.classList.add("list");
    li_el.textContent = input.value;
    input.value = "";

    // append new element
    const ul_el = document.querySelector(".user-todolist");
    ul_el.appendChild(li_el);

    i++;
    itemCouner.textContent = `${i} item left`;
  }
};

input.addEventListener("keydown", createElement);
addBtn.addEventListener("click", createElement);
