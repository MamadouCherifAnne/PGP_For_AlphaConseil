import { Component, OnInit } from '@angular/core';
import { PhaseService } from 'src/app/services/phase.service';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Phase } from '../Phase';

@Component({
  selector: 'app-ajout-phase',
  templateUrl: './ajout-phase.component.html',
  styleUrls: ['./ajout-phase.component.css']
})
export class AjoutPhaseComponent implements OnInit {

  phase : Phase = new Phase();
  addPhaseForm : FormGroup;
  message : any;

  constructor(private phaseService: PhaseService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addPhaseForm = this.formBuilder.group({
      'titrePhase': this.phase.titrePhase,
      'description': this.phase.description
    })
  }

 public ajoutPhase(){
   let valeur = this.phaseService.addPhase(this.phase);
   valeur.subscribe((data)=>this.message=data);
  console.log("phase ajouter");
 } 

} 
