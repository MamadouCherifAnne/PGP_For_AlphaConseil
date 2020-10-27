import { Pipe, PipeTransform } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

// L'accesseur au pipe date
@Pipe({
    name: 'pgpDatePipe'
})
export  class PgpDatePipe implements PipeTransform{

    transform(value:string):string{
        return "bay";
    }
}