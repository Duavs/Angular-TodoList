import {AfterViewChecked, AfterViewInit, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TodoService} from '../services/todo.service';
import {CommonModule} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from '../auth/auth.services';
import {ProfileService} from '../services/profile.service';
import {NotificationService} from '../services/notification.services';
import {Toast} from 'primeng/toast';
import {MessageModule} from 'primeng/message';
import {MessageService, ConfirmationService} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {AiService} from '../services/ai.service'
import {AdviceService} from '../services/advice.service';
import {SidebarComponent} from '../shared/sidebar/sidebar.component';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {Calendar} from 'primeng/calendar';
import {Skeleton} from 'primeng/skeleton';
import {FloatLabel} from 'primeng/floatlabel';
import {PaginatorModule} from 'primeng/paginator';
import {ConfirmPopup, ConfirmPopupModule} from 'primeng/confirmpopup';
import {Title} from '@angular/platform-browser';
import {DropdownModule} from 'primeng/dropdown';
import {TruncatePipe} from '../pipes/truncate.pipe';
import {Tooltip} from 'primeng/tooltip';

export interface TodoItem {
  id: number;
  task: string;
  taskDetail: string;
  completed: boolean;
  isDeleted: boolean;
  startDate: Date;
  endDate: Date;
  userId?: number;
  taskTypeId?: number;
  taskSeverityId?: number;
  taskStatusId?: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TruncatePipe, Skeleton, FormsModule, CommonModule, RouterModule, Toast, MessageModule, ButtonModule, RippleModule, SidebarComponent, Dialog, InputText, Textarea, Calendar, FloatLabel, PaginatorModule, ConfirmPopup, DropdownModule, Tooltip],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService, ConfirmationService],
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  title = 'Home';
  todoList: TodoItem[] = [];
  paginatedTodos: TodoItem[] = [];
  allTodos: TodoItem[] = [];
  newTask: string = '';
  taskDetail: string = '';
  editingTaskId: number | null = null;
  editedTask: string = '';
  username: string = '';
  advice: string = '';
  //Pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;
  pages: number[] = [];
  private adviceInterval: any;
  //modal
  newTaskModalVisible = false;
  // startDate: Date = new Date();
  // endDate: Date = new Date();
  minDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  taskStartDate: any;
  taskEndDate: any;
  //search
  searchQuery: string = '';
  //filter
  filterOptions = [
    {label: 'Default', value: 'all'},
    {label: 'Ongoing', value: 'ongoing'},
    {label: 'Start Date', value: 'startDate'},
    {label: 'Personal', value: 'p-task'},
    {label: 'Work', value: 'w-task'},
  ];
  selectedFilter: string = 'All';
  //tagged as work or personal
  taskTypeTagOptions = [
    {label: 'Personal', value: 'p-task'},
    {label: 'Work', value: 'w-task'},
  ];
  selectedTaskTypeTag: string = '';
  //task priority
  taskPriorityOptions = [
    {label: 'Low', value: 'low'},
    {label: 'Normal', value: 'normal'},
    {label: 'High', value: 'high'},
    {label: 'Urgent', value: 'urgent', styleClass: 'urgent-task'},
  ];
  selectedTaskPriority: string = 'clear';

  constructor(private todoService: TodoService,
              private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService,
              private profileService: ProfileService,
              private aiService: AiService,
              private adviceService: AdviceService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private titleService: Title
  ) {
  }

  // get username(): string | null {
  //   return this.profileService.Username();
  //

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.checkAuthentication();
    this.isAuthenticated();
    this.getUserName();
    this.fetchTodos();
     console.log(this.todoList.length);
  }

  ngAfterViewInit() {
    this.messageService.add({severity: 'info', summary: 'Info', detail: 'Welcome Back!', life: 2000});
    // this.scheduleAdvice();
    this.fetchTodos();

    // Initialize with 'All' filter
  }

  ngAfterViewChecked() {
    this.onFilterChange({value: this.selectedFilter});
  }

  ngOnDestroy() {
    if (this.adviceInterval) {
      clearTimeout(this.adviceInterval); // use clearTimeout instead
    }
  }

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


  checkAuthentication() {
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
     console.log(' ID:', userId);
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        const activeTodos = todos.filter(todo => !todo.isDeleted && todo.userId == userId);
        this.allTodos = todos.filter(todo => !todo.isDeleted && todo.userId == userId && !todo.completed);
        console.log("Active todo ", activeTodos);
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

        // console.log("Current Page:", this.currentPage);
        // console.log("Fetched Todos:", this.todoList);
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
      console.log('Current Page:', this.currentPage);
      this.fetchTodos();
    }
  }

  notify() {
    this.notificationService.showWarning('Warning!', 'Something needs attention.');
  };

  // formatLocalDate(date: Date): Date {
  //   const normalized = new Date(date);
  //   normalized.setDate(normalized.getDate() + 1); // Add 1 day
  //   normalized.setHours(0, 0, 0, 0); // Normalize time to midnight
  //   return normalized;
  // }

  formatDateTime(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

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
    this.taskStartDate = this.formatDateTime(this.taskStartDate);
    this.taskEndDate = this.formatDateTime(this.taskEndDate);

    const newTaskItem: TodoItem = {
      id: 0,
      task: this.newTask.toUpperCase(),
      completed: false,
      // createdAt: new Date(),
      isDeleted: false,
      userId: userId,
      taskDetail: this.taskDetail?.trim() || '',
      startDate: this.taskStartDate,
      endDate: this.taskEndDate,
      taskTypeId: this.selectedTaskTypeTag === "p-task" ? 1 : 2,
      taskSeverityId: {low:1, normal:2, high:3, urgent:4}[this.selectedTaskPriority] ?? 2,
      taskStatusId: this.selectedTaskPriority === "ongoing" ? 1 : 1
    };
    console.log(newTaskItem);
    this.todoService.addTodo(newTaskItem).subscribe({
      next: () => {
        this.todoList.unshift(newTaskItem);
        this.newTask = '';
        this.taskDetail = '';
        this.selectedTaskTypeTag = 'Tagged as';
        this.selectedTaskPriority = 'clear';
        this.messageService.add({severity: 'success', summary: 'Info', detail: 'Message Content', life: 3000});
        this.notificationService.showSuccess('Success', 'Task added successfully.');
        this.fetchTodos(); // ⬅ Refresh data after adding
        //this.showMessage('success', 'Task Added', 'Successfully added!');
      },
      error: (err) => {
        console.error('❌ Failed to add new task. Please verify the API endpoint and request body.');
        console.error('Task Data Sent:', newTaskItem);
        console.error('Server Error:', err);
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
    console.log(todoItem.completed);
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

  softdeleteTask(event: Event, todoItem: TodoItem) {
    if (event.type == 'click') {

      this.confirmationService.confirm({
        target: event.target as HTMLElement,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
          this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000});
          todoItem.isDeleted = true;
          this.todoService.softDeleteTodo(todoItem.id).subscribe({
            next: () => {
              this.fetchTodos();
            },
            error: (err) => {
              console.error('Error deleting task:', err);
              //   this.showMessage('error', 'Error', 'Failed to delete task');
            }
          })
        },
        reject: () => {
          this.messageService.add({severity: 'information', summary: '', detail: 'Task is retained', life: 3000});
        }
      });
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

  openNewTaskModal() {
    this.newTaskModalVisible = true;
  }

  get filteredTodoList() {
    const result = !this.searchQuery.trim()
      ? this.todoList
      : this.allTodos.filter(todo =>
        todo.task.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    // console.log('Filtered Todos:', result);
    return result;
  }

  onFilterChange(event: any) {
    const selectedValue = event.value; // Get the selected filter value from the dropdown event

    if (selectedValue === 'startDate') {
      // Sort the todo list by start date in ascending order
      this.sortByStartDate(this.todoList);
    } else if (selectedValue === 'ongoing') {
      // Sort the todo list by completion status (incomplete first)
      this.sortByDateCompletion(this.todoList);
    } else if (selectedValue === 'all') {
      // Reset and re-fetch all todos from the backend
      this.fetchTodos();
    }
  }

  sortByStartDate(todos: TodoItem[]): TodoItem[] {
    return todos.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }

  sortByDateCompletion(todos: TodoItem[]): TodoItem[] {
    return todos.sort((a, b) => Number(a.completed) - Number(b.completed));
  }

}
