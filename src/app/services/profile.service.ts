import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  private apiUrl = 'http://localhost:5248/api/users'; // adjust if needed
  private token = localStorage.getItem("token");

  constructor(private http: HttpClient) {
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
    return this.http.get<{ firstName: string }>(`${this.apiUrl}/${userId}`)
      .pipe(
        map(response => response.firstName)
      );
  }

  getUserLastName(): Observable<string> {
    const userId = this.getUserId();
    return this.http.get<{ lastName: string }>(`${this.apiUrl}/${userId}`)
      .pipe(
        map(response => response.lastName)
      );
  }

  getUserAddress(): Observable<string> {
    const userId = this.getUserId();
    return this.http.get<{ address: string }>(`${this.apiUrl}/${userId}`)
      .pipe(
        map(response => response.address)
      );
  }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders(token ? {'Authorization': `Bearer ${token}`} : {});
    return this.http.get(`${this.apiUrl}/profile`, {headers});
  }

  // updateUserProfile(id: Number(getUsername()), userData: UserUpdateDto): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/${id}`, userData);
  // }
  updateUserProfile(id: number, updatedData: UserUpdate): Observable<UserUpdate> {
    return this.http.put<UserUpdate>(`${this.apiUrl}/${this.getUserId()}`, updatedData, this.getHeaders());
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
  // id: number;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
}

interface DecodedToken {
  sub: string;
  name: string;
  exp?: number;
  email: string;
}
