import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
      "nomTache": [this.tache.nomTache,Validators.required],
      "description": this.tache.description,
      "chargeTache": this.tache.chargeTache,
      "niveauPriorite": this.tache.niveauPriorite,
      "duree": [this.tache.duree, Validators.required],
      "debutTache": [this.tache.debutTache,Validators.required],
      "finTache": [this.tache.finTache,Validators.required],
      "tauxAvancement" : [this.tache.tauxAvancement],
      "phase": this.tache.phase,
      "tachePrecedente": this.tache.tachePrecedente,

    })
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
