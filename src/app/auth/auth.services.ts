import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {HttpClient} from '@angular/common/http';

interface DecodedToken {
  sub: string;
  name: string;
  exp?: number;
  email: string;
  aud?: string;
  iss?: string;
  jti?: string;
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
    const token = localStorage.getItem("token");
    return !!token || this.loggedIn; // Returns true if token exists or fallback to loggedIn flag
  }

  getUserId(): string | null {

    if (this.token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(this.token);
        console.log("decodedToken", decodedToken);
        return decodedToken.sub ?? null;
      } catch (err) {
        return null;
      }
    }
    return null;
  }

}

