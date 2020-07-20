import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Tache } from '../Tache';
import {TacheService} from "src/app/services/tache.service";
import { MatDialogRef} from "@angular/material";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-update-tache',
  templateUrl: './update-tache.component.html',
  styleUrls: ['./update-tache.component.scss']
})
export class UpdateTacheComponent implements OnInit {

  niveauPriorite = {"faible": 'faible', "moyen": 'Moyen', "fort": 'Fort'};
  tache : Tache = new Tache();
  updateTacheForm: FormGroup;
  tacheAmodifier: any;
  returnMessage: any;

  constructor(private tacheService: TacheService ,private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef : MatDialogRef<UpdateTacheComponent>) { }

  ngOnInit() {
    this.updateTacheForm = this.formBuilder.group({
      "nomTache": [this.tache.nomTache,Validators.required],
      "description": this.tache.description,
      "chargeTache": this.tache.chargeTache,
      "niveauPriorite": this.tache.niveauPriorite,
      "duree": [this.tache.duree, Validators.required],
      "debutTache": [this.tache.debutTache,Validators.required],
      "finTache": [this.tache.finTache,Validators.required],
      "tauxAvancement" : [this.tache.tauxAvancement],
      "tachePrecedente": this.tache.tachePrecedente,
    })
    this.tacheAmodifier = this.data;
    console.log(this.tacheAmodifier.tache.numTache);

    this.curentForm();
  }
  formatLabel(value: number) {
    return value + '%';
  }

  updateTache(){
    this.tache.nomTache = this.updateTacheForm.get( "nomTache").value;
    this.tache.description = this.updateTacheForm.get("description").value;
    this.tache.chargeTache = this.updateTacheForm.get("chargeTache").value;
    this.tache.niveauPriorite = this.updateTacheForm.get("niveauPriorite").value;
    this.tache.duree = this.updateTacheForm.get("duree").value;
    this.tache.debutTache = this.updateTacheForm.get("debutTache").value;
    this.tache.finTache = this.updateTacheForm.get("finTache").value;
    this.tache.tauxAvancement = this.updateTacheForm.get("tauxAvancement").value;
    this.tache.tachePrecedente = this.updateTacheForm.get("tachePrecedente").value;

    let idTache = Number.parseFloat(this.tacheAmodifier.tache.numTache);

    let value = this.tacheService.updateTask(idTache, this.tache);
    value.subscribe((data)=>this.returnMessage=data);

   this.Close();
  }

  Close(){
    this.updateTacheForm.reset();
    this.dialogRef.close();
  }
  curentForm(){
    this.updateTacheForm.get("nomTache").setValue(this.tacheAmodifier.tache.nomTache);
    this.updateTacheForm.get("description").setValue(this.tacheAmodifier.tache.description);
    this.updateTacheForm.get("chargeTache").setValue(this.tacheAmodifier.tache.niveauPriorite);
    this.updateTacheForm.get("niveauPriorite").setValue(this.tacheAmodifier.tache.niveauPriorite);
    this.updateTacheForm.get("duree").setValue(this.tacheAmodifier.tache.duree);
    this.updateTacheForm.get("debutTache").setValue(this.tacheAmodifier.tache.debutTache);
    this.updateTacheForm.get("finTache").setValue(this.tacheAmodifier.tache.finTache);
    this.updateTacheForm.get("tauxAvancement").setValue(this.tacheAmodifier.tache.tauxAvancement);
    this.updateTacheForm.get("tachePrecedente").setValue(this.tacheAmodifier.tache.tachePrecedente);
  }
  
}
