import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor() { }

  form: FormGroup = new FormGroup({
     nomProjet: new FormControl(''),
     description: new FormControl(''),
	   debutProjet: new FormControl(''),
		 finProjet: new FormControl(''),
	   zoneRealisation: new FormControl('')
		
  });
}
