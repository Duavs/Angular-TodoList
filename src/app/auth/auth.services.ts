import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {HttpClient} from '@angular/common/http';

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

}

