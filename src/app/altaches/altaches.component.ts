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
<<<<<<< HEAD
import fileSaver from 'file-saver';
=======
import { AuthentificationService } from '../services/authentification.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../Utilisateur/Utilisateur';

>>>>>>> 5c60ba5f4caa6f517c6765cd219b2f6cef9bc90e

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
  currentUser:Utilisateur;
  mesTaches:any[];
  isAdmin:boolean;
  isSuperAdmin:boolean;
  ownProject:any[]
  display = [];
  cacher = [];
 // togleDisplay(){
  //this.display = !this.display
  //}
  constructor( private route: ActivatedRoute, private dialog : MatDialog,
<<<<<<< HEAD
    private projetService: ProjetService, private  router: Router, private tacheService: TacheService,
    private rapportServiceService: RapportServiceService) { }
=======
    private authService:AuthentificationService ,
    private userService:UtilisateurService,
    private projetService: ProjetService, private  router: Router, private tacheService: TacheService) { }
>>>>>>> 5c60ba5f4caa6f517c6765cd219b2f6cef9bc90e

  ngOnInit() {
    this.idProjet = parseInt(this.route.snapshot.paramMap.get('id')); 
    this.isAdmin = this.authService.isAdmin;
    this.isSuperAdmin = this.isSuperAdmin;
 
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
    });
  }

  affecterRessources(element){
    if(this.authService.isAdmin == true){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {tache: element};
    this.dialog.open(AffecterRessourcesComponent, dialogConfig);

    }else{
      window.alert("Vous n'avez pas les privillèges");
    }
  }


  refresh(){
    this.projetService.AllphaseDeProjet(this.idProjet).subscribe(data=>{
      if(data){
        this.allphase = data;
        this.countPhase= this.allphase.length;
      }
   });

   let valeur = this.projetService.getById(this.idProjet);
  valeur.subscribe((data)=>{
    if(data){
      this.projet=data;
      let username = this.authService.getCurrentUser();
      this.authService.getUserProfile(username).subscribe(data=>{
        if(data != null){
          this.currentUser = data;
          this.mesTaches = this.currentUser.taches
          this.isOwnerOfProject();
         console.log("les taches que jai creer "+this.mesTaches.length)
        }
      })
      
      
      //this.ownProject = this.currentUser.projet

      // On verifie si l'utilisateur courant ets le chef du projet courant
      
    }
    });


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
    let fin = new Date(dateFin)
    
    if(today > fin){

      return true;
    }else{
     
      return false;
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

  public isCreateur(createur){
    let verif:boolean = false;
    if(this.mesTaches.length != 0 ){
      for(let tache of this.mesTaches){
        if(tache.idTache === createur.idTache &&
          tache.nomTache === createur.nomTache &&
          tache.lastUpdate === createur.lastUpdate &&
          tache.debutTache === createur.debutTache 
          ){
            verif = true;
            break;
          }
      }
      
    
    return verif;
  }
}

// verification si il s'agit du chef du projet
    public isOwnerOfProject(){
      this.currentUser.isChefProjet =0;
      if(this.currentUser.projets){
        console.log(this.currentUser.projets.length)
      for(let p of this.currentUser.projets){
        console.log("le projet dont jsuis"+p);
        if(p.numProjet == this.projet.numProjet){
          this.currentUser.isChefProjet = 1;
          
          break;
        }
      }
      
    }
    }
}
