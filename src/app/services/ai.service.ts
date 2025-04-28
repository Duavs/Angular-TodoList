import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

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

    return of(randomSuggestion); // ✅ Simulate async call
  }
}
