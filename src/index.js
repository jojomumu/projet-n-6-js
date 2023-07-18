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


const addButtons = document.querySelectorAll('#add1, #add2, #add3');

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

      
      const taskDetails = document.createElement('div');
      taskDetails.className = 'task-details';
      taskDetails.style.backgroundColor = 'white';
      taskDetails.style.padding = '10px';

      
      const nameSpan = document.createElement('span');
      nameSpan.className = 'taskname';
      nameSpan.textContent = taskName;

      const descriptionSpan = document.createElement('span');
      descriptionSpan.className = 'taskdescri';
      descriptionSpan.textContent = taskDescription;

      const dateSpan = document.createElement('span');
      dateSpan.className = 'taskdate';
      dateSpan.textContent = taskDate;

      
      taskDetails.appendChild(nameSpan);
      taskDetails.appendChild(descriptionSpan);
      taskDetails.appendChild(dateSpan);

      
      taskItem.appendChild(taskDetails);

      
      todoList.appendChild(taskItem);

      
      form.reset();

      
      form.remove();
    });
  });
});
