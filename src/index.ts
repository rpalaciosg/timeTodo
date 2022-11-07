// run `node index.js` in the terminal

import { TodoCollection } from './todoCollection';
import { TodoItem } from './todoItem';
const inquirer = require('inquirer');
// import * as inquirer from inquirer;

let todos: TodoItem[] = [
  new TodoItem(1, 'Comprar Pan'),
  new TodoItem(2, 'Comprar zapatos'),
  new TodoItem(3, 'Recolecat tickets'),
  new TodoItem(4, 'Llamar a secretaria', true),
];

let collection: TodoCollection = new TodoCollection('Richard', todos);
let showCompleted = true;

function displayTodoList(): void {
  console.log(`*************************************************************`);
  console.log(
    `*****                ${collection.userName}´s Todo List                *****`
  );
  console.log(`*************************************************************`);
  console.log(
    `
          (${collection.getItemCounts().incomplete} items to do)` +
      ` of (${collection.getItemCounts().total} in total)
      `
  );
  collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
  console.log('\n');
}

enum Commands {
  Add = 'Add new task',
  Toggle = 'Show/Hide Completed',
  Quit = 'Quit',
}

function promptAdd(): void {
  console.clear();
  inquirer
    .prompt({ type: 'input', name: 'add', message: 'Enter task:' })
    .then((answers) => {
      if (answers['add'] !== '') {
        collection.addTodo(answers['add']);
      }
      promptUser();
    });
}

function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer;
  inquirer
    .prompt({
      type: 'list',
      name: 'command',
      message: 'Choose option',
      choices: Object.values(Commands),
      // badProperty: true,
    })
    .then((answers) => {
      switch (answers['command']) {
        case Commands.Toggle:
          showCompleted = !showCompleted;
          promptUser();
          break;
        case Commands.Add:
          promptAdd();
          break;
      }
    });
}

let newId: number = collection.addTodo('Ir a correr');
let todoItem: TodoItem = collection.getTodoById(newId);

promptUser();

// console.log(JSON.stringify(todoItem));
// collection.removeComplete();
// collection.getTodoItems(true).forEach((item) => item.printDetails());
