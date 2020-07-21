import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AjoutPhaseComponent} from 'src/app/Phase/ajout-phase/ajout-phase.component';
import {AddTacheComponent} from 'src/app/Tache/add-tache/add-tache.component';
import { ProjetService } from 'src/app/services/projet.service';
import {ActivatedRoute,Router} from '@angular/router';

@Component({
  selector: 'app-ensemble-vue-projet',
  templateUrl: './ensemble-vue-projet.component.html',
  styleUrls: ['./ensemble-vue-projet.component.scss']
})
export class EnsembleVueProjetComponent implements OnInit {
  projetId: any;
  projet: any;
  listPhase : any;
  listTache :any;
 


  constructor(private dialog : MatDialog, private route: ActivatedRoute, 
    private router:Router,
    private projetService: ProjetService
    ) { }

  ngOnInit() {
    
    //ici je recupère l'ID 
    this.projetId = parseInt(this.route.snapshot.paramMap.get('id'));

    let valeur = this.projetService.getById(this.projetId);
    valeur.subscribe((data)=>this.projet=data);

    //...................Recuperation de la liste de phase d'un projet....................
    let element = this.projetService.AllphaseDeProjet(this.projetId);
    element.subscribe((data)=>this.listPhase=data);

    //...................Recuperation de la liste de tache d'un projet....................
    let variable = this.projetService.projectAllTask(this.projetId);
    variable.subscribe((data)=>this.listTache=data);
    
  }

  nomProjet(){
    return this.projet.nomProjet;
  }
  
 //............................................................................................... 
  onAjoutPhase(){ 
    console.log(this.projet.nomProjet);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {projet: this.projet};
    this.dialog.open(AjoutPhaseComponent, dialogConfig);
  } 
//..................................................................................................
  onAjoutTahce(){  
    console.log(this.listTache);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
     //...........ici.....................
    dialogConfig.data= {listPhases: this.listPhase, listTaches: this.listTache};
    this.dialog.open(AddTacheComponent, dialogConfig).afterClosed()
    .subscribe(result => {
      this.refresh();
    });
    ;
  } 

  //................... Aller vers le diagreamme de gantt du projet .............
    goToProjectGantt(){
      this.router.navigate(["/projet/gantt", this.projetId]);
    
  }

  refresh(){
    let valeur = this.projetService.getById(this.projetId);
    valeur.subscribe((data)=>this.projet=data);
  }
}
