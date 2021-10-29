import {Pipe, PipeTransform} from '@angular/core';
import {Plant} from '../models/plant';

@Pipe({
  name: 'PlantsFilterPipe'
})
export class PlantsFilterPipe implements PipeTransform {

  transform(plants: Plant[], value: string): any {
    if (plants) {
      if (!value || value === '') {
        return plants;
      } else {

        return plants.filter(p => {
          return this.normalize(p.getSearchValue()).search(this.normalize(value)) !== -1;
        });
      }
    } else {
      return [];
    }
  }

  private normalize(str : string) {
    // NFD : è ==> e + `
    // U+0300 → U+036F : all special chars
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
