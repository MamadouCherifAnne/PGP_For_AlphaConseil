import { Component, OnInit, Inject } from '@angular/core';
import { Utilisateur } from 'src/app/Utilisateur/Utilisateur';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TacheService } from 'src/app/services/tache.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { PhaseService } from 'src/app/services/phase.service';
import { Tache } from 'src/app/Tache/Tache';
import { UserToTask } from 'src/app/Utilisateur//UserToTask';
import { UtilisateurAffectation } from 'src/app/Utilisateur/UtilisateurAffectation';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-affecter-ressources',
  templateUrl: './affecter-ressources.component.html',
  styleUrls: ['./affecter-ressources.component.scss']
})
export class AffecterRessourcesComponent implements OnInit {

  affectationForm: FormGroup;
  message: any;
  ressource: UserToTask = new UserToTask();
  affectation: UtilisateurAffectation = new UtilisateurAffectation();
  allPhases: any;
  idTache:number;
  allUsers:any;

  constructor(private tacheService: TacheService ,
    private userService:UtilisateurService,
    private phaseService:PhaseService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fenetreReference: MatDialogRef<AffecterRessourcesComponent>
   ) { }

  ngOnInit() {
    // Preparation du formulaire d' affectation de ressources a une tache
    this.affectationForm = this.formBuilder.group({
    "ressources": [this.ressource.idUser, [Validators.required]],
    "tempsPasser": [this.affectation.tempsPasser, [Validators.required]]
    })
    this.idTache=this.data.tache.numTache
    this.userService.getUsers().subscribe((data)=>{
      if(data){
      this.allUsers=data;
      }
    });
  }

  affecterRessource(){
    this.idTache=this.data.tache.numTache
    this.ressource.idUser=this.affectationForm.get("ressources").value;
    this.ressource.idTache=this.idTache;
    this.affectation.tempsPasser= this.affectationForm.get("tempsPasser").value
    this.affectation.user_task =this.ressource;
    console.log(this.affectation)
    this.userService.affectToTask(this.affectation)
    .subscribe()
    this.affectationForm.reset()
    
  }

  // Methode de la fermeture du modal ouvert
  public onFermer(){
    this.affectationForm.reset();
    this.fenetreReference.close();
  }


}
