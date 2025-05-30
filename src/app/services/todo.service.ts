import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';


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

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // private apiUrl = 'http://localhost:5248/api/todos';
 // private apiUrl = '${environment.apiUrl}/api/todos';
  private readonly apiUrl: string = `${environment.apiUrl}/api/todos`;

  constructor(private http: HttpClient) {
  }
  getTodosWithAuth(): Observable<TodoItem[]> {
    const token = localStorage.getItem('token');
    console.log('Token sent in header:', token);
    return this.http.get<TodoItem[]>(`${this.apiUrl}?isDeleted=false`, this.getHeaders());
  }

  /** ✅ Fetch Only Active Todos (Not Deleted) */
  getTodos(): Observable<TodoItem[]> {
    console.log(this.getHeaders());
    return this.http.get<TodoItem[]>(`${this.apiUrl}?isDeleted=false`, this.getHeaders());
  }

  addTodo(todo: TodoItem): Observable<TodoItem> {
    console.log("📦 Adding new task:", todo);
    return this.http.post<TodoItem>(this.apiUrl, todo, this.getHeaders()).pipe(
      catchError((error) => {
        console.error("❌ Failed to add task:", error);
        throw error;
      })
    );
  }

  updateTodo(todo: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.apiUrl}/${todo.id}`, todo, this.getHeaders());
  }

  softDeleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  //Helper to Get Headers with Token
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders(
        token ? {'Authorization': `Bearer ${token}`} : {} // Handle null token
      )
    };
  }
}
