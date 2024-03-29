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
      .forEach((task) => Render.aTaskCard(
        task.name,
        task.id,
        task.status,
        task.priority,
        task.dueDate,
      ));

    TaskEvents.initTaskButtons();
  }

  // TODO: Add task card listeners like radio button, selection, etc.
  static initTaskButtons() {
    const taskCheckboxInputs = document.querySelectorAll('.task-status');
    const taskEditButtons = document.querySelectorAll('.button-edit-task');
    const taskDeleteButtons = document.querySelectorAll('.button-delete-task');

    taskCheckboxInputs.forEach((taskCheckboxInput) => {
      taskCheckboxInput.addEventListener('click', TaskEvents.updateTaskStatus);
    });

    taskEditButtons.forEach((taskEditButton) => {
      taskEditButton.addEventListener('click', TaskEvents.editTaskHandler);
    });

    taskDeleteButtons.forEach((taskDeleteButton) => {
      taskDeleteButton.addEventListener('click', TaskEvents.deleteTask);
    });
  }

  // TODO: add update completion task function
  static updateTaskStatus(event) {
    const projectName = document.querySelector('#project-name-header').textContent;
    const taskCard = event.target.parentElement.parentElement;
    // const taskName = taskCard.children[0].children[1].textContent;
    const taskID = taskCard.children[2].textContent;
    const taskStatus = event.target.checked;

    Storage.updateTaskStatus(projectName, taskID, taskStatus);
    // console.log(event.target.checked);
  }

  static deleteTask(event) {
    const projectName = document.querySelector('#project-name-header').textContent;
    const taskCard = event.target.parentElement.parentElement;
    const taskName = taskCard.children[0].children[1].textContent;
    const taskID = taskCard.children[2].textContent;

    Storage.deleteTask(projectName, taskID);
    taskCard.remove();

    console.log(`delete task ${taskName} in project ${projectName}!`);
  }

  static editTaskHandler(event) {
    const editForm = document.querySelector('#form-edit-task');
    const projectName = document.querySelector('#project-name-header').textContent;
    const taskCard = event.target.parentElement.parentElement;
    const taskName = taskCard.children[0].children[1].textContent;
    const taskPriority = taskCard.children[0].children[2].textContent;
    const taskDate = taskCard.children[1].children[0].textContent;
    const taskID = taskCard.children[2].textContent;
    const currentTaskName = document.querySelector('#current-task-name');
    const taskIDContainer = document.querySelector('#unique-id');
    const taskNameInput = document.querySelector('#edit-task-title');
    const taskDateInput = document.querySelector('#edit-task-date');
    const overlay = document.querySelector('#overlay');
    const editTaskForm = document.querySelector('#form-edit-task-container');

    const taskPriorityInput = document.querySelector('#edit-task-priority');
    const taskDescriptionInput = document.querySelector('#edit-task-description');
    const taskDescription = Storage
      .getProjectsList()
      .getProject(projectName)
      .getTask(taskID)
      .getDescription();

    editForm.reset();

    currentTaskName.textContent = taskName;
    currentTaskName.style.display = 'none';

    taskIDContainer.textContent = taskID;
    taskIDContainer.style.display = 'none';

    taskNameInput.placeholder = taskName;
    taskDateInput.value = taskDate;
    taskPriorityInput.value = taskPriority;
    taskDescriptionInput.value = taskDescription;

    overlay.classList.add('active');
    editTaskForm.classList.add('active');

    console.log(`Editing task ${taskName} (id #${taskID}) in project ${projectName}!`);
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

  static submitTaskEdit(event) {
    event.preventDefault();
    const taskCards = document.querySelectorAll('.task');
    const overlay = document.querySelector('#overlay');
    const formEditTask = document.querySelector('#form-edit-task');
    const editTaskForm = document.querySelector('#form-edit-task-container');
    const currentTaskName = document.querySelector('#current-task-name').textContent;
    const taskID = document.querySelector('#unique-id').textContent;
    const projectName = document.querySelector('#project-name-header').textContent;
    const newDueDate = document.querySelector('#edit-task-date').value;
    const newTaskPriority = document.querySelector('#edit-task-priority').value;
    const newTaskDescription = document.querySelector('#edit-task-description').value;
    const currentDate = Storage
      .getProjectsList()
      .getProject(projectName)
      .getTask(taskID)
      .getDate();

    let newTaskName = document.querySelector('#edit-task-title').value.trim();

    if (newTaskName === '') {
      newTaskName = currentTaskName;
    }

    if (Storage.getProjectsList().getProject(projectName).contains(newTaskName)
    && newTaskName !== currentTaskName) {
      console.log('This task name already exist!');
      return;
    }

    console.log(`Current task name: ${currentTaskName} (id #${taskID})`);
    console.log(`Current due date of task: ${currentDate}`);

    taskCards.forEach((taskCard) => {
      const idContainer = taskCard.children[2];
      if (idContainer.textContent !== taskID) return;
      Render.changeTaskName(taskCard, newTaskName);
      Render.changeTaskPriority(taskCard, newTaskPriority);
      Render.changeDueDate(taskCard, newDueDate);
    });

    Storage.editTask(
      projectName,
      taskID,
      currentTaskName,
      newTaskName,
      newTaskPriority,
      newTaskDescription,
      newDueDate,
    );

    overlay.classList.remove('active');
    editTaskForm.classList.remove('active');
    formEditTask.reset();
    console.log(`Submit edited task ${currentTaskName} in project ${projectName}!`);
    console.log(`Task name changed from ${currentTaskName} to ${newTaskName}!`);
  }
}
