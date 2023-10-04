// Elements
const taskSection = document.querySelector(".task-section");
const filterSection = document.querySelector(".filter-section-hidden");
const input = document.querySelector(".input");

input.addEventListener("keydown", (event) => {
  if (!input.value == "") {
    if (event.keyCode === 13) {
      // Create div container
      const task = document.createElement("div");
      task.classList.add("task");

      // create unchecked img
      const unchecked_img = document.createElement("img");
      unchecked_img.classList.add("unchecked-img");
      unchecked_img.src = "images/unchecked-btn.png";

      // create task field
      const task_field = document.createElement("input");
      task_field.classList.add("task-field");
      task_field.type = "text";
      task_field.placeholder = input.value;
      task_field.setAttribute("readonly", "readonly");

      // create remove btn element
      const remove_btn = document.createElement("img");
      remove_btn.classList.add("remove-img");
      remove_btn.src = "images/remove-btn.png";

      // Append those elements to the div container
      task.appendChild(unchecked_img);
      task.appendChild(task_field);
      task.appendChild(remove_btn);

      // append div container to task section
      taskSection.appendChild(task);

      // Showing filter section
      filterSection.classList.remove("filter-section-hidden");
      filterSection.classList.add("filter-section");

      input.value = "";
    }
  }
});
