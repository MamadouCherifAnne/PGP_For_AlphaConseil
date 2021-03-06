import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import {DatePipe} from "@angular/common";
import { ITache } from 'src/app/Tache/ITache';
import{IUtilisateur} from 'src/app/Utilisateur/IUtilisateur';
import { Tache } from 'src/app/Tache/Tache';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TacheService } from 'src/app/services/tache.service';
import {Gantt} from "@syncfusion/ej2-angular-gantt";
import { AllProjetsComponent } from 'src/app/Projet/all-projets/all-projets.component';
import { ActivatedRoute } from '@angular/router';
import  * as html2pdf from 'html2pdf.js';
import { L10n, loadCldr, setCulture } from '@syncfusion/ej2-base';
@Component({
  selector: 'app-utilisateur-gantt',
  templateUrl: './utilisateur-gantt.component.html',
  styleUrls: ['./utilisateur-gantt.component.scss']
})
export class UtilisateurGanttComponent implements OnInit {
  tacheRealisable: ITache[] = [] ;
  allTask:any;
  ressources:IUtilisateur[]= [];
  tasks:Tache
  preced:object[];
  taskfield: object;
  userId:number;

  constructor(private userService:UtilisateurService,
    private route:ActivatedRoute,
    private taskService:TacheService
    ) {
    }
    //test gantt
    ngOnInit(){
      this.userId = parseInt(this.route.snapshot.paramMap.get('iduser'));

        //recuperation des taches a travers la bdd
        this.userService.getTaskToRealise(this.userId).subscribe((data)=>{
          if(data){
            this.tacheRealisable =data;
            console.log(data)
            for(let i=0 ;i<data.length;i++){
                /**  Conversion des taches precedentes pour le rendre compatible avec 
               * la logique de dependence entre les taches
              */
          /*   if(this.tacheRealisable[i].tachePrecedente){
              this.preced=[];
              for(let p=0; p<this.tacheRealisable[i].tachePrecedente.length;p++){
                this.preced.push(data[i].tachePrecedente[p].numTache);

              }
              this.tacheRealisable[i].predecesseur=this.preced.toString();
              console.log(this.tacheRealisable[i].predecesseur);
              
            }*/
              // alimenter la liste des ressources de chaque tache
              this.taskService.getRessoucesForTask(this.tacheRealisable[i].numTache)
              .subscribe(resource=>{
                if(resource){
                  this.tacheRealisable[i].ressources=[];
                  for(let r=0;r<resource.length;r++){
                    this.tacheRealisable[i].ressources.push(resource[r].idUser);
                  }
                  
                  console.log(this.tacheRealisable);
               this.ressources.push(resource)      
              console.log(this.ressources)          }
              });// fin de recuperation de ressources de tache
              
            }
             //Initialisation du gantt
            this.ChargerGanttDiagramm(this.tacheRealisable,this.ressources);
          }
        });// fin de recuperation des tache
     
     
    }
  
  /*ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
}*/
 
  public ChargerGanttDiagramm(done,rsource){ 
   
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
      dataSource:done,
      height:'600px',
      locale:'fr-FR',
      taskFields : {
        id: 'numTache',
        name: 'nomTache',
        startDate: 'debutTache',
        endDate: 'finTache',
        duration:'duree',
        
        resourceInfo:'ressources'
    },
    /*allowPdfExport:true,
    toolbar:['PdfExport'],
    toolbarClick:clickHandler,*/
    resources:rsource,
    resourceIDMapping:'idUser',
    resourceNameMapping:'nom',
    labelSettings:{
      rightLabel:'nomTache'
    },
    timelineSettings:{
      timelineViewMode:'Year',
      timelineUnitSize:200,
      topTier:{
        unit:'Week'
      },
    }
    

    });
    gantt.appendTo("#GanttContainer");
  
}

public imprimerFacturePDF(){
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

