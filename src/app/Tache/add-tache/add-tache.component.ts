import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { MatDialogRef, MatDialog } from "@angular/material";
import {TacheService} from "src/app/services/tache.service";
import { Tache } from '../Tache';
import { from } from 'rxjs';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Utilisateur } from 'src/app/Utilisateur/Utilisateur';

@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.scss']
})
export class AddTacheComponent implements OnInit {
  niveauPriorite = {"faible": 'faible', "moyen": 'Moyen', "fort": 'Fort'};
  tache : Tache = new Tache();
  ajoutTacheForm: FormGroup;
  message: any;
  allPhases: any;
  allTaches: any;
  currentUser:object;

  constructor(private tacheService: TacheService ,private formBuilder: FormBuilder,
    public authService:AuthentificationService,
    private dialogRef : MatDialogRef<AddTacheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.allPhases = this.data.listPhases;
    this.allTaches = this.data.listTaches;
    this.currentUser = this.authService.getObjectUserConnected();

    this.ajoutTacheForm = this.formBuilder.group({
      "nomTache": [this.tache.nomTache,[Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern( '^[a-zA-Z \u00C0-\u00FF]*$')]],
      "description": [this.tache.description, Validators.maxLength(100)],
      "chargeTache": [this.tache.chargeTache],
      "niveauPriorite": this.tache.niveauPriorite,
      "duree": [this.tache.duree, Validators.required],
      "debutTache": [this.tache.debutTache,Validators.required, this.dateValidator],
      "finTache": [this.tache.finTache,Validators.required, this.dateValidator],
      "tauxAvancement" : [this.tache.tauxAvancement],
      "phase": this.tache.phase,
      "tachePrecedente": this.tache.tachePrecedente,

    })
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.ajoutTacheForm.controls[controlName].hasError(errorName);
  }
 
 //Verification du date format 
  dateValidator(c: AbstractControl): { [key: string]: boolean } {
    let value = c.value;
    if (value && typeof value === "string") {
      let match = value.match(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
      if (!match) {
        return { 'dateInvalid': true };
      } else if (match && match[0] !== value) {
        return { 'dateInvalid': true };
      }
    }
    return null;
  }
  
  ajoutTache(){
    console.log(this.allPhases);
    //console.log(this.allTaches);
    console.log("tout va bien");
    this.tache.createur = this.currentUser;
    window.alert("le createur est "+this.currentUser);
    let val = this.tacheService.ajoutTache(this.tache);

    val.subscribe((data)=>{
      if(data){
      this.message=data;
    this.onClose();
      }
    });

  }

  formatLabel(value: number) {
    return value + '%';
  }


  onClose(){
    this.ajoutTacheForm.reset();
    this.dialogRef.close();
  }


}
