import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TodoService} from '../services/todo.service';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../auth/auth.services';
import {ProfileService} from '../services/profile.service';
import {NotificationService} from '../services/notification.services';
import {Toast} from 'primeng/toast';
import {MessageModule} from 'primeng/message';
import {MessageService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {AiService} from '../services/ai.service'
import {AdviceService} from '../services/advice.service';
export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  isDeleted: boolean;
  userId?: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, Toast, MessageModule, ButtonModule, RippleModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})

export class HomeComponent {
  title = 'Todo List';
  todoList: TodoItem[] = [];
  paginatedTodos: TodoItem[] = [];
  newTask: string = '';
  editingTaskId: number | null = null;
  editedTask: string = '';
  username: string = '';
  advice: string = '';
  //Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5; // Show 5 task per page
  totalPages: number = 1;
  pages: number[] = [];
  private adviceInterval: any;

  constructor(private todoService: TodoService,
              private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService,
              private profileService: ProfileService,
              private aiService: AiService,
              private adviceService: AdviceService
  ) {}


  // get username(): string | null {
  //   return this.profileService.Username();
  //
  // }
  fetchAdvice() {
    this.adviceService.getAdvice().subscribe({
      next: (advice) => {
        this.newTask = advice;
      },
      error: (err) => {
        console.error('Error fetching advice:', err);
      }
    });
  }
  suggestTask(): void {
    const query = this.newTask.trim().toUpperCase() || "task";

    this.aiService.suggestTask(this.newTask).subscribe({
      next: (suggested) => {
        this.newTask = suggested; // Pre-fill task input
        console.log('AI suggested task:', suggested);
      },
      error: (err) => {
        console.error('Failed to fetch suggestion', err);
      }
    });
  }

  getUserName() {
    this.profileService.getUsername().subscribe({
      next: (userName: string) => this.username = userName,
      error: (err) => console.error('Failed to fetch user name:', err)
    });
  }
  scheduleAdvice() {
    this.fetchAdvice(); // First call
    this.adviceInterval = setTimeout(() => {
      this.scheduleAdvice(); // Recursively schedule next fetch
    }, 10000);
  }
  ngOnInit() {
    console.log('HomeComponent Loaded');
    this.checkAuthenticationf();
    this.isAuthenticated();
    this.fetchTodos();
    this.getUserName();
    this.fetchAdvice();
    this.scheduleAdvice();
  }
  ngOnDestroy() {
    if (this.adviceInterval) {
      clearTimeout(this.adviceInterval); // use clearTimeout instead
    }
  }

  checkAuthenticationf() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout(); // Clear login state
    this.router.navigate(['/login']); // Redirect to login page
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }


  // updatePagination() {
  //   this.totalPages = Math.ceil(this.todoList.length / this.itemsPerPage);
  //   this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
  //   this.paginate();

  fetchTodos() {
    const userId = Number(this.authService.getUserId());
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        const activeTodos = todos.filter(todo => !todo.isDeleted && todo.userId == userId);

        // Update total pages
        this.totalPages = Math.max(1, Math.ceil(activeTodos.length / this.itemsPerPage));

        // Prevent invalid page number
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }
        if (this.currentPage < 1) {
          this.currentPage = 1;
        }

        // Slice tasks based on the current page
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.todoList = activeTodos.slice(startIndex, endIndex);

        console.log("Current Page:", this.currentPage);
        console.log("Fetched Todos:", this.todoList);
      },
      error: (err) => {
        console.error('Error fetching todos:', err);
      }
    });
  }

  // }
  generatePages() {
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTodos = this.todoList.slice(start, end);
  }

  // Move to the previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchTodos();
    }
  }

  // Move to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchTodos();
    }
  }

  // Go to a specific page
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchTodos();
    }
  }

  notify() {
    this.notificationService.showWarning('Warning!', 'Something needs attention.');
  };

  addTask(): void {
    const lengthRegex = /^.{3,100}$/;
    const allowdCharsRegex = /^[a-zA-Z0-9\s.,!?'-]+$/;
    const bannedWords = ['stupid', 'idiot'];
    const banneWordsRegex = new RegExp(`\\b(${bannedWords.join('|')})\\b`, 'i');

    if (!this.newTask.trim()) {
      this.notificationService.showWarning("warning", "Cannot save empty task.");
      console.log(this.notificationService.showWarning);
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
    const userId = Number(this.authService.getUserId());
    if (!userId || isNaN(userId)) {
      console.error('User ID is invalid:', userId);
      return;
    }


    const newTaskItem: TodoItem = {
      id: 0,
      task: this.newTask.toUpperCase(),
      completed: false,
      isDeleted: false,
      userId: userId
    };

    this.todoService.addTodo(newTaskItem).subscribe({
      next: () => {
        this.newTask = '';
        this.notificationService.showSuccess('Success', 'Task added successfully.');
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
    const lengthRegex = /^.{2,100}$/;
    this.editedTask = todo.task;

    if (this.editedTask.trim() == '') {
      alert('Task cannot be empty');
      this.editingTaskId = null;
      this.fetchTodos();
      return;
    }
    if (!lengthRegex.test(this.editedTask)) {
      alert('Task cannot be less than 2 characters');
      this.editingTaskId = null;
      this.fetchTodos();
      return;
    }
    this.editingTaskId = todo.id;
    this.editedTask = todo.task.toUpperCase();
    const updatedTask: TodoItem = {...todo, task: this.editedTask};
    console.log(updatedTask);
    this.todoService.updateTodo(updatedTask).subscribe({
      next: () => {
        console.log('Updated task:', updatedTask);
        this.editingTaskId = null;
        this.editedTask = '';
        this.fetchTodos();
      },
      error: (err) => {
        console.error('Error adding task:', err);
      }
    })
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
    if (todoItem.completed) {
      todoItem.isDeleted = true;
      this.todoService.softDeleteTodo(todoItem.id).subscribe({
          next: () => {
            this.fetchTodos(); // ⬅ Ensure deleted tasks disappear immediately
            //  this.showMessage('warn', 'Task Deleted', 'Successfully deleted!');
          },
          error:
            (err) => {
              console.error('Error deleting task:', err);
              //   this.showMessage('error', 'Error', 'Failed to delete task');
            }
        }
      )
    }
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
