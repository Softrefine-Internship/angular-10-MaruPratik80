import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tags',
})
export class TagsPipe implements PipeTransform {
  transform(tags: string[]): string[] {
    if (!tags || tags.length === 0) return [];
    if (tags.length > 2) return [...tags.slice(0, 2), `+${tags.length - 2}`];
    else return tags;
  }
}
