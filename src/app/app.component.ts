import { Component, ElementRef, ViewChild, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  onEditMode: boolean;
}


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    NgFor,
    NgClass,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AppComponent {
  todoList: TodoItem[] = [];
  
  addTaskForm = new FormGroup({
    task: new FormControl(''),
  });
  
  editTaskForm = new FormGroup({
    task: new FormControl(''),
  });

  handleAddSubmit(): void {
    if (this.addTaskForm.value.task)
      this.addTask(this.addTaskForm.value.task);
  }
  
  handleEditSubmit(id: number): void {
    if (this.editTaskForm.value.task)
      this.editTask(id, this.editTaskForm.value.task);
  }
  

  addTask(text: string): void {
    if (text.trim() !== '') {
        const newTodoItem: TodoItem = {
            id: Date.now(),
            task: text.trim(),
            completed: false,
            onEditMode: false
        };
        this.todoList.push(newTodoItem);
        this.addTaskForm.reset();
    }
  }

  editTask(id: number, text: string): void {
    if (text.trim() !== '') { 
      const todoItemIndex: number = this.todoList.findIndex(item => item.id === id);
      this.todoList[todoItemIndex].task = text;

      this.cancelEditMode(id);
      this.editTaskForm.reset();
    }
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
  }

  toggleCompleted(id: number): void {
    const todoItem = this.todoList.find(item => item.id === id);
    if (todoItem) {
        todoItem.completed = !todoItem.completed;
    }
  }

  editMode(id: number): void {
    const todoItem = this.todoList.find(item => item.id === id);
    const indexTodoOnEditMode = this.todoList.findIndex(item => item.onEditMode === true);

    if (indexTodoOnEditMode >= 0) 
      this.todoList[indexTodoOnEditMode].onEditMode = false; 

    if (todoItem) {
      todoItem.onEditMode = true;
      if (todoItem.onEditMode) 
        this.editTaskForm.reset({ task: todoItem.task })
    }
  }
  
  cancelEditMode(id: number) {
    const todoItem = this.todoList.find(i => i.id === id);
    if (todoItem) {
      todoItem.onEditMode = false;
    }
  }
}