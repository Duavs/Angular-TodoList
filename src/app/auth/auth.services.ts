import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface DecodedToken {
  sub: string;
  name: string;
  exp?: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedIn = false; // Tracks login state
  private token = localStorage.getItem("token");
  private baseUrl: string = 'http://localhost:5248/api/users';

  constructor(private http: HttpClient) {
  }


  login(): boolean {
    this.loggedIn = true; // Marks user as logged in
    return true;
  }

  logout(): void {
    // const token = localStorage.getItem("token");
    if (this.token) {
      localStorage.removeItem("token");
      this.loggedIn = false;

    }
  }

  isAuthenticated(): boolean {
    if (this.token) {
      return true;
    } else {
      return this.loggedIn;   // Returns login status
    }
  }

  getUserId(): string | null {

    if (this.token) {
      try {
        const decodedToken = jwtDecode(this.token);
        return decodedToken.sub ?? null;
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  getUsername(): string | null {
    // const token = localStorage.getItem("token");
    if (this.token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(this.token);
        return decodedToken.name ?? null; // Ensure the key is lowercase
      } catch (err) {
        console.error("Error decoding token:", err);
        return null;
      }
    }
    return null;
  }

  getUserEmail(): string | null {
    if (this.token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(this.token);
        return decodedToken.email ?? null;
      } catch (err) {
        console.error("Error decoding token:", err);
        return null;
      }
    }
    return null;
  }

  getUserFirstName(): Observable<string> {
    const userId = this.getUserId();
    return this.http.get<{ firstName: string }>(`${this.baseUrl}/${userId}`)
      .pipe(
        map(response => response.firstName)
      );
  }

  getUserLastName(): Observable<string> {
    const userId = this.getUserId();
    return this.http.get<{ lastName: string }>(`${this.baseUrl}/${userId}`)
      .pipe(
        map(response => response.lastName)
      );
  }

  getUserAddress(): Observable<string> {
    const userId = this.getUserId();
    return this.http.get<{ address: string }>(`${this.baseUrl}/${userId}`)
      .pipe(
        map(response => response.address)
      );
  }

  updateUserProfile(updatedData: UserUpdate): Observable<any> {
    const userId = this.getUserId();
    return this.http.put(`${this.baseUrl}/${userId}`, updatedData, this.getHeaders());
  }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders(
        token ? {'Authorization': `Bearer ${token}`} : {} // Handle null token
      )
    };
  }
}

export interface UserUpdate {
  id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
}
