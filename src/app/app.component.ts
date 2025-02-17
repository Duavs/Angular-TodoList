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
  editingTaskId: number | null = null;

  addTask(): void {
    if (this.newTask.trim() !== '') {
      if (this.editingTaskId === null) {
        const newTaskItem: TodoItem = {
          id: Date.now(),
          task: this.newTask,
          completed: false
        }
        this.todoList.push(newTaskItem);
      } else {
        const taskIndex = this.todoList.findIndex(item => item.id === this.editingTaskId);
        if (taskIndex !== -1) {
          this.todoList[taskIndex].task = this.newTask;
        }
        this.editingTaskId = null;
      }
      this.newTask = '';
    }
  }

  toggleCompleted(index: number): void {
    this.todoList[index].completed = !this.todoList[index].completed
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id)
  }

  editTask(todoItem: TodoItem): void {
    this.newTask = todoItem.task; // ✅ Populate input field
    this.editingTaskId = todoItem.id; // ✅ Track the task being edited
  }


}
