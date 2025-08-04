const BASE_URL = "http://127.0.0.1:8000/api";
const taskForm = document.getElementById("taskForm");
const showTaskList = document.getElementById("showList");
const submitBtn = document.getElementById("submitBtn");
// Fetch the tasks from the API
async function getTasks() {
    showTaskList.innerHTML = ""; // Clear existing tasks

    const response = await fetch(`${BASE_URL}/showTasksList/`);
    
    if (response.ok) {
        const data = await response.json(); // Parse JSON here

        data.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task';

            taskDiv.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <button onclick="deleteTask(${task.id})">Delete</button>
            `;
            showTaskList.appendChild(taskDiv);
        });
    } else {
        console.error("Failed to fetch tasks");
    }
}

// Send a POST request to add a new task
submitBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    const response = await fetch(`${BASE_URL}/createTask/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, completed: false })
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Task added successfully:", data);
        taskForm.reset();
        getTasks();
    } else {
        const error = await response.json();
        console.error("Failed to add task:", error);
    }
});

// Delete a task by ID
async function deleteTask(id) {
    const response = await fetch(`${BASE_URL}/deleteTask/${id}/`, {
        method: 'DELETE'
    });

    if (response.ok) {
        getTasks();
    } else {
        console.error("Failed to delete task");
    }
}

// Initial load
getTasks();
