import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Tache } from '../Tache';
 import { ITache } from '../ITache';
import {TacheService} from "src/app/services/tache.service";
import {ProjetService} from 'src/app/services/projet.service';
import {PhaseService} from 'src/app/services/phase.service';


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
  taskPredecessor:ITache[];
  projet: any;
  listTache: any;
  listPhase: any
  potentielTaskPreced:any


  newPhase: any;

  @Input() public idProjet: any;
  @Input() public idTache: any;
  @Input() public idPhase: any;

  constructor(private tacheService: TacheService, private projetService: ProjetService,private formBuilder: FormBuilder
   , private phaseService: PhaseService) { }

  ngOnInit() {
    this.updateTacheForm = this.formBuilder.group({
      "nomTache": [this.tache.nomTache,[Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern( '^[a-zA-Z \u00C0-\u00FF]*$')]],
      "description": [this.tache.description, Validators.maxLength(100)],
      "chargeTache": this.tache.chargeTache,
      "niveauPriorite": this.tache.niveauPriorite,
      "duree": [this.tache.duree, Validators.required],
      "debutTache": [this.tache.debutTache, [Validators.required, this.dateValidator]],
      "finTache": [this.tache.finTache,[Validators.required, this.dateValidator]],
      "tauxAvancement" : [this.tache.tauxAvancement],
      "tachePrecedente" : [this.taskPredecessor],
      
    })

    console.log("projet num "+this.idProjet);
    console.log("tache id "+this.idTache);

    //......................Recuperation du projet par son id.....................
   this.projetService.getById(this.idProjet).subscribe(data=>{
     if(data){
       this.projet=data;
      }
    });

    this.refresh()
    /*...................Recuperation de la liste de tache d'un projet....................
    this.projetService.projectAllTask(this.idProjet).subscribe(data=>{
=======
    //...................Recuperation de la liste de tache d'un projet....................
    this.tacheService.getPotentielPredecesseurs(this.idTache).subscribe(data=>{

      if(data){
        this.listTache=data;
        // toutes les taches sauf la tache
      }
      }); */

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

    this.phaseService.findById(this.idPhase).subscribe(data=>{
      if(data){
        this.newPhase=data;
      }
    })

    
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.updateTacheForm.controls[controlName].hasError(errorName);
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

  refresh(){
     //...................Recuperation de la liste de tache d'un projet....................
     this.projetService.projectAllTask(this.idProjet).subscribe(data=>{
      if(data){
        this.listTache=data;
        // toutes les taches sauf la tache
      }
      });
  }

  formatLabel(value: number) {
    return value + '%';
  }

 //Modification du fichier 
  updateTache(){
    this.tache.numTache=this.idTache; 
    this.tache.phase = this.newPhase;
    this.tache.nomTache = this.updateTacheForm.get( "nomTache").value;
    this.tache.description = this.updateTacheForm.get("description").value;
    this.tache.chargeTache = this.updateTacheForm.get("chargeTache").value;
    this.tache.niveauPriorite = this.updateTacheForm.get("niveauPriorite").value;
    this.tache.duree = this.updateTacheForm.get("duree").value;
    this.tache.debutTache = this.updateTacheForm.get("debutTache").value;
    this.tache.finTache = this.updateTacheForm.get("finTache").value;
    this.tache.tauxAvancement = this.updateTacheForm.get("tauxAvancement").value;

    this.tache.tachePrecedente = this.taskPredecessor

    console.log(this.tache.tachePrecedente)

   let value = this.tacheService.updateTask(this.idTache, this.tache);
    value.subscribe((data)=>{
      if(data){
        this.returnMessage=data
        this.refresh()
      }
      })

      
  }

  currentForm(){

    // Recuperation des taches qui sont succeptibles de preceder la tache en question
    this.tacheService.getPotentielPredecesseurs(this.tacheAmodifier.numTache).subscribe(data=>{
      if(data){
        this.potentielTaskPreced=data;
        
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
      });

   

  }



}
