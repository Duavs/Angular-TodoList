import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor() {
  }

  suggestTask(currentTask: string): Observable<string> {
    // 🧠 Here you can later connect to a real API!
    const suggestions = [
      "Finalize the report",
      "Organize meeting schedule",
      "Workout for 30 minutes",
      "Read a chapter of a book",
      "Plan tasks for tomorrow"
    ];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    // Simulate an async call
    return new Observable<string>(observer => {
      setTimeout(() => {
        observer.next(randomSuggestion);
        observer.complete();
      }, 1000); // Simulate a 1 second delay
    });
  }
}
