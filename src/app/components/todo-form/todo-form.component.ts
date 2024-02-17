import { TodoListService } from './../../services/todo-list.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule],

  templateUrl: './todo-form.component.html'
})
export class TodoFormComponent {
  constructor(private todoSignalsService: TodoListService, private dialogService: MatDialog, private dialogServiceRef: MatDialogRef<HeaderComponent>){}
  public allTodos = this.todoSignalsService.todosState();
  public dialogRefService = this.dialogServiceRef;

  public todosForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  public handleCreateNewTodo(): void{
    if (this.todosForm.valid && this.todosForm.value) {
      const title = String(this.todosForm.controls['title'].value);
      const description = String(this.todosForm.controls['description'].value);
      const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1
      const done = false;

      this.todoSignalsService.updateTodos({id, title, description, done})
      this.dialogRefService.close();
    }
  }

  public handleCloseModal(){
    this.dialogRefService.close()
  }
}
