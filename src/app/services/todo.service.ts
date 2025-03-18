import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  isDeleted: boolean;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5248/api/todos';

  constructor(private http: HttpClient) {
  }

  /** ✅ Fetch Only Active Todos (Not Deleted) */
  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.apiUrl}?isDeleted=false`, this.getHeaders());
  }

  addTodo(todo: TodoItem): Observable<TodoItem> {

    return this.http.post<TodoItem>(this.apiUrl, todo, this.getHeaders());
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
