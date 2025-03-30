import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private messageService: MessageService) {
  }

  showSuccess(summary: string, detail: string) {
    // this.messageService.add({severity: 'success', summary, detail});
    this.messageService.add({severity: 'success', summary: 'Success Message', detail: detail, key: 'br', life: 3000});
  }

  showError(summary: string, detail: string) {
    this.messageService.add({severity: 'error', summary, detail});
  }

  showInfo(summary: string, detail: string) {
    this.messageService.add({severity: 'info', summary, detail});
  }

  showWarning(summary: string, detail: string) {
    console.log("Toast should appear:", {severity: 'warn', summary, detail});
    this.messageService.add({severity: 'warn', summary, detail});
  }

  clear() {
    this.messageService.clear();
  }
}
