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


@Component({
  selector: 'app-jalon',
  templateUrl: './jalon.component.html',
  styleUrls: ['./jalon.component.scss']
})
export class JalonComponent implements OnInit {

  tacheRealisable: ITache[] ;
  allTask:any;
  ressources:object[]=[];
  tasks:Tache
  preced:object[] =[];
  taskfield: object;
  projectId:number;
  projet:any;
  projetName:String;
  personnes:object[]
  phases:Iphase[]

  constructor(private userService:UtilisateurService,
    private projetService:ProjetService,
    private taskService:TacheService,
    private route:ActivatedRoute,
    ){}

    ngOnInit(){
      this.projectId = parseInt(this.route.snapshot.paramMap.get('idProjet'));
     // this.projectId=6;
   
    }

}
