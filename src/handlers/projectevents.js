import Project from '../project';
import Render from '../render';
import Storage from '../storage';
import TaskEvents from './taskevents';

export default class ProjectEvents {
  static createProject() {
    ProjectEvents.addProjectButtons();
  }

  /* PROJECT CREATION CODE BLOCKS
   * The code blocks below handles the creation of new projects. It consists
   * of event handler buttons 'Add' and 'Cancel' to make a project. When a
   * new project is added, a project button group is added below and project
   * data is stored in the localStorage.
  */
  static addProjectButtons() {
    const buttonAddProject = document.querySelector('#button-add-project');
    const buttonCancelProject = document.querySelector('#button-cancel-project');

    buttonAddProject.addEventListener('click', ProjectEvents.addProject);
    buttonCancelProject.addEventListener('click', ProjectEvents.cancelProject);
  }

  static addProject() {
    const projectName = document.querySelector('#input-add-project').value;

    if (projectName === '') {
      console.log('Project name cannot be empty!');
      return;
    }
    if (Storage.getProjectsList().contains(projectName)) {
      console.log(`${projectName} already exist!`);
      return;
    }

    document.querySelector('#input-add-project').value = '';

    Storage.addProject(new Project(projectName));
    Render.aProjectCard(projectName);
    ProjectEvents.initProjectButtons();
    console.log(`Project ${projectName} is created!`);
  }

  static cancelProject() {
    const inputAddProject = document.querySelector('#input-add-project');
    inputAddProject.value = '';
    console.log('project cancelled');
  }

  static initProjectButtons() {
    const buttonProjects = document.querySelectorAll('.button-project');
    const buttonDeleteProjects = document.querySelectorAll('.button-delete-project');
    const buttonEditProjects = document.querySelectorAll('.button-edit-project');

    buttonProjects.forEach((buttonProject) => {
      buttonProject.addEventListener('click', ProjectEvents.selectedProjectInSidebar);
    });

    buttonEditProjects.forEach((buttonEditProject) => {
      buttonEditProject.addEventListener('click', ProjectEvents.openForm);
    });

    buttonDeleteProjects.forEach((buttonDeleteProject) => {
      buttonDeleteProject.addEventListener('click', ProjectEvents.deleteProject);
    });
  }

  // TODO: When pressed, opens project in main container.
  static selectedProjectInSidebar(event) {
    const projectName = event.target.textContent;
    console.log(`project button ${projectName} clicked!`);

    ProjectEvents.openProject(projectName, this);
  }

  static openProject(projectName, projectButton) {
    const projectNameHeader = document.querySelector('#project-name-header');
    const defaultProjectButtons = document.querySelectorAll('.button-default-project');
    const customProjectButtons = document.querySelectorAll('.button-project');

    projectNameHeader.textContent = projectName;
    const allProjectButtons = [...defaultProjectButtons, ...customProjectButtons];
    allProjectButtons.forEach((button) => button.classList.remove('active'));
    projectButton.classList.add('active');

    TaskEvents.loadTasks();
  }

  // Deletes project from storage and in UI, then loads Inbox content.
  static deleteProject(event) {
    const projectCard = event.target.parentElement.parentElement;
    const projectName = projectCard.children[0].children[0].textContent;

    console.log(`${projectName} deleted!`);
    Storage.deleteProject(projectName);
    projectCard.remove();
    ProjectEvents.openProject('Inbox', document.querySelector('#button-inbox-projects'));
  }

  static openInboxProject() {
    const buttonInboxProjects = document.querySelector('#button-inbox-projects');
    buttonInboxProjects.addEventListener('click', ProjectEvents.selectedProjectInSidebar);
  }

  /* FORM PROJECT CODE BLOCKS
   * The code blocks below contain the logic for editing existing projects
   * that may need to be renamed.
  */
  static openForm(event) {
    event.preventDefault();
    document.querySelector('#form-project').reset();

    const overlay = document.querySelector('#overlay');
    const formContainer = document.querySelector('#form-project-container');
    const currentProjectName = document.querySelector('#current-project-title');
    const projectCard = event.target.parentElement.parentElement;
    const projectName = projectCard.children[0].children[0].textContent;

    currentProjectName.textContent = projectName;
    currentProjectName.style.display = 'none';
    document.querySelector('#project-title').placeholder = projectName;

    overlay.classList.add('active');
    formContainer.classList.add('active');

    console.log(`Opened edit form for project ${projectName}!`);
    ProjectEvents.initFormProjectButtons();
  }

  static initFormProjectButtons() {
    const buttonCancelProjectEdit = document.querySelector('#button-cancel-project-edit');
    const buttonSubmitProjectEdit = document.querySelector('#button-rename-project');

    buttonSubmitProjectEdit.addEventListener('click', ProjectEvents.submitForm);
    buttonCancelProjectEdit.addEventListener('click', ProjectEvents.cancelForm);
  }

  static submitForm(event) {
    event.preventDefault();

    const overlay = document.querySelector('#overlay');
    const formContainer = document.querySelector('#form-project-container');
    const currentProjectName = document.querySelector('#current-project-title').textContent;
    const newProjectName = document.querySelector('#project-title').value;
    const projectCards = document.querySelectorAll('.card-project');

    if (newProjectName === '') {
      document.querySelector('#project-title').value = '';
      console.log('New project name cannot be empty!');
      return;
    }

    if (Storage.getProjectsList().contains(newProjectName)) {
      document.querySelector('#project-title').value = '';
      console.log('The new project name cannot be identical to an existing project!');
      return;
    }

    projectCards.forEach((projectCard) => {
      if (projectCard.getAttribute('id') !== currentProjectName) return;
      const projectButtonText = projectCard.children[0].children[0];
      projectCard.setAttribute('id', newProjectName);
      projectButtonText.textContent = newProjectName;
    });

    Storage.renameProject(currentProjectName, newProjectName);

    overlay.classList.remove('active');
    formContainer.classList.remove('active');
  }

  static cancelForm() {
    const currentProjectName = document.querySelector('#current-project-title').textContent;
    const overlay = document.querySelector('#overlay');
    const formContainer = document.querySelector('#form-project-container');

    overlay.classList.remove('active');
    formContainer.classList.remove('active');

    console.log(`Project ${currentProjectName} form cancelled!`);
  }
}
