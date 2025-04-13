import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeago',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 1000 * 60 ){
      return 'just now';
    }

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Aproximación de 30 días por mes

    if (months > 0) {
      const remainingDays = days % 30;
      return `${months} Meses, ${remainingDays} días, ${hours % 24} horas, ${minutes % 60} minutos`;
    } else if (days > 0) {
      return `${days} días, ${hours % 24} horas, ${minutes % 60} minutos`;
    } else if (hours > 0) {
      return `${hours} horas, ${minutes % 60} minutos`;
    } else {
      return `${minutes} minutos`;
    }
  }

}
