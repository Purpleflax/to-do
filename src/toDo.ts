class project {
  name: string;
  toDoItems: toDo[];
  constructor(name: string = "None", toDoItems: toDo[] = []) {
    this.name = name;
    this.toDoItems = toDoItems;
  }
}

class toDo {
  completed: boolean = false;
  title: string;
  description: string;
  dueDate: Date | null;
  project: string;
  constructor(
    completed: boolean = false,
    title: string = "None",
    project: string = "None",
    description: string = "None",
    dueDate: Date = new Date()
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = completed;
    this.project = project;
  }

  public addTask() {
    console.log("Task added");
  }
  public completeTask() {
    console.log("Task completed");
  }
}

export { toDo, project };
