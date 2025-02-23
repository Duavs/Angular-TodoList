import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TodoService} from './services/todo.service';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  isDeleted: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule, CheckboxModule, InputTextModule, ButtonModule, TableModule, DialogModule, ToastModule
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-todo';
  todoList: TodoItem[] = [];
  newTask: string = '';
  editingTaskId: number | null = null;
  editedTask: string = '';

  constructor(private todoService: TodoService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todoList = todos.filter(todo => !todo.isDeleted);
      },
      error: (err) => {
        console.error('Error fetching todos:', err);
        this.showMessage('error', 'Error', 'Failed to load tasks');
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
          this.showMessage('success', 'Task Added', 'Successfully added!');
        },
        error: (err) => {
          console.error('Error adding task:', err);
          this.showMessage('error', 'Error', 'Failed to add task');
        }
      });
    }
  }

  startEditing(todo: TodoItem): void {
    this.editingTaskId = todo.id;
    this.editedTask = todo.task;
  }

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
          this.showMessage('success', 'Task Updated', 'Successfully updated!');
        },
        error: (err) => {
          console.error('Error updating task:', err);
          this.showMessage('error', 'Error', 'Failed to update task');
        }
      });
    }
  }

  cancelEditing(): void {
    this.editingTaskId = null;
    this.editedTask = '';
  }

  toogleCompletion(todoItem: TodoItem) {
    todoItem.completed = !todoItem.completed;
    this.todoService.updateTodo(todoItem).subscribe({
      next: () => {
        this.showMessage('info', 'Updated', `Task marked as ${todoItem.completed ? 'Completed' : 'Incomplete'}`);
      },
      error: (err) => {
        console.error('Error updating task status:', err);
        this.showMessage('error', 'Error', 'Failed to update task status');
      }
    });
  }

  deleteTask(todoItem: TodoItem) {
    todoItem.isDeleted = true;
    this.todoService.softDeleteTodo(todoItem.id).subscribe({
      next: () => {
        this.todoList = this.todoList.filter(t => t.id !== todoItem.id);
        this.showMessage('warn', 'Task Deleted', 'Successfully deleted!');
      },
      error: (err) => {
        console.error('Error deleting task:', err);
        this.showMessage('error', 'Error', 'Failed to delete task');
      }
    });
  }

  restoreTask(todoItem: TodoItem) {
    todoItem.isDeleted = false;
    this.todoService.updateTodo(todoItem).subscribe({
      next: () => {
        this.fetchTodos();
        this.showMessage('success', 'Restored', 'Task has been restored.');
      },
      error: (err) => {
        console.error('Error restoring task:', err);
        this.showMessage('error', 'Error', 'Failed to restore task');
      }
    });
  }

  /** ✅ Show Toast Messages */
  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({severity, summary, detail});
  }
}
