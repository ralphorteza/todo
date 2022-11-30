(()=>{"use strict";class t{constructor(t){this.name=t,this.tasks=[]}setName(t){this.name=t}getName(){return this.name}setTasks(t){this.tasks=t}getTasks(){return this.tasks}getTask(t){return this.task.find((e=>e.getName()===t))}contains(t){return this.tasks.some((e=>e.getName()===t))}addTask(t){this.tasks.find((e=>e.getName()===t.name))||this.tasks.push(t)}deleteTask(t){this.tasks=this.tasks.fileter((e=>e.name!==t))}}class e{constructor(t,e="No Date"){this.name=t,this.dueDate=e}setName(t){this.name=t}getName(){return this.name}setDate(t){this.dueDate=t}getDate(){return this.dueDate}getDateFormatted(){const t=this.dueDate.split("/")[0];return`${this.dueDate.split("/")[1]}/${t}/${this.dueDate.split("/")[2]}`}}class o{constructor(){this.projects=[],this.projects.push(new t("Inbox"))}setProjects(t){this.projects=t}getProjects(){return this.projects}getProject(t){return this.projects.find((e=>e.getName()===t))}contains(t){return this.projects.some((e=>e.getName()===t))}addProject(t){this.projects.find((e=>e.name===t.name))||this.projects.push(t)}deleteProject(t){const e=this.projects.find((e=>e.getName()===t));this.projects.splice(this.projects.indexOf(e),1)}}class s{static saveToDoList(t){localStorage.setItem("toDoList",JSON.stringify(t))}static getToDoList(){const s=Object.assign(new o,JSON.parse(localStorage.getItem("toDoList")));return s.setProjects(s.getProjects().map((e=>Object.assign(new t,e)))),s.getProjects().forEach((t=>t.setTasks(t.getTasks().map((t=>Object.assign(new e,t)))))),s}static addProject(t){const e=s.getToDoList();e.addProject(t),s.saveToDoList(e)}static deleteProject(t){const e=s.getToDoList();e.deleteProject(t),s.saveToDoList(e)}static addTask(t,e){const o=s.getToDoList();o.getProject(t).addTask(e),s.saveToDoList(o)}static deleteTask(t,e){const o=s.getToDoList();o.getProject(t).deleteTask(e),s.saveToDoList(o)}static renameTask(t,e,o){const c=s.getToDoList();c.getProject(t).getTask(e).setName(o),s.saveToDoList(c)}static setTaskDate(t,e,o){s.getToDoList().getProject(t).getTask(e).setDate(o)}}class c{static loadPage(){c.form(),c.initAddProjectButtons(),c.openProject("Inbox",document.getElementById("button-inbox-projects")),c.loadProjects()}static openProject(t,e){[...document.querySelectorAll(".button-default-project"),...document.querySelectorAll(".button-project")].forEach((t=>t.classList.remove("active"))),e.classList.add("active"),c.closeAddProjectPopup(),c.loadProjectContent(t)}static loadTasks(t){s.getToDoList().getProject(t).getTasks().forEach((t=>c.createTask(t.name,t.dueDate)))}static loadProjectContent(t){const e=document.querySelector("#project-preview"),o=document.createElement("h1");o.setAttribute("id","project-name"),o.textContent=t;const s=document.createElement("div");s.setAttribute("id","tasks-list"),e.append(o),e.append(s),c.loadTasks(t)}static loadProjects(){s.getToDoList().getProjects().forEach((t=>{"Inbox"!==t.name&&c.createProject(t.name)})),c.initAddProjectButtons()}static initAddProjectButtons(){const t=document.querySelector("#button-add-project"),e=document.querySelector("#button-add-project-popup"),o=document.querySelector("#button-cancel-project-popup"),s=document.querySelector("#input-add-project-popup");t.addEventListener("click",c.openAddProjectPopup),e.addEventListener("click",c.addProject),o.addEventListener("click",c.closeAddProjectPopup),s.addEventListener("keypress",c.handleAddProjectInput)}static openInboxTasks(){c.openProject("Inbox",this)}static handleProjectButton(){const t=this.textContent;c.openProject(t,this)}static initProjectButtons(){const t=document.querySelector("#button-inbox-projects"),e=document.querySelectorAll(".button-project");t.addEventListener("click",c.openInboxTasks),e.forEach((t=>{t.addEventListener("click",c.handleProjectButton)}))}static openAddProjectPopup(){const t=document.querySelector("#add-project-popup"),e=document.querySelector("#button-add-project");t.classList.add("active"),e.classList.add("active")}static closeAddProjectPopup(){const t=document.querySelector("#add-project-popup"),e=document.querySelector("#button-add-project"),o=document.querySelector("#input-add-project-popup");t.classList.remove("active"),e.classList.remove("active"),o.value=""}static handleAddProjectInput(t){"Enter"===t.key&&c.addProject()}static addProject(){const e=document.getElementById("input-add-project-popup"),o=e.value;if(""!==o){if(s.getToDoList().contains(o))return e.value="",void alert("project name must be different");s.addProject(new t(o)),c.createProject(o),c.closeAddProjectPopup()}else alert("project name can't be empty")}static createProject(t){const e=document.querySelector("#projects-list"),o=document.createElement("button");o.setAttribute("class","button-project"),o.textContent=t,e.append(o),c.initProjectButtons()}static makeProject(){}static createTask(t,e){const o=document.querySelector("#tasks-list"),s=document.createElement("div"),c=document.createElement("input"),a=document.createElement("div"),n=document.createElement("div"),r=document.createElement("button"),d=document.createElement("button");s.classList.add("task"),a.classList.add("task-name"),n.classList.add("date"),r.classList.add("edit"),d.classList.add("delete"),c.setAttribute("type","checkbox"),a.textContent=t,n.textContent=e,r.textContent="edit",d.textContent="delete",s.append(c),s.append(a),s.append(n),s.append(r),s.append(d),o.append(s)}static openForm(){document.querySelector("#add-task").addEventListener("click",(()=>{document.querySelector("#form-container").classList.add("active"),document.querySelector("#overlay").classList.add("active")}))}static cancelForm(){document.querySelector("#cancel-task").addEventListener("click",(()=>{document.querySelector("#form-container").classList.remove("active"),document.querySelector("#overlay").classList.remove("active")}))}static form(){c.openForm(),c.submitTask(),c.cancelForm()}static submitTask(){document.querySelector("#form").addEventListener("submit",(t=>{t.preventDefault();const o=document.querySelector("#project-name").textContent,a=document.querySelector("#task-title").value,n=document.querySelector("#task-date").value;s.addTask(o,new e(a,n)),c.createTask(a,n)}))}}document.addEventListener("DOMContentLoaded",c.loadPage)})();