import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Tache } from 'src/app/Tache/Tache';
import {TacheService} from "src/app/services/tache.service";
import {ProjetService} from 'src/app/services/projet.service';
import {PhaseService} from 'src/app/services/phase.service';

@Component({
  selector: 'app-ajout-tache-second',
  templateUrl: './ajout-tache-second.component.html',
  styleUrls: ['./ajout-tache-second.component.scss']
})
export class AjoutTacheSecondComponent implements OnInit {
  niveauPriorite = {"faible": 'faible', "moyen": 'Moyen', "fort": 'Fort'};
  tache : Tache = new Tache();
  AjoutTacheSecndForm: FormGroup;
  AjoutMessage: any;
  projet: any;
  listTache: any;
  newPhase: any;

  @Input() public idProjet: any;
  @Input() public idPhase: any;

  constructor(private tacheService: TacheService, private projetService: ProjetService,
     private formBuilder: FormBuilder, private phaseService: PhaseService ) { }

  ngOnInit() {
    this.AjoutTacheSecndForm = this.formBuilder.group({
      "nomTache": [this.tache.nomTache,Validators.required],
      "description": this.tache.description,
      "chargeTache": this.tache.chargeTache,
      "niveauPriorite": this.tache.niveauPriorite,
      "duree": [this.tache.duree, Validators.required],
      "debutTache": [this.tache.debutTache,Validators.required],
      "finTache": [this.tache.finTache,Validators.required],
      "tauxAvancement" : [this.tache.tauxAvancement],
      "tachePrecedente" : [this.tache.tachePrecedente],
    })  

      //......................Recuperation du projet par son id.....................
   this.projetService.getById(this.idProjet).subscribe(data=>{
    if(data){
      this.projet=data;
     }
   });

   //...................Recuperation de la liste de tache d'un projet....................
   this.projetService.projectAllTask(this.idProjet).subscribe(data=>{
     if(data){
       this.listTache=data;}
     });

    this.phaseService.findById(this.idPhase).subscribe(data=>{
      if(data){
        this.newPhase=data;
      }
    })
      
  }

  formatLabel(value: number) {
    return value + '%'; 
  }

  Ajouter(){
    console.log("fof"+this.idProjet);
    console.log("fif"+this.newPhase);
    this.tache.phase = this.newPhase;
    let val = this.tacheService.ajoutTache(this.tache);
    val.subscribe((data)=>this.AjoutMessage = data);
    //..............................................
    this.AjoutTacheSecndForm.reset();
  }

}
