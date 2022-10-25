"use strict";
// run `node index.js` in the terminal
Object.defineProperty(exports, "__esModule", { value: true });
const todoCollection_1 = require("./todoCollection");
const todoItem_1 = require("./todoItem");
let todos = [
    new todoItem_1.TodoItem(1, 'Comprar Pan'),
    new todoItem_1.TodoItem(2, 'Comprar zapatos'),
    new todoItem_1.TodoItem(3, 'Recolecat tickets'),
    new todoItem_1.TodoItem(4, 'Llamar a secretaria', true),
];
let collection = new todoCollection_1.TodoCollection('Richard', todos);
console.clear();
console.log(`%c${collection.userName}´s Todo List`, 'background: #222; color: #bada55');
let newId = collection.addTodo('Ir a correr');
let todoItem = collection.getTodoById(newId);
todoItem.printDetails();
// console.log(JSON.stringify(todoItem));
// collection.addTodo(todoItem);
