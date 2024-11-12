import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size',
})
export class SizePipe implements PipeTransform {
  transform(size: number): string {
    if (size < 1000) return size + ' bytes';
    return this.format(size / 1000, 1);
  }

  format(num: number, i: number): string {
    let unit = '';
    switch (i) {
      case 1:
        unit = ' KB';
        break;
      case 2:
        unit = ' MB';
        break;
      case 3:
        unit = ' GB';
        break;
    }

    const size = num;
    if (size < 1000) {
      return size.toFixed(2) + unit;
    }
    return this.format(size / 1000, ++i);
  }
}
