document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addTaskBtn').addEventListener('click', addTask);

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    createTaskElement(taskText, false);
    saveTaskToLocalStorage(taskText, false);
    taskInput.value = '';
}

// Create a task element
function createTaskElement(taskText, completed) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.textContent = taskText;
    if (completed) {
        li.classList.add('completed');
    }

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');

    // Complete/Undo Button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = completed ? 'Undo' : 'Complete';
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        completeBtn.textContent = li.classList.contains('completed') ? 'Undo' : 'Complete';
        updateTaskInLocalStorage(taskText, li.classList.contains('completed'));
    });

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        removeTaskFromLocalStorage(taskText);
    });

    // Show Details Button
    const detailsBtn = document.createElement('button');
    detailsBtn.textContent = 'Details';
    detailsBtn.addEventListener('click', () => {
        showTaskDetails(taskText);
    });

    taskActions.appendChild(completeBtn);
    taskActions.appendChild(deleteBtn);
    taskActions.appendChild(detailsBtn);
    li.appendChild(taskActions);
    taskList.appendChild(li);
}

// Save task to local storage
function saveTaskToLocalStorage(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in local storage
function updateTaskInLocalStorage(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.text === taskText);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

// Show task details in a modal
function showTaskDetails(taskText) {
    const modal = document.getElementById('taskModal');
    const modalTaskText = document.getElementById('modalTaskText');
    modalTaskText.textContent = taskText;
    modal.style.display = 'block';
}

// Close the modal
document.querySelector('.close').addEventListener('click', () => {
    const modal = document.getElementById('taskModal');
    modal.style.display = 'none';
});

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    const modal = document.getElementById('taskModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});