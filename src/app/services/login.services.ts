import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:5248/api/users/login'; // Update with actual API URL

  constructor(private http: HttpClient) {
  }

  loginUser(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, loginData);
  }
}


