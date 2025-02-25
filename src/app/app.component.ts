import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TodoService} from './services/todo.service';
import {CommonModule} from '@angular/common';
import "tailwindcss";

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  isDeleted: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
        this.todoList = todos.filter(todo => !todo.isDeleted);
        console.log("Fetched Todos:", this.todoList); // Debugging
      },
      error: (err) => {
        console.error('Error fetching todos:', err);
        //  this.showMessage('error', 'Error', 'Failed to load tasks');
      }
    });
  }

  addTask(): void {
    const lengthRegex = /^.{3,100}$/;
    const allowdCharsRegex = /^[a-zA-Z0-9\s.,!?'-]+$/;
    const bannedWords = ['stupid', 'idiot'];
    const banneWordsRegex = new RegExp(`\\b(${bannedWords.join('|')})\\b`, 'i');

    if (!this.newTask.trim()) {
      //this.showMessage('error', 'Invalid Input', 'Task cannot be empty');
      return;
    }

    if (!lengthRegex.test(this.newTask)) {
      // this.showMessage('error', 'Invalid Input', 'Task must be between 3 and 100 characters');
      console.log(this.newTask.length);
      return;
    }

    if (!allowdCharsRegex.test(this.newTask)) {
      //    this.showMessage('error', 'Invalid Characters', 'Task contains invalid characters');
      return;
    }

    if (banneWordsRegex.test(this.newTask)) {
      //    this.showMessage('error', 'Inappropriate Language', 'Task contains banned words');
      return;
    }

    const newTaskItem: TodoItem = {
      id: 0,
      task: this.newTask.toUpperCase(),
      completed: false,
      isDeleted: false
    };

    this.todoService.addTodo(newTaskItem).subscribe({
      next: () => {
        this.newTask = '';
        this.fetchTodos(); // ⬅ Refresh data after adding
        //this.showMessage('success', 'Task Added', 'Successfully added!');
      },
      error: (err) => {
        console.error('Error adding task:', err);
        //  this.showMessage('error', 'Error', 'Failed to add task');
      }
    });
  }

  startEditingCurrentTask(todo: TodoItem): void {
    this.editingTaskId = todo.id;
    this.editedTask = todo.task;
    console.log(this.editedTask);
  }

  saveTask(todo: TodoItem): void {
    if (this.editedTask.trim() !== '') {
      this.editingTaskId = todo.id;
      this.editedTask = todo.task;
      const updatedTask: TodoItem = {...todo, task: this.editedTask};
      console.log(this.editedTask);
      this.todoService.updateTodo(updatedTask).subscribe({
        next: () => {
          console.log('Updated task:', updatedTask);
          this.editingTaskId = null;
          this.editedTask = '';
          this.fetchTodos(); // ⬅ Ensure UI updates after editing
          // this.showMessage('success', 'Task Updated', 'Successfully updated!');
        },
        error: (err) => {
          console.error('Error updating task:', err);
          //this.showMessage('error', 'Error', 'Failed to update task');
        }
      });
    }
  }

  cancelEditing(): void {
    this.editingTaskId = null;
    this.editedTask = '';
  }

  toggleCompletions(todoItem: TodoItem) {
    todoItem.completed = !todoItem.completed;
    this.todoService.updateTodo(todoItem).subscribe({
      next: () => {
        console.log('clicked checkbox');
        //       this.showMessage('info', 'Updated', `Task marked as ${todoItem.completed ? 'Completed' : 'Incomplete'}`);
      },
      error: (err) => {
        console.error('Error updating task status:', err);
        //   this.showMessage('error', 'Error', 'Failed to update task status');
      }
    });
  }

  softdeleteTask(todoItem: TodoItem) {
    todoItem.isDeleted = true;
    this.todoService.softDeleteTodo(todoItem.id).subscribe({
      next: () => {
        this.fetchTodos(); // ⬅ Ensure deleted tasks disappear immediately
        //  this.showMessage('warn', 'Task Deleted', 'Successfully deleted!');
      },
      error: (err) => {
        console.error('Error deleting task:', err);
        //   this.showMessage('error', 'Error', 'Failed to delete task');
      }
    });
  }

  restoreTask(todoItem: TodoItem) {
    todoItem.isDeleted = false;
    this.todoService.updateTodo(todoItem).subscribe({
      next: () => {
        this.fetchTodos();
        //    this.showMessage('success', 'Restored', 'Task has been restored.');
      },
      error: (err) => {
        console.error('Error restoring task:', err);
        //  this.showMessage('error', 'Error', 'Failed to restore task');
      }
    });
  }
}
