
const toggleDark = document.getElementById('buttdark');
const body = document.body;
const logo = document.getElementById('logo');

toggleDark.addEventListener('click', function () {
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

// function createTaskElement(taskName, taskDescription, taskDate) {
//   const taskTemplate = document.getElementById('task-template');
//   const taskItem = taskTemplate.content.cloneNode(true);

//   taskItem.querySelector('.taskname').textContent = taskName;
//   taskItem.querySelector('.taskdescri').textContent = taskDescription;
//   taskItem.querySelector('.taskdate').textContent = taskDate;


//   return taskItem;
// }

const addButtons = document.querySelectorAll('#add1');

addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const form = document.createElement('form');
    const nameInput = document.createElement('input');

    nameInput.type = 'text';
    nameInput.className = 'name';
    nameInput.placeholder = 'Task name';

    const descriptionInput = document.createElement('textarea');

    descriptionInput.className = 'description';
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
      deleteButton.innerHTML = '<img src="media/bin.png" alt="Delete" width="25" height="25">';

      const moveButton = document.createElement('button');

      moveButton.className = 'movebutton';
      moveButton.innerHTML = '<img src="media/arrow.png" alt="move" width="30" height="30" id="arrow" class="movebutton">';

      const taskContainer = document.createElement('div');

      taskContainer.className = 'taskcontainer';

      const nameSpan = document.createElement('span');

      nameSpan.className = 'taskname';
      nameSpan.textContent = taskName;

      deleteButton.addEventListener('click', deleteTask);

      taskContainer.appendChild(nameSpan);
      taskContainer.appendChild(deleteButton);
      taskDetails.appendChild(taskContainer);

      const descriptionSpan = document.createElement('span');

      descriptionSpan.className = 'taskdescri';
      descriptionSpan.textContent = taskDescription;

      const dateSpan = document.createElement('span');

      dateSpan.className = 'taskdate';
      dateSpan.textContent = taskDate;

      taskDetails.appendChild(descriptionSpan);
      taskDetails.appendChild(moveButton);
      taskDetails.appendChild(dateSpan);

      taskItem.appendChild(taskDetails);
      todoList.appendChild(taskItem);

      form.reset();
      form.remove();

      
      const task = {
        name: taskName,
        description: taskDescription,
        date: taskDate,
        status: 'todo',
      };

      let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
      tasksArray.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasksArray));

      deleteButton.addEventListener('click', deleteTask);
    });
  });
});

document.addEventListener('click', function (e) {
  const moveButtons = document.querySelectorAll('.movebutton');
  moveButtons.forEach((moveButton) => {
    if (e.target === moveButton) {
      moveTask(moveButton);
    }
  });
});


