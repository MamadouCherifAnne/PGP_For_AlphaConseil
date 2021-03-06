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
import { Iphase } from 'src/app/Phase/Iphase';
import { L10n, loadCldr, setCulture } from '@syncfusion/ej2-base';
import  * as html2pdf from 'html2pdf.js';

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
  projetName:String;
  personnes:object[]
  phases:Iphase[]

  constructor(private userService:UtilisateurService,
    private projetService:ProjetService,
    private taskService:TacheService,
    private route:ActivatedRoute,
    ){}

    ngOnInit(){
      this.projectId = parseInt(this.route.snapshot.paramMap.get('id'));
     // this.projectId=6;
   
        //recuperation des taches a travers la bdd
       this.projetService.AllphaseDeProjet(this.projectId).subscribe((data)=>{
          if(data){
            
            this.phases =data;
            console.log(this.phases)
            //Recuperer les predecessuer des taches de chaque phase
            for(let phase of this.phases){
              if(phase.taches){
                for(let task of phase.taches){
                  if(task.tachePrecedente){
                    this.preced=[];
                    for(let p=0; p<task.tachePrecedente.length;p++){
                      this.preced.push(task.tachePrecedente[p].numTache);
    
                    }
                    task.predecesseurs= this.preced.toString(); 
                    console.log(task.predecesseurs)
                  }


                     // alimenter la liste des ressources de chaque tache
              this.taskService.getRessoucesForTask(task.numTache)
              .subscribe(resource=>{
                if(resource){
                   
                  task.ressources=[];
                  for(let r=0;r<resource.length;r++){
                    task.ressources[r]=resource[r].idUser;
                  }
                      }
              });// fin de recuperation de ressources de tache
                }

                
                
                }
              }
              
            }

             this.userService.getUsers().subscribe(users=>{
        if(users){
          // get the current project
       
        this.personnes=users;
      
        
        }
        this.projetService.getById(this.projectId).subscribe(project=>{
          if(project){
            this.projet=project;
            console.log(project)
            this.ChargerGanttDiagramm()
          }
        });
        
      });
            
          
           
          

        });// fin de recuperation des tache
     
     
    }
  
  
  /*ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
}*/
 
  public ChargerGanttDiagramm(){ 

    // Changement des noms des labels en français
    L10n.load({
      'fr-FR': {
          'gantt': {
               "id": "ID",
                "name": "Nom",
                "startDate": "Début",
                "endDate":"Fin",
                "duration": "Durée",
                "progress": "Avancement",
         }
      }
    });
    let gantt:Gantt=new Gantt({
      dataSource:this.phases,
      height:'600px',
      locale:'fr-FR',
      taskFields : {
        id: 'numTache',
        name: 'nomTache',
        startDate: 'debutTache',
        endDate: 'finTache',
        child:'taches',
        duration:'duree',
      dependency:'predecesseurs',
        resourceInfo:'ressources'
    },
    resources:this.personnes,
    resourceIDMapping:'idUser',
    resourceNameMapping:'nom',
    labelSettings:{
      leftLabel:'nomTache',
      rightLabel:'ressources',
      
    },
    
    
    //projectStartDate:this.projet.debutProjet,
    //projectEndDate:this.projet.finProjet,
    timelineSettings:{
      timelineViewMode:'Year',
      timelineUnitSize:30,

      topTier:{
        unit:'Day'
      }
    },
    // AJouter les options de modifications
    editSettings:{
      allowAdding:true,
      allowEditing:true
    },
    /*allowSelection:true,
    toolbar:['Add','Edit','Cancel'],
    allowFiltering:true*/

   
    
    });
    gantt.appendTo("#GanttContainer");
  
}

public imprimerGanttPDF(){
  const options = {
    filename: 'factureTache.pdf',
    /*image :{type:'jpeg'},*/
    html2canvas:{
      dpi: 192,
      letterRendering: true, 
      allowTaint: true, 
      useCORS: true, 
      logging: false, 
      scrollX: 0,
      scrollY: 0 
    },
    jsPDF:{orientation:'portrait',
    unit: 'cm',
    format: 'a4'
    }
  }

  const element: Element = document.getElementById('GanttContainer')

  // Appel de la librairies pour la sauvegarde
  html2pdf()
    .from(element)
    .set(options)
    .save()
}


}
