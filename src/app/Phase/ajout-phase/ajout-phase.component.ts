import { Component, Input, OnInit, Inject } from '@angular/core';
import { PhaseService } from 'src/app/services/phase.service';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Phase } from '../Phase';
import { ProjetService } from 'src/app/services/projet.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Projet } from 'src/app/Projet/Projet';
import {  MatDialog } from "@angular/material";

@Component({
  selector: 'app-ajout-phase',
  templateUrl: './ajout-phase.component.html',
  styleUrls: ['./ajout-phase.component.scss']
})
export class AjoutPhaseComponent implements OnInit {

  phase : Phase = new Phase();
  addPhaseForm : FormGroup;
  message : any;
  projet: Projet;

  constructor(private phaseService: PhaseService, private formBuilder: FormBuilder,

    private projetService: ProjetService, @Inject(MAT_DIALOG_DATA) public data: any,
    public fenetreReference: MatDialogRef<AjoutPhaseComponent>) { }


  ngOnInit() {
    this.addPhaseForm = this.formBuilder.group({
      'titrePhase': [this.phase.nomTache,[Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-Z \u00C0-\u00FF]*$')]],
      'description': [this.phase.description,
        [Validators.minLength(3),
        Validators.maxLength(100)]],

    })
    
    this.projet = this.data.projet;
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.addPhaseForm.controls[controlName].hasError(errorName);
  }

 public ajoutPhase(){
   console.log(this.projet);
   this.phase.nomTache= this.addPhaseForm.get('titrePhase').value;
   this.phase.description = this.addPhaseForm.get('description').value;
   this.phase.projet = this.projet;
   
   let valeur = this.phaseService.addPhase(this.phase);
   valeur.subscribe((data)=>{
     if(data){
     this.message=data;
     this.onFermer();
     }

  });
  

 } 
 // FERMER
 public onFermer(){
  this.fenetreReference.close();
}



} 
