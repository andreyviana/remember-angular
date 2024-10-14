import { Component, ElementRef, ViewChild, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
      FormsModule
    ]
})
export class AppComponent {

  todoList: TodoItem[] = [];
  newTask: string = '';
  @ViewChild('todoText') todoInputRef: ElementRef<HTMLInputElement> = null!;

  ngOnInit(): void {}

  addTask(text: string): void {
    if (text.trim() !== '') {
        const newTodoItem: TodoItem = {
            id: Date.now(),
            task: text.trim(),
            completed: false,
            onEditMode: false
        };
        this.todoList.push(newTodoItem);
        this.todoInputRef.nativeElement.value = '';
    }
  }

  editTask(id: number, text: string): void {
    if (text.trim() !== '') {
     const todoItemIndex: number = this.todoList.findIndex(item => item.id === id);
     this.todoList[todoItemIndex].task = text;

     this.toggleEditMode(id);
     this.onEditNewTask('');
    }
  }

  onEditNewTask(newTask: string) {
    this.newTask = newTask;
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

  toggleEditMode(id: number): void {
    const todoItem = this.todoList.find(item => item.id === id);
    if (todoItem) todoItem.onEditMode = !todoItem.onEditMode;
  }

}