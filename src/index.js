const toggleDark = document.getElementById('buttdark');
const body = document.body;
const logo = document.getElementById('logo');

toggleDark.addEventListener('click', function() {
  body.classList.toggle('darkmode');

  const isDarkMode = body.classList.contains('darkmode');

  if (isDarkMode) {
    logo.src = 'media/logo.png';
    toggleDark.style.backgroundImage = 'url(media/sun.png)';
    document.getElementById('loupe').src = 'media/loupe2.png';
    document.getElementById('todo').style.backgroundColor = '#424242';
    document.getElementById('doing').style.backgroundColor = '#424242';
    document.getElementById('done').style.backgroundColor = '#424242';
    document.getElementById('add1').style.color = '#F5F5F5';
    document.getElementById('plus').src = 'media/plus2.png';
  } else {
    logo.src = 'media/logo2.png';
    toggleDark.style.backgroundImage = 'url(media/moon.png)';
    document.getElementById('loupe').src = 'media/loupe.png';
    document.getElementById('todo').style.backgroundColor = '#F5F5F5';
    document.getElementById('doing').style.backgroundColor = '#F5F5F5';
    document.getElementById('done').style.backgroundColor = '#F5F5F5';
    document.getElementById('add1').style.color = 'black';
    document.getElementById('plus').src = 'media/plus.png';
  }
});

const addButtons = document.querySelectorAll('#add1');

addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const form = document.createElement('form');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'name';
    nameInput.placeholder = 'Task name';

    const descriptionInput = document.createElement('textarea');
    descriptionInput.className = 'description'
    descriptionInput.placeholder = 'Task description';

    const dateInput = document.createElement('input');
    dateInput.className = 'date';
    dateInput.type = 'date';

    const submitButton = document.createElement('button');
    submitButton.className = 'button';
    submitButton.type = 'submit';
    submitButton.textContent = 'Add Task';

    form.appendChild(nameInput);
    form.appendChild(descriptionInput);
    form.appendChild(dateInput);
    form.appendChild(submitButton);

    const todoList = button.parentNode.querySelector('ul');
    todoList.appendChild(form);

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const taskName = nameInput.value;
      const taskDescription = descriptionInput.value;
      const taskDate = dateInput.value;

      const taskItem = document.createElement('li');
      taskItem.className = 'lili';
      taskItem.draggable = true;
      taskItem.addEventListener('dragstart', dragStart);
      taskItem.addEventListener('dragend', dragEnd);

      const taskDetails = document.createElement('div');
      taskDetails.className = 'task-details';
      taskDetails.style.backgroundColor = 'white';
      taskDetails.style.padding = '10px';

      const deleteButton = document.createElement('button');
      deleteButton.className = 'deletebutton';
      deleteButton.innerHTML = '<img src="media/cross.png" alt="Delete" width="20" height="20">';

      const taskContainer = document.createElement('div');
      taskContainer.className = 'taskcontainer';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'taskname';
      nameSpan.textContent = taskName;

      const doingList = document.getElementById('doing-list');
      const doneList = document.getElementById('done-list');

      deleteButton.addEventListener('click', deleteTask);

      taskContainer.appendChild(nameSpan);
      taskContainer.appendChild(deleteButton);

      taskDetails.appendChild(taskContainer);

      function deleteTask() {
        const taskItem = this.closest('.lili');
        taskItem.remove();
      }

      const descriptionSpan = document.createElement('span');
      descriptionSpan.className = 'taskdescri';
      descriptionSpan.textContent = taskDescription;

      const dateSpan = document.createElement('span');
      dateSpan.className = 'taskdate';
      dateSpan.textContent = taskDate;

      taskDetails.appendChild(descriptionSpan);
      taskDetails.appendChild(dateSpan);

      taskItem.appendChild(taskDetails);

      todoList.appendChild(taskItem);

      form.reset();
      form.remove();

    });
  });
});

const tasks = document.querySelectorAll('.lili');
tasks.forEach(task => {
  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragend', dragEnd);
});

let currentTask = null;
let currentTaskList = null;

function dragStart() {
  currentTask = this;
  currentTaskList = this.parentNode;

  this.classList.add('dragging');
  
  const nameSpan = this.querySelector('.taskname');
  const deleteButton = this.querySelector('.deletebutton');


  event.dataTransfer.setData('text/plain', '');
}

function dragEnd() {
  currentTask = null;
  currentTaskList = null;
  
  this.classList.remove('dragging');
  
}

const sections = document.querySelectorAll('#todo, #doing, #done');
sections.forEach(section => {
  section.addEventListener('dragover', dragOver);
  section.addEventListener('dragenter', dragEnter);
  section.addEventListener('dragleave', dragLeave);
  section.addEventListener('drop', drop);
});

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add('dragover');
}

function dragLeave() {
  this.classList.remove('dragover');
}

function drop() {
  this.classList.remove('dragover');
  const targetList = this.querySelector('ul');

  if (targetList === currentTaskList) {
    
    targetList.appendChild(currentTask);
  } else {
    
    currentTaskList.removeChild(currentTask);
  
    targetList.appendChild(currentTask);
  }
}

// Fonction pour ajouter une nouvelle tâche à la liste
function addTaskToList(taskText, listId) {
  const taskList = document.getElementById(listId);
  const li = document.createElement("li");
  li.textContent = taskText;
  taskList.appendChild(li);
}

// Fonction pour ajouter une tâche dans le local storage
function addTaskToLocalStorage(taskText, listId) {
  const tasks = JSON.parse(localStorage.getItem(listId)) || [];
  tasks.push(taskText);
  localStorage.setItem(listId, JSON.stringify(tasks));
}

// Fonction pour charger les tâches depuis le local storage
function loadTasksFromLocalStorage(listId) {
  const tasks = JSON.parse(localStorage.getItem(listId)) || [];
  tasks.forEach((taskText) => {
    addTaskToList(taskText, listId);
  });
}

// Fonction pour gérer l'ajout d'une nouvelle tâche
function handleAddTask(event) {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  addTaskToList(taskText, "todo-list");
  addTaskToLocalStorage(taskText, "todoTasks");

  input.value = "";
}

// Ajouter un écouteur d'événement pour le bouton "Ajouter"
const addTaskBtn = document.getElementById("add1");
addTaskBtn.addEventListener("click", handleAddTask);

// Charger les tâches depuis le local storage au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  loadTasksFromLocalStorage("todoTasks");
});

// Fonction pour sauvegarder les tâches dans le local storage
function saveTasksToLocalStorage() {
  const todoTasks = Array.from(document.querySelectorAll("#todo-list li")).map(li => li.textContent);
  localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
}

// Ajouter un événement pour mettre à jour le local storage lorsqu'une tâche est supprimée ou déplacée
sections.forEach(section => {
  section.addEventListener('dragend', () => {
    saveTasksToLocalStorage();
  });
});

// Appeler la fonction de sauvegarde quand la page est sur le point d'être rechargée
window.addEventListener("beforeunload", () => {
  saveTasksToLocalStorage();
});
