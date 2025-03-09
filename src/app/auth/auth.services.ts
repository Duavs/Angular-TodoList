import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false; // Tracks login state

  login(): boolean {
    this.loggedIn = true; // Marks user as logged in
    return true;
  }

  logout(): void {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      this.loggedIn = false;

    }

  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("isAuthenticated true! here is token: ", token);
      return true;
    } else {
      return this.loggedIn;   // Returns login status
    }

  }
}
