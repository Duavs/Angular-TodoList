import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdviceService {
  private apiUrl = 'http://localhost:5248/api/advice';

  constructor(private http: HttpClient) { }

  getAdvice(): Observable<string> {
    return this.http.get<{advice: string}>(this.apiUrl).pipe(
      map(response => response.advice)
    );
  }
}
