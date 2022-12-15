import Task from '../task';
import Render from '../render';
import Storage from '../storage';
import TaskEvents from './taskevents';

export default class FormEvents {
  // FORM EVENT HANDLERS CODE BLOCKS BELOW. //

  static formEvents() {
    FormEvents.forAddTaskButton();
    FormEvents.forTaskFormButtons();
  }

  static forAddTaskButton() {
    const addTaskButton = document.querySelector('#add-task');
    addTaskButton.addEventListener('click', FormEvents.openTaskForm);
  }

  static openTaskForm() {
    const overlay = document.querySelector('#overlay');
    const formContainer = document.querySelector('#form-container');

    overlay.classList.add('active');
    formContainer.classList.add('active');
  }

  static forTaskFormButtons() {
    // const createTaskButton = document.querySelector('#create-task');
    const cancelTaskButton = document.querySelector('#cancel-task');
    const form = document.querySelector('#form');

    cancelTaskButton.addEventListener('click', FormEvents.cancelTaskForm);
    form.addEventListener('submit', FormEvents.createTask);
  }

  static cancelTaskForm() {
    const overlay = document.querySelector('#overlay');
    const formContainer = document.querySelector('#form-container');

    overlay.classList.remove('active');
    formContainer.classList.remove('active');
  }

  static createTask(event) {
    event.preventDefault();
    const overlay = document.querySelector('#overlay');
    const formContainer = document.querySelector('#form-container');
    const projectName = document.querySelector('#project-name-header').textContent;
    const taskName = document.querySelector('#task-title').value;
    const taskDate = document.querySelector('#task-date').value;

    if (taskName === '') {
      console.log('task name cannot be empty!');
      return;
    }

    if (Storage.getProjectsList().getProject(projectName).contains(taskName)) {
      console.log(`task name ${taskName} already exist in this project!`);
      return;
    }

    Storage.addTask(projectName, new Task(taskName, taskDate));
    Render.aTaskCard(taskName, taskDate);
    TaskEvents.initTaskButtons();

    overlay.classList.remove('active');
    formContainer.classList.remove('active');
    document.querySelector('#form').reset();
    console.log(`Task created in project ${projectName}!`);
  }
}
