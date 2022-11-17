// run `node index.js` in the terminal

import { JsonTodoCollection } from './jsonTodoCollection';
import { TodoCollection } from './todoCollection';
import { TodoItem } from './todoItem';
const inquirer = require('inquirer');

let todos: TodoItem[] = [
  new TodoItem(1, 'Comprar Pan'),
  new TodoItem(2, 'Comprar zapatos'),
  new TodoItem(3, 'Recolecat tickets'),
  new TodoItem(4, 'Llamar a secretaria', true),
];

// let collection: TodoCollection = new TodoCollection('Richard', todos);
let collection: TodoCollection = new JsonTodoCollection('Richard', todos);
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
  Complete = 'Complete Task',
  Toggle = 'Show/Hide Completed',
  Purge = 'Remove Completed Task',
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

function promptComplete(): void {
  console.clear();
  inquirer
    .prompt({
      type: 'checkbox',
      name: 'complete',
      message: 'Mark Tasks Complete',
      choices: collection.getTodoItems(showCompleted).map((item) => ({
        name: item.task,
        value: item.id,
        checked: item.complete,
      })),
    })
    .then((answers) => {
      let completedTasks = answers['complete'] as number[];
      collection
        .getTodoItems(true)
        .forEach((item) =>
          collection.markComplete(
            item.id,
            completedTasks.find((id) => id === item.id) != undefined
          )
        );
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
        case Commands.Complete:
          if (collection.getItemCounts().incomplete > 0) {
            promptComplete();
          } else {
            promptUser();
          }
          break;
        case Commands.Purge:
          collection.removeComplete();
          promptUser();
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
