import { project, toDo } from "./toDo";
import { formatDistance } from "date-fns";

export default class DOM {
  public addProjects() {
    const projectList = document.querySelector("#projList");
    const newProjectTitle: HTMLInputElement | null =
      document.querySelector("#addProjInput");
    const addProjectButton = document.querySelector("#addProjSubmit");

    addProjectButton?.addEventListener("click", () => {
      if (document.querySelectorAll(".list-group-item").length <= 5) {
        const newProject = document.createElement("a");
        newProject.classList.add("list-group-item", "list-group-item-action");
        newProject.setAttribute("href", "#");
        if (newProjectTitle?.value) {
          newProject.innerHTML = `<span class='greyTag'>&#60;</span><span class='darkBlueTag'>${newProjectTitle.value}</span><span class='greyTag'>\\&#62;</span>`;
        }
        if (newProjectTitle?.value !== "") {
          projectList?.appendChild(newProject);
          const newProjectObject = new project(newProjectTitle?.value);
          DOM.selectedProject(newProjectObject);
        }
      }
    });
  }

  static selectedProject(proj: project) {
    document.querySelectorAll(".list-group-item").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLElement;
        const targetBlueText = target.childNodes[1] as HTMLElement;
        const selectedProject = document.querySelector(".active");
        if (selectedProject && selectedProject !== targetBlueText) {
          selectedProject.classList.remove("active");
          targetBlueText.classList.add("active");
          DOM.displayProject(proj);
        } else if (selectedProject && selectedProject === targetBlueText) {
          return;
        } else if (selectedProject === null) {
          targetBlueText.classList.add("active");
          DOM.displayProject(proj);
        }
      });
    });
  }

  static displayProject(proj: project) {
    const currentProject = document.querySelector("#currentProject");
    if (currentProject) {
      currentProject.innerHTML = "";
      currentProject.className = "";
      currentProject.classList.add(`project`, `${proj.name}`);
      currentProject.innerHTML = `<div class='projectHeader'>
    <h2 class="projTitle">${proj.name}</h2>
    </div>`;
      proj.toDoItems.forEach((task) => {
        currentProject.innerHTML += `<div class='taskForm'>
        <input type='checkbox' class='taskCheckbox' id='taskCheckbox'>
      <h3 class='taskTitle'>${task.title}</h3>
      <p class='taskDescription'>${task.description}</p>
      <p class='taskDueDate'>${formatDistance(
        task.dueDate as Date,
        new Date(),
        { addSuffix: true }
      )}</p>
      </div>`;
      });
      currentProject.innerHTML += `<div class='addForm'>
      <button class='btn btn-primary left' id='addTask'>Add Task</button>
      </div>`;
    }
    DOM.addTask(proj);
  }

  static addTask(proj: project) {
    const currentProject = document.querySelector("#currentProject");
    const addTaskButton = currentProject?.querySelector("#addTask");
    const taskForm = `<div class='taskForm hidden'>
    <form class="addTaskForm">
    <div class='form-group'>
    <input type='text' class='form-control' id='taskTitle' placeholder='Task Title'>
    </div>
    <div class='form-group'>
    <input type='text' class='form-control' id='taskDescription' placeholder='Task Description'>
    </div>
    <div class='form-group'>
    <input type='date' class='form-control' id='taskDueDate' placeholder='Task Due Date'>
    </div>
    <button type='button' id='submitTask' class='btn btn-primary'>Submit</button>
    </form>
    </div>`;
    if (currentProject) {
      addTaskButton?.addEventListener("click", () => {
        const taskFormDiv = currentProject?.querySelector(".addForm");
        taskFormDiv?.remove();
        currentProject.innerHTML += taskForm;
        const submitTask = currentProject?.querySelector("#submitTask");
        submitTask?.addEventListener("click", () => {
          const taskTitle: HTMLInputElement | null =
            currentProject?.querySelector("#taskTitle");
          const taskDescription: HTMLInputElement | null =
            currentProject?.querySelector("#taskDescription");
          const taskDueDate: HTMLInputElement | null =
            currentProject?.querySelector("#taskDueDate");
          const taskCompletion: HTMLInputElement | null =
            currentProject?.querySelector("#taskCheckbox");
          // validate inputs

          const newTask = new toDo(
            taskCompletion?.checked,
            taskTitle?.value,
            proj.name,
            taskDescription?.value,
            taskDueDate?.valueAsDate as Date
          );
          proj.toDoItems.push(newTask);
          DOM.displayProject(proj);
          console.log(proj.toDoItems);
        });
      });
    }
  }
}
