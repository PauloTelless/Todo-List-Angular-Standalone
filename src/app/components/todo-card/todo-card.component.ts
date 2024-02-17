import { TodoListService } from './../../services/todo-list.service';
import { Todo } from './../../models/model/todo.models';
import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { TodoKeyLocalStorage } from 'src/app/models/enum/todoKeyLocalStorage';
import {MatTabsModule} from '@angular/material/tabs'

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],

  templateUrl: './todo-card.component.html'
})
export class TodoCardComponent implements OnInit{
  private todosSignalService = inject(TodoListService)
  private todosSignal = this.todosSignalService.todosState;
  public todoList = computed(() => this.todosSignal());


  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  getTodosInLocalStorage() {
    const todosDatas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string
    todosDatas && (this.todosSignal.set(JSON.parse(todosDatas)))
  }

  private saveTodosInLocalStorage(): void{
    this.todosSignalService.saveTodoInLocalStorage()
  }

  public handleDoneTodo(todoId: number): void{
    if (todoId) {
      this.todosSignal.mutate((todos) => {
        const todoSelected = todos.find((todo) => todo.id === todoId) as Todo;
        todoSelected.done = true;
        this.saveTodosInLocalStorage()
      })
    }
  }

  public handleDeleteTodo(todo: Todo): void {
    if (todo) {
      const index = this.todoList().indexOf(todo);

      if (index !== -1) {
        this.todosSignal.mutate((todos) => {
          todos.splice(index, 1);
          this.saveTodosInLocalStorage();
        });
      }
    }
  }
}
