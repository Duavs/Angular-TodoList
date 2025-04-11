import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:5248/api/users'; // adjust if needed

  constructor(private http: HttpClient) {
  }

  updateUserProfile(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(token ? {'Authorization': `Bearer ${token}`} : {});
    return this.http.put(`${this.apiUrl}/profile`, data, {headers});
  }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(token ? {'Authorization': `Bearer ${token}`} : {});
    return this.http.get(`${this.apiUrl}/profile`, {headers});
  }
}
