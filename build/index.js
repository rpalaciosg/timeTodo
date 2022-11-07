"use strict";
// run `node index.js` in the terminal
Object.defineProperty(exports, "__esModule", { value: true });
const todoCollection_1 = require("./todoCollection");
const todoItem_1 = require("./todoItem");
const inquirer = require('inquirer');
// import * as inquirer from inquirer;
let todos = [
    new todoItem_1.TodoItem(1, 'Comprar Pan'),
    new todoItem_1.TodoItem(2, 'Comprar zapatos'),
    new todoItem_1.TodoItem(3, 'Recolecat tickets'),
    new todoItem_1.TodoItem(4, 'Llamar a secretaria', true),
];
let collection = new todoCollection_1.TodoCollection('Richard', todos);
let showCompleted = true;
function displayTodoList() {
    console.log(`*************************************************************`);
    console.log(`*****                ${collection.userName}´s Todo List                *****`);
    console.log(`*************************************************************`);
    console.log(`
          (${collection.getItemCounts().incomplete} items to do)` +
        ` of (${collection.getItemCounts().total} in total)
      `);
    collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
    console.log('\n');
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add new task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptAdd() {
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
function promptUser() {
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
let newId = collection.addTodo('Ir a correr');
let todoItem = collection.getTodoById(newId);
promptUser();
// console.log(JSON.stringify(todoItem));
// collection.removeComplete();
// collection.getTodoItems(true).forEach((item) => item.printDetails());
