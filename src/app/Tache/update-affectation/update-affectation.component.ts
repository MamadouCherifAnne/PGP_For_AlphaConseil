import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TacheService } from 'src/app/services/tache.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { PhaseService } from 'src/app/services/phase.service';
import { Tache } from 'src/app/Tache/Tache';
import { UserToTask } from 'src/app/Utilisateur//UserToTask';
import { UtilisateurAffectation } from 'src/app/Utilisateur/UtilisateurAffectation';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-affectation',
  templateUrl: './update-affectation.component.html',
  styleUrls: ['./update-affectation.component.scss']
})
export class UpdateAffectationComponent implements OnInit {

  affectationForm: FormGroup;
  currentAffectation: any;
  message: any;
  ressource: UserToTask = new UserToTask();
  affectation: UtilisateurAffectation =new UtilisateurAffectation();
 
  idTache:number;
  

  constructor(private tacheService: TacheService ,
    private userService:UtilisateurService,
    private phaseService:PhaseService,
    private formBuilder: FormBuilder,
    @Inject (MAT_DIALOG_DATA) public data: any,
    public fenetreReference: MatDialogRef<UpdateAffectationComponent>
   ) { }

  ngOnInit() {
    // Preparation du formulaire d' affectation de ressources a une tache
    this.affectationForm = this.formBuilder.group({
    "tempsPasser": [this.affectation.tempsPasser, [Validators.required]],
    "tempsEffectuer": [this.affectation.tempsEffectuer, [Validators.required]],
    "coutParHeure": [this.affectation.coutParHeure, [Validators.required]]
    });
    // Affciher l'Affectation en cours de modification
    this.chargerFormulaire();
  }

  // charger les valeurs de depart de l'affectation
  public chargerFormulaire(){
  
    this.affectationForm.get("tempsPasser").setValue(this.data.affect.tempsPasser);
    this.affectationForm.get("tempsEffectuer").setValue(this.data.affect.tempsEffectuer);
    this.affectationForm.get("coutParHeure").setValue(this.data.affect.coutParHeure);
  }

  updateRessourceAffectation(){
    this.ressource.idUser=this.data.affect.user_task.idUser;
    this.ressource.idTache=this.data.affect.user_task.idTache;
    this.affectation.tempsPasser= this.affectationForm.get("tempsPasser").value
    this.affectation.tempsEffectuer= this.affectationForm.get("tempsEffectuer").value
    this.affectation.coutParHeure= this.affectationForm.get("coutParHeure").value
    this.affectation.user_task =this.ressource;
    console.log(this.affectation)
   // Appel du service de modification
   this.tacheService.updateAffectationOfTask(this.affectation).subscribe(data=>{
     if(data){
      this.onFermer();
     }
   });
    
  }

  // Methode de la fermeture du modal ouvert
  public onFermer(){
    this.affectationForm.reset();
    this.fenetreReference.close();
  }

}
