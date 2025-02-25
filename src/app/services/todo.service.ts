import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  isDeleted: boolean;
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
    return this.http.get<TodoItem[]>(`${this.apiUrl}?isDeleted=false`);
  }

  addTodo(todo: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.apiUrl, todo);
  }

  updateTodo(todo: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.apiUrl}/${todo.id}`, todo);
  }

  softDeleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
