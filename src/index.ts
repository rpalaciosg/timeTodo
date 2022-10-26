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
  collection.getTodoItems(true).forEach((item) => item.printDetails());
  console.log('\n');
}

enum Commands {
  Quit = 'Quit',
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
    })
    .then((answers) => {
      if (answers['command'] !== Commands.Quit) {
        promptUser();
      }
    });
}

let newId: number = collection.addTodo('Ir a correr');
let todoItem: TodoItem = collection.getTodoById(newId);

promptUser();

// console.log(JSON.stringify(todoItem));
// collection.removeComplete();
// collection.getTodoItems(true).forEach((item) => item.printDetails());
