export default class Render {
  static aProjectCard(name) {
    const userProjects = document.querySelector('#custom-projects-list');
    const projectCard = document.createElement('div');
    const leftPanel = document.createElement('div');
    const rightPanel = document.createElement('div');
    const buttonProject = document.createElement('button');
    const buttonEditProject = document.createElement('button');
    const buttonDeleteProject = document.createElement('button');

    projectCard.classList.add('card-project');
    leftPanel.classList.add('left-panel');
    rightPanel.classList.add('right-panel');
    projectCard.setAttribute('id', name);
    buttonProject.setAttribute('class', 'button-project');
    buttonEditProject.setAttribute('class', 'button-edit-project');
    buttonDeleteProject.setAttribute('class', 'button-delete-project');

    buttonProject.textContent = name;
    buttonEditProject.textContent = 'edit';
    buttonDeleteProject.textContent = 'del';

    leftPanel.append(buttonProject);
    rightPanel.append(buttonEditProject);
    rightPanel.append(buttonDeleteProject);

    projectCard.append(leftPanel);
    projectCard.append(rightPanel);

    userProjects.append(projectCard);
  }

  static aTaskCard(name, id, status, priority, dueDate) {
    const taskList = document.querySelector('#task-list');

    const taskContainer = document.createElement('div');
    const idContainer = document.createElement('p');
    const leftPanel = document.createElement('div');
    const rightPanel = document.createElement('div');

    const checkBox = document.createElement('input');
    const nameContainer = document.createElement('p');
    const priorityContainer = document.createElement('p');

    const dateContainer = document.createElement('p');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    taskContainer.classList.add('task');
    leftPanel.classList.add('left-panel');
    rightPanel.classList.add('right-panel');

    checkBox.classList.add('task-status');
    nameContainer.classList.add('task-name');
    priorityContainer.classList.add('task-priority');

    dateContainer.classList.add('date');
    editBtn.classList.add('button-edit-task');
    deleteBtn.classList.add('button-delete-task');

    checkBox.setAttribute('type', 'checkbox');
    // console.log(status);
    if (status === true) {
      checkBox.setAttribute('checked', 'true');
    }

    idContainer.textContent = id;
    idContainer.style.display = 'none';

    nameContainer.textContent = name;
    priorityContainer.textContent = priority;

    dateContainer.textContent = dueDate;
    editBtn.textContent = 'edit';
    deleteBtn.textContent = 'delete';

    leftPanel.append(checkBox);
    leftPanel.append(nameContainer);
    leftPanel.append(priorityContainer);

    rightPanel.append(dateContainer);
    rightPanel.append(editBtn);
    rightPanel.append(deleteBtn);

    taskContainer.append(leftPanel);
    taskContainer.append(rightPanel);
    taskContainer.append(idContainer);

    taskList.append(taskContainer);
  }

  static changeTaskName(taskCard, newTaskName) {
    const currentTaskName = taskCard.children[0].children[1];
    currentTaskName.textContent = '';
    currentTaskName.textContent = newTaskName;
  }

  static changeDueDate(taskCard, newDueDate) {
    const currentTaskDate = taskCard.children[1].children[0];
    currentTaskDate.textContent = '';
    currentTaskDate.textContent = newDueDate;
  }

  static changeTaskPriority(taskCard, newTaskPriority) {
    const currentTaskPriority = taskCard.children[0].children[2];
    currentTaskPriority.textContent = '';
    currentTaskPriority.textContent = newTaskPriority;
  }
}
