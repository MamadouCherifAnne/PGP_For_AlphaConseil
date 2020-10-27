import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjetService} from 'src/app/services/projet.service';
import {TacheService} from 'src/app/services/tache.service';
import {RapportServiceService} from 'src/app/services/rapport-service.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {Router, RouterState} from '@angular/router';

import {AjoutPhaseSecondComponent} from './ajout-phase-second/ajout-phase-second.component';

import { AffecterRessourcesComponent}  from '../Tache/affecter-ressources/affecter-ressources.component'
import {Tache} from '../Tache/Tache';
import { Phase } from '../Phase/Phase';
import fileSaver from 'file-saver';

@Component({
  selector: 'app-altaches',
  templateUrl: './altaches.component.html',
  styleUrls: ['./altaches.component.scss']
})
export class AltachesComponent implements OnInit {
  idProjet : any;
  allphase : any;
  countPhase: number;
  iteration: number =0;
  projet: any;
  listTache: any;
  deleteMessage: any;
  ajourdhuit = new Date();
  tache: Tache = new Tache;
  display = [];
  cacher = [];
 // togleDisplay(){
  //this.display = !this.display
  //}
  constructor( private route: ActivatedRoute, private dialog : MatDialog,
    private projetService: ProjetService, private  router: Router, private tacheService: TacheService,
    private rapportServiceService: RapportServiceService) { }

  ngOnInit() {
    this.idProjet = parseInt(this.route.snapshot.paramMap.get('id'));

   //...................Recuperation de la liste de phase d'un projet....................    
    this.refresh()
  }

  
  ajouterPhase(){
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {projet: this.projet};
    this.dialog.open(AjoutPhaseSecondComponent, dialogConfig)
    .afterClosed().subscribe(result => {
      this.refresh();
    });;
  }

  affecterRessources(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {tache: element};
    this.dialog.open(AffecterRessourcesComponent, dialogConfig);
  }


  refresh(){
    this.projetService.AllphaseDeProjet(this.idProjet).subscribe(data=>{
      if(data){
        this.allphase = data;
        this.countPhase= this.allphase.length;
      }
   });

   let valeur = this.projetService.getById(this.idProjet);
  valeur.subscribe((data)=>this.projet=data);


  //...................Recuperation de la liste de tache d'un projet....................
  let variable = this.projetService.projectAllTask(this.idProjet);
  variable.subscribe((data)=>this.listTache=data);
  }


  deleteTask(tacheId){
    if(confirm('Etes vous sur de vouloir supprimer ?')){
      let theValue = this.tacheService.deleteTask(tacheId);
      theValue.subscribe((data)=>{
        if(data){
          this.deleteMessage=data;
          this.refresh();
        }
      this.deleteMessage
    });
    }
  }

  compareDateDebut(element){
    let res=0;
    if(new Date() < new Date(element) ){
      res=1;
    }
    
    return res;
  }

  finTache(tache){
    let cmpt = 0;
    for(let i of tache){
      if(i.tauxAvancement ==  100){
        cmpt += 1;
      }
    }
    return cmpt;
  }

  // Aller voir le gantt du projet
  goToGanttProject(){
    this.router.navigate(["/projet/gantt", this.idProjet]);
  }


  //Aller voir le rapport du projet 
  goToRapportProjet(){
    this.router.navigate(["/projet/rapport", this.idProjet]);
  }

  goToRapportTaches(phaseId){
    this.router.navigate(["/phases/rapport", phaseId]);
  }


  public isLate(dateFin:Date){
    let today =  new Date()
    if(dateFin > today){

      return false;
    }else{
     
      return true;
    }
  }
  /*
  exportFile() {
    this.rapportServiceService.printInvoice(this.idProjet).subscribe(
      res => this.downloadFile(res.body, res.headers.get('content-type'),
        res.headers.get('content-disposition').split("filename=")[1]));
  }

  downloadFile() {
    const blob = new Blob([data], { type: contentType + '; charset=utf-8'});
    fileSaver.saveAs(blob, filename);
    // const url = window.URL.createObjectURL(blob);
    // window.open(url, filename);
  } */

  printPrint() {
    this.rapportServiceService.printInvoice(this.idProjet).subscribe((response) => {
  
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  exportDailyOrdersToPdf() {
    this.rapportServiceService.pdf(this.idProjet).subscribe(response => {
      console.log(response);
      let url = window.URL.createObjectURL(response.data);
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('target', 'blank');
      a.href = url;
      a.download = response.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }, error => {
      console.log(error);
    });}

}
