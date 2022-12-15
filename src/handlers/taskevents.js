import Render from '../render';
import Storage from '../storage';

export default class TaskEvents {
  // TASK EVENT HANDLERS CODE BLOCKS BELOW. //

  static loadTasks() {
    const taskList = document.querySelector('#task-list');
    taskList.innerHTML = '';
    const projectName = document.querySelector('#project-name-header').textContent;
    Storage.getProjectsList()
      .getProject(projectName)
      .getTasks()
      .forEach((task) => Render.aTaskCard(task.name, task.dueDate));

    TaskEvents.initTaskButtons();
  }

  // TODO: Figure out eventlistner functions for task buttons.
  static initTaskButtons() {
    const taskEditButtons = document.querySelectorAll('.button-edit-task');
    const taskDeleteButtons = document.querySelectorAll('.button-delete-task');

    taskEditButtons.forEach((taskEditButton) => {
      taskEditButton.addEventListener('click', TaskEvents.editTaskHandler);
    });

    taskDeleteButtons.forEach((taskDeleteButton) => {
      taskDeleteButton.addEventListener('click', TaskEvents.deleteTask);
    });
  }

  static deleteTask(event) {
    const projectName = document.querySelector('#project-name-header').textContent;
    const taskCard = event.target.parentElement.parentElement;
    const taskName = taskCard.children[0].children[1].textContent;

    Storage.deleteTask(projectName, taskName);
    taskCard.remove();

    console.log(`delete task ${taskName} in project ${projectName}!`);
  }

  static editTaskHandler(event) {
    const projectName = document.querySelector('#project-name-header').textContent;
    const taskCard = event.target.parentElement.parentElement;
    const taskName = taskCard.children[0].children[1].textContent;
    const taskDate = taskCard.children[1].children[0].textContent;
    const currentTaskName = document.querySelector('#current-task-name');
    const taskNameInput = document.querySelector('#edit-task-title');
    const taskDateInput = document.querySelector('#edit-task-date');
    const overlay = document.querySelector('#overlay');
    const editTaskForm = document.querySelector('#form-edit-task-container');

    currentTaskName.textContent = taskName;
    currentTaskName.style.display = 'none';

    taskNameInput.placeholder = taskName;
    taskDateInput.value = taskDate;

    overlay.classList.add('active');
    editTaskForm.classList.add('active');

    console.log(`Editing task ${taskName} in project ${projectName}!`);
    TaskEvents.initEditTaskButtons();
  }

  static initEditTaskButtons() {
    const editTaskButton = document.querySelector('#create-edit-task');
    const cancelEditTaskButton = document.querySelector('#cancel-edit-task');

    cancelEditTaskButton.addEventListener('click', TaskEvents.cancelTaskEdit);
    editTaskButton.addEventListener('click', TaskEvents.submitTaskEdit);
  }

  static cancelTaskEdit() {
    const overlay = document.querySelector('#overlay');
    const editTaskForm = document.querySelector('#form-edit-task-container');
    const currentTaskName = document.querySelector('#current-task-name').textContent;
    const projectName = document.querySelector('#project-name-header').textContent;

    overlay.classList.remove('active');
    editTaskForm.classList.remove('active');
    console.log(`Cancelled editing task ${currentTaskName} in project ${projectName}!`);
  }

  // TODO: Create a functioning edit task submission with logic.
  static submitTaskEdit(event) {
    event.preventDefault();
    const overlay = document.querySelector('#overlay');
    const editTaskForm = document.querySelector('#form-edit-task-container');
    const currentTaskName = document.querySelector('#current-task-name').textContent;
    const projectName = document.querySelector('#project-name-header').textContent;
    const newTaskName = document.querySelector('#edit-task-title').value;
    const newDueDate = document.querySelector('#edit-task-date').value;
    const currentDate = Storage
      .getProjectsList()
      .getProject(projectName)
      .getTask(currentTaskName)
      .getDate();

    console.log(`Current task name: ${currentTaskName}`);
    console.log(`Current due date of task: ${currentDate}`);

    if (newTaskName === '') {
      console.log('New task name cannot be empty!');
      return;
    }

    if ((Storage.getProjectsList().getProject(projectName).contains(newTaskName))
        && (currentDate === newDueDate)
    ) {
      console.log('No changes have been made!');
      return;
    }

    // Testing purposes: check if task name changes.
    const taskCards = document.querySelectorAll('.task');
    taskCards.forEach((taskCard) => {
      const taskName = taskCard.children[0].children[1];
      if (currentTaskName !== taskName.textContent) return;
      taskName.textContent = '';
      taskName.textContent = String(newTaskName);
    });

    Storage.renameTask(projectName, currentTaskName, newTaskName);

    overlay.classList.remove('active');
    editTaskForm.classList.remove('active');
    console.log(`Submit edited task ${currentTaskName} in project ${projectName}!`);
    console.log(`Task name changed from ${currentTaskName} to ${newTaskName}!`);
  }
}
