// static projectsListTesting() {
//   // const projectsList = ProjectsList.getProjectsList();

//   const projects = Dom.exampleProjects();
//   const tasks = Dom.exampleTasks();

//   // Storage.deleteProject(projects.testProject2);
//   // Storage.addProject(projects.testProject2);
//   // Storage.addTask(projects.testProject2.name, tasks.task3);
//   Storage.deleteTask(projects.testProject2.name, tasks.task2.name);
// }

// static exampleTasks() {
//   const task1 = new Task('example 1', '12/15/2022');
//   Render.aTaskCard(task1.getName(), task1.getDate());

//   const task2 = new Task('example 2', '11/15/2022');
//   Render.aTaskCard(task2.getName(), task2.getDate());

//   const task3 = new Task('example 3', '10/15/2022');
//   Render.aTaskCard(task3.getName(), task3.getDate());

//   const task4 = new Task('example 4', '9/15/2022');
//   Render.aTaskCard(task4.getName(), task4.getDate());

//   const task5 = new Task('example 5', '8/15,2022');
//   Render.aTaskCard(task5.getName(), task5.getDate());

//   return {
//     task1, task2, task3, task4, task5,
//   };
// }

// static exampleProjects() {
//   const testProject1 = new Project('testProject1');
//   const testProject2 = new Project('testProject2');

//   return { testProject1, testProject2 };
// }
