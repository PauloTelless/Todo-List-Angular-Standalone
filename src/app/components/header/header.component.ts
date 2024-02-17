import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TodoFormComponent } from '../todo-form/todo-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dialogService: MatDialog){}

  handleOpenModal(){
    this.dialogService.open(TodoFormComponent, {
      width: '50vw',
      maxHeight: '80vh'
    })
  }
}
