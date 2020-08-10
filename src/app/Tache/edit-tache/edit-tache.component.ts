import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Tache } from '../Tache';
import {TacheService} from "src/app/services/tache.service";
import {ProjetService} from 'src/app/services/projet.service';


@Component({
  selector: 'app-edit-tache',
  templateUrl: './edit-tache.component.html',
  styleUrls: ['./edit-tache.component.scss']
})
export class EditTacheComponent implements OnInit {
  niveauPriorite = {"faible": 'faible', "moyen": 'Moyen', "fort": 'Fort'};
  tache : Tache = new Tache();
  updateTacheForm: FormGroup;
  tacheAmodifier: any;
  returnMessage: any;
  projet: any;
  listTache: any;
  listPhase: any;

  @Input() public idProjet: any;
  @Input() public idTache: any;

  constructor(private tacheService: TacheService, private projetService: ProjetService,private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.updateTacheForm = this.formBuilder.group({
      "nomTache": [this.tache.nomTache,Validators.required],
      "description": this.tache.description,
      "chargeTache": this.tache.chargeTache,
      "niveauPriorite": this.tache.niveauPriorite,
      "duree": [this.tache.duree, Validators.required],
      "phase": this.tache.phase,
      "debutTache": [this.tache.debutTache,Validators.required],
      "finTache": [this.tache.finTache,Validators.required],
      "tauxAvancement" : [this.tache.tauxAvancement],
      "tachePrecedente" : [this.tache.tachePrecedente],
      
    })

    console.log("projet num "+this.idProjet);
    console.log("tache id "+this.idTache);

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

     this.projetService.AllphaseDeProjet(this.idProjet).subscribe(data=>{
       if(data){
         this.listPhase=data;

        }

     });
     this.tacheService.getTache(this.idTache).subscribe(data=>{
      if(data){
        this.tacheAmodifier = data;
        this.currentForm();
      }
    });

   
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



    let value = this.tacheService.updateTask(this.idTache, this.tache);
    value.subscribe((data)=>this.returnMessage=data);

    
  }

  currentForm(){

    this.updateTacheForm.get("nomTache").setValue(this.tacheAmodifier.nomTache);
    this.updateTacheForm.get("description").setValue(this.tacheAmodifier.description);
    this.updateTacheForm.get("chargeTache").setValue(this.tacheAmodifier.chargeTache);
    this.updateTacheForm.get("niveauPriorite").setValue(this.tacheAmodifier.niveauPriorite);
    this.updateTacheForm.get("duree").setValue(this.tacheAmodifier.duree);
    this.updateTacheForm.get("debutTache").setValue(this.tacheAmodifier.debutTache);
    this.updateTacheForm.get("finTache").setValue(this.tacheAmodifier.finTache);
    this.updateTacheForm.get("tauxAvancement").setValue(this.tacheAmodifier.tauxAvancement);
    this.updateTacheForm.get("tachePrecedente").setValue(this.tacheAmodifier.tachePrecedente);
  }



}
