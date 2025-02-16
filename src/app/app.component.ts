import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgClass, NgFor} from '@angular/common';


export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgFor, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-todo';
  todoList: TodoItem[] = [];
  newTask: string = '';


  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTaskItem: TodoItem = {
        id: Date.now(),
        task: this.newTask,
        completed: false
      }
      this.todoList.push(newTaskItem);
      this.newTask = '';
    }
  }

  toggleCompleted(index: number): void {
    this.todoList[index].completed = !this.todoList[index].completed
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id)
  }
}
