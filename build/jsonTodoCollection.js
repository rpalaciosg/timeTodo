"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonTodoCollection = void 0;
const todoCollection_1 = require("./todoCollection");
const lowdb_1 = require("lowdb");
// import { JSONFile } from 'lowdb/node';
const node_1 = require("lowdb/lib/node");
class JsonTodoCollection extends todoCollection_1.TodoCollection {
    constructor(userName, todoItems = []) {
        super(userName, []);
        this.userName = userName;
        this.database = (0, lowdb_1.Low)(new node_1.JSONFile('Todos.json'));
    }
}
exports.JsonTodoCollection = JsonTodoCollection;
