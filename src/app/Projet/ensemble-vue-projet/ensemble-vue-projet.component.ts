import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AjoutPhaseComponent} from 'src/app/Phase/ajout-phase/ajout-phase.component';
import {AddTacheComponent} from 'src/app/Tache/add-tache/add-tache.component';
import { ProjetService } from 'src/app/services/projet.service';
import {ActivatedRoute,Router} from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-ensemble-vue-projet',
  templateUrl: './ensemble-vue-projet.component.html',
  styleUrls: ['./ensemble-vue-projet.component.scss']
})
export class EnsembleVueProjetComponent implements OnInit {
  public projetId: any;
  public projet: any;
  public  listPhase : any;
  public listTache :any;
  public isAdmin :boolean = false;
  public chefProjet:any
  public hasAccess:boolean=false;
 
  constructor(private dialog : MatDialog,private route: ActivatedRoute, 
    private projetService: ProjetService,public authService:AuthentificationService) { }


  ngOnInit() {
  /*  this.isAdmin=this.authService.isAdmin;
    //ici je recupère l'ID 
    this.projetId = parseInt(this.route.snapshot.paramMap.get('id'));

    let valeur = this.projetService.getById(this.projetId);
    valeur.subscribe((data)=>this.projet=data);

    
    //...................Recuperation de la liste de phase d'un projet....................
    let element = this.projetService.AllphaseDeProjet(this.projetId);
    element.subscribe((data)=>this.listPhase=data);

    //...................Recuperation de la liste de tache d'un projet....................
    let variable = this.projetService.projectAllTask(this.projetId);
    variable.subscribe((data)=>this.listTache=data);*/

    this.refresh();
    
  }

  nomProjet(){
    return this.projet.nomProjet;
    
  }
  
  //............................................................................................... 
 /* onAjoutPhase(){ 
    console.log(this.projet.nomProjet);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {projet: this.projet};
    this.dialog.open(AjoutPhaseComponent, dialogConfig);
  } */
//..................................................................................................
/*  onAjoutTahce(){  
    console.log(this.listTache);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true; 
    dialogConfig.width = "60%";
     //...........ici.....................
    dialogConfig.data= {listPhases: this.listPhase, listTaches: this.listTache};
    this.dialog.open(AddTacheComponent, dialogConfig);
  } */


 //............................................................................................... 
  onAjoutPhase(){ 
    console.log(this.listPhase);
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


  refresh(){
    this.isAdmin=this.authService.isAdmin;
    //ici je recupère l'ID 
    this.projetId = parseInt(this.route.snapshot.paramMap.get('id'));

    // verfier si c'est le owner
    this.projetService.getProjectOwner(this.projetId).subscribe(result=>{
      if(result){
        this.chefProjet = result;
        let role =this.roleInProject(this.projetId,this.chefProjet.idUser)
        console.log("Voici le role de user courant  ::"+role);
        if(result.username == this.authService.getCurrentUser() || this.isAdmin==true || role !="client"){
            this.hasAccess =true
          
        }
        
      }
    });
    
    //...................Recuperation de la liste de phase d'un projet....................
    let element = this.projetService.AllphaseDeProjet(this.projetId);
    element.subscribe((data)=>this.listPhase=data);

    //...................Recuperation de la liste de tache d'un projet....................
    let variable = this.projetService.projectAllTask(this.projetId);
    variable.subscribe((data)=>this.listTache=data);

    let valeur = this.projetService.getById(this.projetId);
    valeur.subscribe((data)=>this.projet=data);
    
   
  }

  roleInProject(idProjet,idUser):String{
   
    return  this.projetService.HasActionInProject(idProjet,idUser);
  }
 
}
