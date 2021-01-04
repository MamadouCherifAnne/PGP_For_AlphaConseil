import { Pipe, PipeTransform } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

// L'accesseur au pipe date
@Pipe({
    name: 'alfapgpformatNumber'
})
export  class PgpDatePipe implements PipeTransform{

    transform(value:number):string{
        return this.formaterNumbre(value);
    }

    public formaterNumbre(nbr:number):string{
        let resultat = nbr.toLocaleString();
        console.log(nbr +" sexprime comm ca apres formatage :++"+resultat)
        return resultat;
      }
}