import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import {DatePipe} from "@angular/common";
import { ITache } from 'src/app/Tache/ITache';
import { Iphase } from 'src/app/Phase/Iphase';
import{IUtilisateur} from 'src/app/Utilisateur/IUtilisateur';
import { Tache } from 'src/app/Tache/Tache';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {Gantt} from "@syncfusion/ej2-angular-gantt"
import { AllProjetsComponent } from 'src/app/Projet/all-projets/all-projets.component';
import { TacheService } from 'src/app/services/tache.service';
import { PhaseService } from 'src/app/services/phase.service';
import { ProjetService} from 'src/app/services/projet.service';
import { ActivatedRoute } from '@angular/router';
import { Projet } from '../Projet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-jalon',
  templateUrl: './add-jalon.component.html',
  styleUrls: ['./add-jalon.component.scss']
})
export class AddJalonComponent implements OnInit {

 
  tache:Tache = new Tache();
  preced:object[] =[];
  taskfield: object;
  ajoutJalon:FormGroup;


  constructor(private userService:UtilisateurService,
    private formBuilder:FormBuilder,
    private projetService:ProjetService,
    private taskService:TacheService,
    public fenetreReference: MatDialogRef<AddJalonComponent>,
    private route:ActivatedRoute,
    ){}

    ngOnInit(){

      this.ajoutJalon = this.formBuilder.group({
        "nomTache": [this.tache.nomTache,Validators.required],
        "description": this.tache.description,
        "debutTache": [this.tache.debutTache,[Validators.required]],
     
    });


  }

  // Ajout d'un Jalon
  goToAddJalon(){
    this.tache.type="Jalon"
    this.taskService.ajoutJalon(this.tache).subscribe()
    this.onClose();
    
  }
  public onClose(){
    this.ajoutJalon.reset();
    this.fenetreReference.close();
  }
}
