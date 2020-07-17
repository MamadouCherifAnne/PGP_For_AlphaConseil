import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import {DatePipe} from "@angular/common";
import { ITache } from 'src/app/Tache/ITache';
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
  selector: 'app-gantt-project',
  templateUrl: './gantt-project.component.html',
  styleUrls: ['./gantt-project.component.scss']
})
export class GanttProjectComponent implements OnInit {

  tacheRealisable: ITache[] ;
  allTask:any;
  ressources:object[]=[];
  tasks:Tache
  preced:object[] =[];
  taskfield: object;
  projectId:number;
  projet:any;
  personnes:object[]

  constructor(private userService:UtilisateurService,
    private projetService:ProjetService,
    private taskService:TacheService,
    private route:ActivatedRoute,
    ){}

    ngOnInit(){
      this.projectId = parseInt(this.route.snapshot.paramMap.get('idProjet'));
      this.projectId=6;
        //recuperation des taches a travers la bdd
       this.projetService.projectAllTasks(6).subscribe((data)=>{
          if(data){
            
            this.tacheRealisable =data;
            console.log(this.tacheRealisable)
            for(let i=0 ;i<data.length;i++){


              /**  Conversion des taches precedentes pour le rendre compatible avec 
               * la logique de dependence entre les taches
              */
              if(this.tacheRealisable[i].tachePrecedente){
                this.preced=[];
                for(let p=0; p<this.tacheRealisable[i].tachePrecedente.length;p++){
                  this.preced.push(data[i].tachePrecedente[p].numTache);

                }
                this.tacheRealisable[i].predecesseur=this.preced.toString();
                console.log(this.tacheRealisable[i].predecesseur);
                
              }
              // alimenter la liste des ressources de chaque tache
              this.taskService.getRessoucesForTask(this.tacheRealisable[i].numTache)
              .subscribe(resource=>{
                if(resource){
                   
                  this.tacheRealisable[i].ressources=[];
                  for(let r=0;r<resource.length;r++){
                    this.tacheRealisable[i].ressources[r]=resource[r].idUser;
                  }
                      }
              });// fin de recuperation de ressources de tache
              
            }
                
       // get ressources
       this.userService.getUsers().subscribe(users=>{
        if(users){
          // get the current project
       
        this.personnes=users;
        this.projetService.getById(this.projectId).subscribe(project=>{
          if(project){
            this.projet=project;
            console.log(project)
            this.ChargerGanttDiagramm();
          }
        });
        
        }
      });

            
            
          }
        });// fin de recuperation des tache
     
     
    }
  
  /*ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
}*/
 
  public ChargerGanttDiagramm(){ 
    let gantt:Gantt=new Gantt({
      dataSource:this.tacheRealisable,
      height:'600px',
      taskFields : {
        id: 'numTache',
        name: 'nomTache',
        startDate: 'debutTache',
        endDate: 'finTache',
        duration:'duree',
      dependency:'predecesseur',
        resourceInfo:'ressources'
    },
    resources:this.personnes,
    resourceIDMapping:'idUser',
    resourceNameMapping:'nom',
    labelSettings:{
      leftLabel:'nomTache',
      rightLabel:'ressources',
      
    },
    /*
    projectStartDate:this.projet.debutProjet,
    projectEndDate:this.projet.finProjet,
   timelineSettings:{
      timelineViewMode:'Year',
      timelineUnitSize:50,
      topTier:{
        unit:'Day'
      }
    }*/
    
    });
    gantt.appendTo("#GanttContainer");
  
}

}
