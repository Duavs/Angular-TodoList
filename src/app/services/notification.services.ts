import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private messageService: MessageService) {
  }

  private notify(severity: 'success' | 'error' | 'info' | 'warn', summary: string, detail: string, life: number = 3000): void {
    this.messageService.add({ severity, summary, detail, key: 'br', life });
  }

  showSuccess(summary: string, detail: string): void {
    this.notify('success', summary, detail);
  }

  showError(summary: string, detail: string): void {
    this.notify('error', summary, detail);
  }

  showInfo(summary: string, detail: string): void {
    this.notify('info', summary, detail);
  }

  showWarning(summary: string, detail: string): void {
    this.notify('warn', summary, detail);
  }

  clear() {
    this.messageService.clear();
  }
}
