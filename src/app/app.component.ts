import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgClass, NgFor, NgIf} from '@angular/common';
import {TodoService} from './services/todo.service';
import Swal from 'sweetalert2';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  isDeleted: boolean;
}

let timerInterval: number = 1000;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, NgClass, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-todo';
  todoList: TodoItem[] = [];
  newTask: string = '';
  editingTaskId: number | null = null;
  editedTask: string = '';

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todoList = todos.filter(todo => !todo.isDeleted); // ✅ Filter out deleted items
      },
      error: (err) => {
        console.error('Error fetching todos:', err);
        Swal.fire({title: 'Error', text: 'Failed to load tasks', icon: 'error'});
      }
    });
  }

  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTaskItem: TodoItem = {
        id: 0,
        task: this.newTask.toUpperCase(),
        completed: false,
        isDeleted: false
      };

      this.todoService.addTodo(newTaskItem).subscribe({
        next: (savedTask) => {
          this.todoList.push(savedTask);
          this.newTask = '';
          Swal.fire({title: 'Task Added', text: 'Successfully added!', icon: 'success'});
        },
        error: (err) => {
          console.error('Error adding task:', err);
          Swal.fire({title: 'Error', text: 'Failed to add task', icon: 'error'});
        }
      });
    }
  }

  /** ✅ Start Editing a Task */
  startEditing(todo: TodoItem): void {
    this.editingTaskId = todo.id;
    this.editedTask = todo.task;
    console.log(this.editingTaskId);
  }

  /** ✅ Save Edited Task */
  saveTask(todo: TodoItem): void {
    if (this.editedTask.trim() !== '') {
      const updatedTask: TodoItem = {...todo, task: this.editedTask};

      this.todoService.updateTodo(updatedTask).subscribe({
        next: () => {
          const index = this.todoList.findIndex(t => t.id === todo.id);
          if (index !== -1) {
            this.todoList[index] = updatedTask;
          }
          this.editingTaskId = null;
          this.editedTask = '';

          Swal.fire({title: 'Task Updated', text: 'Successfully updated!', icon: 'success'});
        },
        error: (err) => {
          console.error('Error updating task:', err);
          Swal.fire({title: 'Error', text: 'Failed to update task', icon: 'error'});
        }
      });
    }
  }

  cancelEditing(): void {
    this.editingTaskId = null;
    this.editedTask = '';
  }

  toogleCompletion(todoItem: TodoItem) {
    todoItem.completed = !todoItem.completed; // toggle status
    this.todoService.updateTodo(todoItem).subscribe({
      next: () => {
        Swal.fire({
          title: 'Updated!',
          text: `Task marked as ${todoItem.completed ? 'Completed' : 'Incomplete'}`,
          icon: 'success'
        });
      },
      error: (err) => {
        console.error('Error updating task status:', err);
        Swal.fire({title: 'Error', text: 'Failed to update task status', icon: 'error'});
      }
    });
  }

  deleteTask(todoItem: TodoItem) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This task will remove the selected task.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        todoItem.isDeleted = true;

        this.todoService.softDeleteTodo(todoItem.id).subscribe({
          next: () => {
            this.todoList = this.todoList.filter(t => t.id !== todoItem.id);
            Swal.fire({title: 'Task Deleted', text: 'Successfully deleted!', icon: 'success'});
          }
        })
      }
    })
  }

  restoreTask(todoItem: TodoItem) {
    todoItem.isDeleted = false;

    this.todoService.updateTodo(todoItem).subscribe({
      next: () => {
        this.fetchTodos(); // ✅ Refresh list
        Swal.fire({title: 'Restored!', text: 'Task has been restored.', icon: 'success'});
      },
      error: (err) => {
        console.error('Error restoring task:', err);
        Swal.fire({title: 'Error', text: 'Failed to restore task', icon: 'error'});
      }
    });
  }
}
