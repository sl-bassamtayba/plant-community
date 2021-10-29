import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'SimpleGenericFilter'
})
export class SimpleGenericFilterPipe implements PipeTransform {

  static normalize(str: string) {
    // NFD : è ==> e + `
    // U+0300 → U+036F : all special chars
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  static filter(source: string, target: string, method: Method): boolean {
    switch (method) {
      case 'includes' :
        return source.includes(target);
      case 'equal'  :
        return source === target;
      case 'not-equal' :
        return source !== target;
    }
  }

  transform(arr: any[], prop: string, value: string, method: Method): any {
    if (arr) {
      if (!prop || prop === '' || !value || value === '') {
        return arr;
      } else {
        return arr.filter(obj => {
          return SimpleGenericFilterPipe.filter(
            SimpleGenericFilterPipe.normalize(obj[prop]),
            SimpleGenericFilterPipe.normalize(value),
            method);
        });
      }
    } else {
      return [];
    }
  }
}

type Method = 'includes' | 'equal' | 'not-equal';
