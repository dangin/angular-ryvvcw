import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPlayerPipe implements PipeTransform {

  transform(value, keys: string, term: string) {
    return (value || []).filter(item => item.name.match(term));

    return null;
  }

}