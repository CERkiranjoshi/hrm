import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'editableColumn'
})
export class EditableColumnPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value!=undefined){
      return value.filter((key) =>{
           return key.name!='index';
      })
    }
    // return _.pullAll(_.cloneDeep(value), ['index', 'star'])
  }

}
