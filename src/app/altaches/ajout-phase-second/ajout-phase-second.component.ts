
import { Component, Input, OnInit, Inject } from '@angular/core';
import { PhaseService } from 'src/app/services/phase.service';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Phase } from 'src/app/Phase/Phase';
import { ProjetService } from 'src/app/services/projet.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Projet } from 'src/app/Projet/Projet';
import {  MatDialog } from "@angular/material";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-ajout-phase-second',
  templateUrl: './ajout-phase-second.component.html',
  styleUrls: ['./ajout-phase-second.component.scss']
})
export class AjoutPhaseSecondComponent implements OnInit {

  phase : Phase = new Phase();
  addPhaseForm : FormGroup;
  message : any;
  projet: Projet;

  constructor(private phaseService: PhaseService, private formBuilder: FormBuilder,

    private projetService: ProjetService, @Inject(MAT_DIALOG_DATA) public data: any,
    public fenetreReference: MatDialogRef<AjoutPhaseSecondComponent>
    ) { }


  ngOnInit() {
    this.addPhaseForm = this.formBuilder.group({
      'titrePhase': this.phase.nomTache,
      'description': this.phase.description  
    })
    
    this.projet = this.data.projet;
  }

 public ajoutPhase(){
   console.log(this.projet);
   this.phase.projet = this.projet;
   let valeur = this.phaseService.addPhase(this.phase);
   valeur.subscribe((data)=>this.message=data);

   this.onFermer();
 } 
 // FERMER
 public onFermer(){
  this.fenetreReference.close();
}



}
