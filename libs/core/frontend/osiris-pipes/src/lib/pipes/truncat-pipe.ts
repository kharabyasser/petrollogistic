import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxChars: number): string {
    if (value.length > maxChars) {
      return value.substring(0, maxChars) + '...';
    } else {
      return value;
    }
  }
}