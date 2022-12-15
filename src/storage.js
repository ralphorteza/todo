import Project from './project';
import Task from './task';
import ProjectsList from './projectslist';

export default class Storage {
  static saveProjectsList(data) {
    localStorage.setItem('projectsList', JSON.stringify(data));
  }

  static getProjectsList() {
    const projectsList = Object.assign(new ProjectsList(), JSON.parse(localStorage.getItem('projectsList')));

    projectsList.setProjects(
      projectsList
        .getProjects()
        .map((project) => Object.assign(new Project(), project)),
    );

    projectsList
      .getProjects()
      .forEach((project) => project.setTasks(
        project.getTasks().map((task) => Object.assign(new Task(), task)),
      ));

    return projectsList;
  }

  static addProject(project) {
    const projectsList = Storage.getProjectsList();
    projectsList.addProject(project);
    Storage.saveProjectsList(projectsList);
  }

  static deleteProject(projectName) {
    const projectsList = Storage.getProjectsList();
    projectsList.deleteProject(projectName);
    Storage.saveProjectsList(projectsList);
  }

  static renameProject(projectName, newProjectName) {
    const projectsList = Storage.getProjectsList();
    projectsList.getProject(projectName).setName(newProjectName);
    Storage.saveProjectsList(projectsList);
  }

  static addTask(projectName, task) {
    const projectsList = Storage.getProjectsList();
    projectsList.getProject(projectName).addTask(task);
    Storage.saveProjectsList(projectsList);
  }

  static deleteTask(projectName, taskName) {
    const projectsList = Storage.getProjectsList();
    projectsList.getProject(projectName).deleteTask(taskName);
    Storage.saveProjectsList(projectsList);
  }

  static renameTask(projectName, taskName, newTaskName) {
    const projectsList = Storage.getProjectsList();
    projectsList.getProject(projectName).getTask(taskName).setName(newTaskName);
    Storage.saveProjectsList(projectsList);
  }

  static setTaskDate(projectName, taskName, newDueDate) {
    const projectsList = Storage.getProjectsList();
    projectsList.getProject(projectName).getTask(taskName).setDate(newDueDate);
  }
}
