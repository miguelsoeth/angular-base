import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDateWithTime'
})
export class CustomDateWithTimePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const date = new Date(value);
    const formattedDate = new DatePipe('en-US').transform(date, 'dd/MM/yyyy HH:mm');
    return formattedDate;
  }
}

@Pipe({
    name: 'customDate'
  })
  export class CustomDatePipe implements PipeTransform {
    transform(value: string): string {
      if (!value) return '';
  
      const date = new Date(value);
      const formattedDate = new DatePipe('en-US').transform(date, 'dd/MM/yyyy');
      return formattedDate;
    }
  }
