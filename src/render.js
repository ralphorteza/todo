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
    // Dom.initProjectButtons();
  }

  static aTaskCard(name, dueDate) {
    // projectPreview used for testing purposes.
    const taskList = document.querySelector('#task-list');
    // const tasksList = document.querySelector('#tasks-list');

    const taskContainer = document.createElement('div');
    const leftPanel = document.createElement('div');
    const rightPanel = document.createElement('div');

    const checkBox = document.createElement('input');
    const nameContainer = document.createElement('p');
    const dateContainer = document.createElement('p');

    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    taskContainer.classList.add('task');
    leftPanel.classList.add('left-panel');
    rightPanel.classList.add('right-panel');
    nameContainer.classList.add('task-name');
    dateContainer.classList.add('date');
    editBtn.classList.add('button-edit-task');
    deleteBtn.classList.add('button-delete-task');

    checkBox.setAttribute('type', 'checkbox');

    nameContainer.textContent = name;
    dateContainer.textContent = dueDate;
    editBtn.textContent = 'edit';
    deleteBtn.textContent = 'delete';

    leftPanel.append(checkBox);
    leftPanel.append(nameContainer);
    rightPanel.append(dateContainer);
    rightPanel.append(editBtn);
    rightPanel.append(deleteBtn);

    taskContainer.append(leftPanel);
    taskContainer.append(rightPanel);

    taskList.append(taskContainer);
  }
}
