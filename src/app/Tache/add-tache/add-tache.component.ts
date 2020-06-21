import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from "@angular/material";
import {TacheService} from "src/app/services/tache.service";
import { Tache } from '../Tache';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.css']
})
export class AddTacheComponent implements OnInit {
  tache : Tache = new Tache();
  ajoutTacheForm: FormGroup;
  message: any;
  constructor(private tacheService: TacheService ,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ajoutTacheForm = this.formBuilder.group({
      "nomTache": [this.tache.nomTache,Validators.required],
      "chargeTache": this.tache.chargeTache,
      "niveauPriorite": this.tache.niveauPriorite,
      "duree": [this.tache.duree, Validators.required],
      "debutTache": [this.tache.debutTache,Validators.required],
      "finTache": [this.tache.finTache,Validators.required],
      "tauxAvancement" : [this.tache.tauxAvancement],
    })
  }

  ajoutTache(){
    console.log("tout va bien");
    let val = this.tacheService.ajoutTache(this.tache);
    val.subscribe((data)=>this.message=data);
  }

}
