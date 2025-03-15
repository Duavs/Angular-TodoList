import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = 'http://localhost:5248/api/users'; // ✅ Ensure baseUrl is a class property

  constructor(private http: HttpClient, private router: Router) {
  }

  // ✅ Login User
  loginUser(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, loginData);
  }

  // ✅ Sign Up User
  signupUser(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, userData);
  }

  //check if token is expired
  isTokenExpired(): boolean {
    const token = localStorage.getItem("token");
    if (!token) return true;

    const decodedToken: any = jwtDecode(token);
    return decodedToken.exp * 1000 < Date.now();
  }

  //logout if token expires
  logoutIfExpired() {
    if (this.isTokenExpired()) {
      this.router.navigate(['/login']);
    }
  }

  // logOut() {
  //   localStorage.removeItem("token");
  //   this.router.navigate(['/login']);
  // }
}
