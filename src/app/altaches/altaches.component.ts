import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjetService} from 'src/app/services/projet.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {Router, RouterState} from '@angular/router';
import{UpdateTacheComponent} from '../Tache/update-tache/update-tache.component';
import {AjoutPhaseSecondComponent} from './ajout-phase-second/ajout-phase-second.component';

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

  display = true;
  togleDisplay(){
  this.display = !this.display
  }
  constructor( private route: ActivatedRoute, private dialog : MatDialog,
    private projetService: ProjetService, private  router: Router) { }

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

  

  modifier(element){ 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {tache: element, listTache: this.listTache};
    this.dialog.open(UpdateTacheComponent, dialogConfig);
  } 

  ajouterPhase(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {projet: this.projet};
    this.dialog.open(AjoutPhaseSecondComponent, dialogConfig);
  }
}
