import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/model/todo.models';
import { TodoKeyLocalStorage } from '../models/enum/todoKeyLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

    public todosState = signal<Array<Todo>>([]);

    public updateTodos({id, title, description, done}: Todo): void{
      if (title && description && done != null || undefined) {
         this.todosState.mutate((todos) => {
          if (todos != null) {
            todos.push(new Todo(id, title, description, done));

            console.log(todos)
            this.saveTodoInLocalStorage()
          }
         })
      }
    }

    public saveTodoInLocalStorage(): void{
      const TODOS = JSON.stringify(this.todosState())
      TODOS && localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, TODOS)
    }
}