function deleteTask() {
  const taskItem = this.closest('.lili');
  taskItem.remove();

  
  const taskName = taskItem.querySelector('.taskname').textContent;
  let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
  tasksArray = tasksArray.filter((task) => task.name !== taskName);
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

const tasks = document.querySelectorAll('.lili');
tasks.forEach((task) => {
  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragend', dragEnd);
});

function dragStart() {
  currentTask = this;
  currentTaskList = this.parentNode;
  this.classList.add('dragging');

  event.dataTransfer.setData('text/plain', '');
}

function dragEnd() {
  currentTask = null;
  currentTaskList = null;

  this.classList.remove('dragging');
}

const sections = document.querySelectorAll('#todo, #doing, #done');
sections.forEach((section) => {
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

function drop(e) {
  this.classList.remove('dragover');
  const targetList = this.querySelector('ul');

  
  if (targetList !== currentTaskList) {
    currentTaskList.removeChild(currentTask);
    targetList.appendChild(currentTask);

    
    const tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskName = currentTask.querySelector('.taskname').textContent;
    const taskIndex = tasksArray.findIndex((task) => task.name === taskName);
    if (taskIndex !== -1) {
      if (targetList.id === 'todo-list') {
        tasksArray[taskIndex].status = 'todo';
      } else if (targetList.id === 'doing-list') {
        tasksArray[taskIndex].status = 'doing';
      } else if (targetList.id === 'done-list') {
        tasksArray[taskIndex].status = 'done';
      }
      localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }
  } else {
    
    const taskRect = currentTask.getBoundingClientRect();
    const tasks = Array.from(targetList.querySelectorAll('.lili'));

    
    let insertIndex = tasks.findIndex((task) => {
      const rect = task.getBoundingClientRect();
      return e.clientY > rect.top && e.clientY < rect.bottom;
    });

    
    if (insertIndex === -1) {
      insertIndex = tasks.length;
    }

    targetList.removeChild(currentTask);
    if (insertIndex === tasks.length) {
      targetList.appendChild(currentTask);
    } else {
      targetList.insertBefore(currentTask, tasks[insertIndex]);
    }
  }
}




function loadTasksFromLocalStorage() {
  const tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];

  tasksArray.forEach((task) => {
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
    deleteButton.innerHTML = '<img src="media/bin.png" alt="Delete" width="25" height="25">';

    const moveButton = document.createElement('button');

    moveButton.className = 'movebutton';
    moveButton.innerHTML = '<img src="media/arrow.png" alt="move" width="30" height="30" id="arrow" class="movebutton">';

    const taskContainer = document.createElement('div');
    taskContainer.className = 'taskcontainer';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'taskname';
    nameSpan.textContent = task.name;

    deleteButton.addEventListener('click', deleteTask);

    taskContainer.appendChild(nameSpan);
    taskContainer.appendChild(deleteButton);
    taskContainer.appendChild(moveButton);
    taskDetails.appendChild(taskContainer);

    const descriptionSpan = document.createElement('span');
    descriptionSpan.className = 'taskdescri';
    descriptionSpan.textContent = task.description;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'taskdate';
    dateSpan.textContent = task.date;

    taskDetails.appendChild(descriptionSpan);
    taskDetails.appendChild(dateSpan);

    taskItem.appendChild(taskDetails);

    if (task.status === 'todo') {
      document.getElementById('todo-list').appendChild(taskItem);
    } else if (task.status === 'doing') {
      document.getElementById('doing-list').appendChild(taskItem);
    } else if (task.status === 'done') {
      document.getElementById('done-list').appendChild(taskItem);
    }
  });
}

function moveTask(moveButton) {
  const taskItem = moveButton.closest('.lili');
  const currentList = taskItem.parentNode.id;
  let targetListId;

  if (currentList === 'todo-list') {
    targetListId = 'doing-list';
  } else if (currentList === 'doing-list') {
    targetListId = 'done-list';
  } else {
    return; 
  }

  const targetList = document.getElementById(targetListId);
  targetList.appendChild(taskItem);

 
  const taskName = taskItem.querySelector('.taskname').textContent;
  let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskIndex = tasksArray.findIndex((task) => task.name === taskName);
  if (taskIndex !== -1) {
    tasksArray[taskIndex].status = targetListId.split('-')[0];
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
  }
}


document.getElementById('search').addEventListener('click', function () {
  const searchInput = document.getElementById('searchbar').value.trim().toLowerCase();
  const tasks = document.querySelectorAll('.lili');
  let anyTaskDisplayed = false;

  tasks.forEach((task) => {
    const taskName = task.querySelector('.taskname').textContent.toLowerCase();
    if (taskName.includes(searchInput)) {
      task.style.display = 'block';
      anyTaskDisplayed = true;
    } else {
      task.style.display = 'none';
    }
  });

  if (searchInput === '' || !anyTaskDisplayed) {
    tasks.forEach((task) => {
      task.style.display = 'block';
    });
  }

  const errorMessage = document.getElementById('error-message');
  errorMessage.style.display = anyTaskDisplayed ? 'none' : 'block';
});



window.addEventListener('load', loadTasksFromLocalStorage);