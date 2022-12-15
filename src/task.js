export default class Task {
  constructor(name, dueDate = 'No Date') {
    this.name = name;
    // this.id = id;
    this.dueDate = dueDate;
  }

  setName(name) {
    this.name = name;
  }

  setDate(dueDate) {
    this.dueDate = dueDate;
  }

  getName() {
    return this.name;
  }

  // getID() {
  //   return this.id;
  // }

  getDate() {
    return this.dueDate;
  }
}
