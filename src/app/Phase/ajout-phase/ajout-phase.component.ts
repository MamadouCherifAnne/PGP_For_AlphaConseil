import { Component, Input, OnInit, Inject } from '@angular/core';
import { PhaseService } from 'src/app/services/phase.service';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Phase } from '../Phase';
import { ProjetService } from 'src/app/services/projet.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Projet } from 'src/app/Projet/Projet';

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
    private projetService: ProjetService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.addPhaseForm = this.formBuilder.group({
      'titrePhase': this.phase.titrePhase,
      'description': this.phase.description
    })
    
    this.projet = this.data.projet;
  }

 public ajoutPhase(){
   console.log(this.projet);
   this.phase.projet = this.projet;
   let valeur = this.phaseService.addPhase(this.phase);
   valeur.subscribe((data)=>this.message=data);
  
 } 

} 