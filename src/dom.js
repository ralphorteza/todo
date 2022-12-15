import Handler from './handlers/handler';
import Storage from './storage';
// import Project from './project';
// import Task from './task';
import Render from './render';
import ProjectEvents from './handlers/projectevents';

export default class Dom {
  static loadPage() {
    Handler.form();
    // Handler.task();
    Handler.project();
    Handler.openProject('Inbox', document.querySelector('#button-inbox-projects'));
    Dom.loadProjects();
    Handler.openInboxProject();
  }

  static loadProjects() {
    Storage
      .getProjectsList()
      .getProjects()
      .forEach((project) => {
        if (project.name !== 'Inbox') Dom.loadProject(project.name);
      });
  }

  static loadProject(projectName) {
    Render.aProjectCard(projectName);
    Handler.initProjectButtons();
    console.log(`Project ${projectName} is loaded!`);
  }
}
