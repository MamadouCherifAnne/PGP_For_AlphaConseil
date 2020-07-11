import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../Utilisateur';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TacheService } from 'src/app/services/tache.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { PhaseService } from 'src/app/services/phase.service';
import { Tache } from 'src/app/Tache/Tache';
import { UserToTask } from '../UserToTask';
import { UtilisateurAffectation } from '../UtilisateurAffectation';


@Component({
  selector: 'app-affectation-user',
  templateUrl: './affectation-user.component.html',
  styleUrls: ['./affectation-user.component.css']
})
export class AffectationUserComponent implements OnInit {

  niveauPriorite = {"faible": 'faible', "moyen": 'Moyen', "fort": 'Fort'};
  tache : Tache = new Tache();
  ajoutTacheForm: FormGroup;
  message: any;
  ressource: UserToTask = new UserToTask();
  affectation: UtilisateurAffectation = new UtilisateurAffectation();
  allPhases: any;
  allUsers:any;

  constructor(private tacheService: TacheService ,
    private userServcie:UtilisateurService,
    private phaseService:PhaseService,
    private formBuilder: FormBuilder,
   ) { }

  ngOnInit() {
  

    this.ajoutTacheForm = this.formBuilder.group({
      "nomTache": [this.tache.nomTache,Validators.required],
      "chargeTache": this.tache.chargeTache,
      "niveauPriorite": this.tache.niveauPriorite,
      "duree": [this.tache.duree, Validators.required],
      "debutTache": [this.tache.debutTache,Validators.required],
      "finTache": [this.tache.finTache,Validators.required],
      "tauxAvancement" : [this.tache.tauxAvancement],
      "phase": [this.tache.phase],
      "Predecesseur":[this.tache.tachePrecedente],
      "ressources": [this.ressource.idUser, [Validators.required]],
      "tempsPasser": [this.affectation.tempsPasser, [Validators.required]]
    })

    // Charger tous les utilisateurs 
    this.userServcie.getUsers()
    .subscribe(data=>this.allUsers=data);
    //charger les phases
    this.phaseService.getAllPhase().subscribe(data=>{
      if(data){
        this.allPhases=data;
      }
    });


    //Charger les Ressources
    
  }

  
  ajoutTache(){
    this.tache.phase=null;
    this.tache.nomTache=this.ajoutTacheForm.get("nomTache").value
    this.tache.chargeTache=this.ajoutTacheForm.get("chargeTache").value

    console.log(this.tache);
  let val = this.tacheService.ajoutTache(this.tache);
    val.subscribe((data)=>this.message=data);
    this.ajoutTacheForm.reset();
    this.nextStep();
    
  }
  
  affecterRessource(){
    let res=JSON.parse(this.message)
    this.ressource.idUser=this.ajoutTacheForm.get("ressources").value;
    this.ressource.idTache=res.numTache
    this.affectation.tempsPasser= this.ajoutTacheForm.get("tempsPasser").value
    this.affectation.user_task =this.ressource;
    console.log(this.affectation)
    this.userServcie.affectToTask(this.affectation)
    .subscribe()
    this.ajoutTacheForm.reset()
    
    
    
  }

  formatLabel(value: number) {
    return value + '%';
  }


  step = 0;

  setStep(index: number) {
    
    this.step = index;
  }

  nextStep() {
    console.log(this.ajoutTacheForm.get("nomTache").value)
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
