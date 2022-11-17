"use strict";
// run `node index.js` in the terminal
Object.defineProperty(exports, "__esModule", { value: true });
const todoCollection_1 = require("./todoCollection");
const todoItem_1 = require("./todoItem");
const inquirer = require('inquirer');
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
    Commands["Complete"] = "Complete Task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Purge"] = "Remove Completed Task";
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
function promptComplete() {
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
        let completedTasks = answers['complete'];
        collection
            .getTodoItems(true)
            .forEach((item) => collection.markComplete(item.id, completedTasks.find((id) => id === item.id) != undefined));
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
                }
                else {
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
let newId = collection.addTodo('Ir a correr');
let todoItem = collection.getTodoById(newId);
promptUser();
