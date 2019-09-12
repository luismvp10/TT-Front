import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'Volumen'
})
export class Volumen extends DecimalPipe implements PipeTransform {
  transform(value: any, args?: any): any {

    let result;
    result = super.transform(value, args).toString() + ' kg';
    return result;
  }

}