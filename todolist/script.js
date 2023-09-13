// Elements
const addBtn = document.querySelector(".add-btn");
const input = document.querySelector(".input");
console.log(addBtn);

const createList = function () {
  // create element
  const li = document.createElement("li");
  li.classList.add(`list-${i}`);

  // Where we want to create "li" Element
  const ul_Element = document.querySelector(".user-todolist");
  ul_Element.appendChild(li);

  document.querySelector(`.list-${i}`).textContent = "12";

  console.log(i);
};

addBtn.addEventListener("click", createList);
