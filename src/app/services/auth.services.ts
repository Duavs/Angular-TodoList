import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = 'http://localhost:5248/api/users'; // ✅ Ensure baseUrl is a class property

  constructor(private http: HttpClient) {
  }

  // ✅ Login User
  loginUser(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, loginData);
  }

  // ✅ Sign Up User
  signupUser(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, userData);
  }
}
