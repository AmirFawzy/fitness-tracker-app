import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeContext'
})
export class TimeContextPipe implements PipeTransform {

  transform(value: number): number | string {
    if (value < 10 && value != null) {
      return '0' + value.toString();
    } else if (value == null) {
      return '00';
    }
    return value;
  }

}
