import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjetService} from 'src/app/services/projet.service';
import {TacheService} from 'src/app/services/tache.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {Router, RouterState} from '@angular/router';

import {AjoutPhaseSecondComponent} from './ajout-phase-second/ajout-phase-second.component';

import { AffecterRessourcesComponent}  from '../Tache/affecter-ressources/affecter-ressources.component'


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

  display = [];
  cacher = [];
 // togleDisplay(){
  //this.display = !this.display
  //}
  constructor( private route: ActivatedRoute, private dialog : MatDialog,
    private projetService: ProjetService, private  router: Router, private tacheService: TacheService) { }

  ngOnInit() {
    this.idProjet = parseInt(this.route.snapshot.paramMap.get('id'));

   //...................Recuperation de la liste de phase d'un projet....................    
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

  
  ajouterPhase(){
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {projet: this.projet};
    this.dialog.open(AjoutPhaseSecondComponent, dialogConfig);
  }

  affecterRessources(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {tache: element};
    this.dialog.open(AffecterRessourcesComponent, dialogConfig);
  }

  deleteTask(tacheId){
    if(confirm('Etes vous sur de vouloir supprimer ?')){
    let theValue = this.tacheService.deleteTask(tacheId);
    theValue.subscribe((data)=>this.deleteMessage);
    }
  }

  compareDateDebut(element){
    let res=0;
    if(new Date(element) < new Date()){
      res=1;
    }
    return res;
  }

 

}
