import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';

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
    //
    // logOut() {
    //   localStorage.removeItem("token");
    //   this.router.navigate(['/login']);
    // }

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

  getUserId(): string | null {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        return decodedToken.sub ?? null;
      } catch (err) {
        return null;
      }
    }
    return null;
  }

}
