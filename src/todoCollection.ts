import { it } from 'node:test';
import { TodoItem } from './todoItem';

type ItemCounts = {
  total: number;
  incomplete: number;
};

export class TodoCollection {
  private nextId: number = 1;
  protected itemMap = new Map<number, TodoItem>();

  constructor(public userName: string, todoItems: TodoItem[] = []) {
    todoItems.forEach((item) => this.itemMap.set(item.id, item));
  }

  addTodo(task: string): number {
    while (this.getTodoById(this.nextId)) {
      this.nextId++;
    }
    this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
    return this.nextId;
  }

  getTodoById(id: number): TodoItem {
    // return this.todoItems.find((item) => item.id === id);
    return this.itemMap.get(id);
  }

  getTodoItems(includeComplete: boolean): TodoItem[] {
    return [...this.itemMap.values()].filter(
      (item) => includeComplete || !item.complete
    );
  }

  getItemCounts(): ItemCounts {
    return {
      total: this.itemMap.size,
      incomplete: this.getTodoItems(false).length,
    };
  }

  markComplete(id: number, complete: boolean): void {
    const todoItem = this.getTodoById(id);
    if (todoItem) {
      todoItem.complete = complete;
    }
  }

  removeComplete() {
    this.itemMap.forEach((item) => {
      if (item.complete) {
        this.itemMap.delete(item.id);
      }
    });
  }
}
