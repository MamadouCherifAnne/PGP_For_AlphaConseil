
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive, Input} from '@angular/core';

@Directive({
    selector: '[debutProjet]',
    providers: [{provide:NG_VALIDATORS, useExisting:'', multi:true}]
})

export class EndDateValidation implements Validator{

    @Input('debutProjet') shoulbeLess: any;
    validate(control: AbstractControl):{[key:string]: any} | null
     {
        const sDate = new Date(this.shoulbeLess);
        const eDate = new Date(control.value);

        return (sDate > eDate)?{'StartedDateIsMore': true}: null;
    }
}