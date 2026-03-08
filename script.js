const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const darkModeBtn = document.getElementById("darkModeBtn");

addBtn.onclick = addTask;

// DARK MODE
darkModeBtn.onclick = () => {
    document.body.classList.toggle("dark");
};

// ADD TASK
function addTask() {
    const text = document.getElementById("taskInput").value.trim();
    const date = document.getElementById("dateInput").value;
    const category = document.getElementById("categoryInput").value;

    if (text === "") {
        alert("Enter a task first!");
        return;
    }

    const li = document.createElement("li");
    li.draggable = true;

    // DRAGGABLE EVENTS
    li.addEventListener("dragstart", dragStart);
    li.addEventListener("dragover", dragOver);
    li.addEventListener("drop", drop);

    // CHECKBOX
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = () => {
        taskText.classList.toggle("completed");
    };

    // TASK TEXT (editable)
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = text;

    taskText.onclick = () => {
        const newText = prompt("Edit task:", taskText.textContent);
        if (newText !== null) taskText.textContent = newText;
    };

    // CATEGORY
    if (category) {
        const tag = document.createElement("span");
        tag.className = "category-tag";
        tag.textContent = category;
        li.appendChild(tag);
    }

    // DATE TAG
    if (date) {
        const dateTag = document.createElement("span");
        dateTag.className = "date-tag";
        dateTag.textContent = date;
        li.appendChild(dateTag);
    }

    // DELETE BUTTON
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => li.remove();

    // APPEND ELEMENTS
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    document.getElementById("taskInput").value = "";
}

// DRAG & DROP FUNCTIONS
let draggedItem = null;

function dragStart(event) {
    draggedItem = this;
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    if (this !== draggedItem) {
        taskList.insertBefore(draggedItem, this);
    }
}
