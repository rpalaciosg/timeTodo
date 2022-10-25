// run `node index.js` in the terminal

import { TodoCollection } from './todoCollection';
import { TodoItem } from './todoItem';

let todos: TodoItem[] = [
  new TodoItem(1, 'Comprar Pan'),
  new TodoItem(2, 'Comprar zapatos'),
  new TodoItem(3, 'Recolecat tickets'),
  new TodoItem(4, 'Llamar a secretaria', true),
];

let collection: TodoCollection = new TodoCollection('Richard', todos);

console.clear();
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

let newId: number = collection.addTodo('Ir a correr');
let todoItem: TodoItem = collection.getTodoById(newId);
// todoItem.printDetails();
// console.log(JSON.stringify(todoItem));

// collection.addTodo(todoItem);
// collection.removeComplete();
collection.getTodoItems(true).forEach((item) => item.printDetails());
