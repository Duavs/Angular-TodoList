import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgClass, NgFor} from '@angular/common';
import Swal from 'sweetalert2';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

let timerInterval: number = 1000;

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
          task: this.newTask.toUpperCase(),
          completed: false
        };
        this.todoList.push(newTaskItem);

        Swal.fire({
          title: 'Task Added',
          html: 'Successfully added!',
          icon: 'success',
          timer: timerInterval,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        });
      } else {
        const taskIndex = this.todoList.findIndex(item => item.id === this.editingTaskId);
        if (taskIndex !== -1) {
          this.todoList[taskIndex].task = this.newTask;
          Swal.fire({
            title: 'Task Update',
            html: 'Successfully Updated!',
            icon: 'info',
            timer: timerInterval,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          });
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this task!",
      icon: "warning",
      customClass: {
        popup: 'swal2-popup'
      },
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.todoList = this.todoList.filter(item => item.id !== id);
        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      }
    });
  }

  editTask(todoItem: TodoItem): void {
    this.newTask = todoItem.task; // ✅ Populate input field
    this.editingTaskId = todoItem.id; // ✅ Track the task being edited
  }

  trackById(index: number, todoItem: TodoItem): number {
    return todoItem.id;
  }

}
