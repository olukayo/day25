// Select elements from the DOM
const inputField = document.querySelector('.input input');
const addButton = document.querySelector('.input button');
const container = document.querySelector('.container');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to create a new task
function addTask(taskText = inputField.value.trim(), isCompleted = false) {
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  // Create task elements
  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';

  const taskContent = document.createElement('p');
  taskContent.textContent = taskText;

  if (isCompleted) {
    taskContent.classList.add('completed');
  }

  const completeButton = document.createElement('button');
  completeButton.textContent = isCompleted ? 'Undo' : 'Complete';
  completeButton.className = 'complete';

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete';

  // Append elements to the task div
  taskDiv.appendChild(taskContent);
  taskDiv.appendChild(completeButton);
  taskDiv.appendChild(deleteButton);

  // Append task to container
  container.appendChild(taskDiv);

  // Clear the input field if this was a new task
  if (!isCompleted) inputField.value = '';

  // Add event listener to complete button
  completeButton.addEventListener('click', () => {
    taskContent.classList.toggle('completed');
    completeButton.textContent = taskContent.classList.contains('completed')
      ? 'Undo'
      : 'Complete';
    saveTasks();
  });

  // Add event listener to delete button
  deleteButton.addEventListener('click', () => {
    taskDiv.remove();
    saveTasks();
  });

  // Save the updated task list to localStorage
  saveTasks();
}

// Allow adding tasks by pressing Enter
inputField.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => addTask(task.text, task.isCompleted));
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task').forEach((task) => {
    const text = task.querySelector('p').textContent;
    const isCompleted = task.querySelector('p').classList.contains('completed');
    tasks.push({ text, isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add event listener to the "Add task" button
addButton.addEventListener('click', () => {
  addTask();
});

// Filter tasks (optional functionality)
const filterContainer = document.createElement('div');
filterContainer.className = 'filter-container';
const allButton = document.createElement('button');
allButton.textContent = 'All';
const activeButton = document.createElement('button');
activeButton.textContent = 'Active';
const completedButton = document.createElement('button');
completedButton.textContent = 'Completed';

filterContainer.appendChild(allButton);
filterContainer.appendChild(activeButton);
filterContainer.appendChild(completedButton);
container.insertBefore(filterContainer, container.firstChild);

allButton.addEventListener('click', () => filterTasks('all'));
activeButton.addEventListener('click', () => filterTasks('active'));
completedButton.addEventListener('click', () => filterTasks('completed'));

function filterTasks(filter) {
  document.querySelectorAll('.task').forEach((task) => {
    const isCompleted = task.querySelector('p').classList.contains('completed');
    switch (filter) {
      case 'all':
        task.style.display = 'flex';
        break;
      case 'active':
        task.style.display = isCompleted ? 'none' : 'flex';
        break;
      case 'completed':
        task.style.display = isCompleted ? 'flex' : 'none';
        break;
      default:
        task.style.display = 'flex';
    }
  });
}
