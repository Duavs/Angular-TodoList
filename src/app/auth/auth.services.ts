import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';

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
    // const token = localStorage.getItem("token");
    if (this.token) {
      return true;
    } else {
      return this.loggedIn;   // Returns login status
    }
  }

  getUserId(): string | null {
    // const token = localStorage.getItem("token");
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
}
