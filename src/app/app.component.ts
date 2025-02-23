import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgClass, NgFor} from '@angular/common';
import {TodoService} from './services/todo.service';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2

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
  styleUrls: ['./app.component.css'] // ✅ Fixed typo (styleUrl -> styleUrls)
})
export class AppComponent {
  title = 'angular-todo';
  todoList: TodoItem[] = [];
  newTask: string = '';
  editingTaskId: number | null = null;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todoList = [...todos];
        console.log('Fetched Todos:', this.todoList); // ✅ Debugging Log
      },
      error: (err) => {
        console.error('Error fetching todos:', err); // ✅ Log errors
        Swal.fire({
          title: 'Error',
          text: 'Failed to load tasks',
          icon: 'error'
        });
      }
    });
  }

  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTaskItem: TodoItem = {
        id: 0, // Backend should assign ID
        task: this.newTask.toUpperCase(),
        completed: false
      };

      this.todoService.addTodo(newTaskItem).subscribe({
        next: (savedTask) => {
          this.todoList.push(savedTask);
          this.newTask = '';

          Swal.fire({
            title: 'Task Added',
            text: 'Successfully added!',
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
        },
        error: (err) => {
          console.error('Error adding task:', err);
          Swal.fire({
            title: 'Error',
            text: 'Failed to add task',
            icon: 'error'
          });
        }
      });
    }
  }
}
