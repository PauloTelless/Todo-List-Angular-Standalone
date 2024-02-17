import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/model/todo.models';
import { TodoKeyLocalStorage } from '../models/enum/todoKeyLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

    public todoState = signal<Array<Todo>>([]);

    public updateTodos({id, title, description, done}: Todo): void{
      if (title && description && done != null || undefined) {
         this.todoState.mutate((todos) => {
          if (todos != null) {
            todos.push(new Todo(id, title, description, done));
            this.saveTodoInLocalStorage()
          }
         })
      }
    }

    public saveTodoInLocalStorage(): void{
      const TODOS = JSON.stringify(this.todoState())
      TODOS && localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, TODOS)
    }
}
