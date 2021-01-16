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
import { AuthentificationService } from '../services/authentification.service';
import { UtilisateurService } from '../services/utilisateur.service';
import { Utilisateur } from '../Utilisateur/Utilisateur';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-altaches',
  templateUrl: './altaches.component.html',
  styleUrls: ['./altaches.component.scss']
})
export class AltachesComponent implements OnInit {
  public idProjet : any;
  public allphase : any;
  public countPhase: number;
  public iteration: number =0;
  public projet: any;
  public listTache: any;
  public deleteMessage: any;
  public ajourdhuit = new Date();
  public tache: Tache = new Tache;
  public currentUser:Utilisateur;
  public mesTaches:any[];
  public isAdmin:boolean;
  public isSuperAdmin:boolean;
  public ownProject:any;
  public display = [];
  public hasAccess:boolean = false;
  public isChefProjet:boolean =false;
  public cacher = [];
 // togleDisplay(){
  //this.display = !this.display
  //}
  constructor( private route: ActivatedRoute, private dialog : MatDialog,
    private projetService: ProjetService, private  router: Router, private tacheService: TacheService,
    private rapportServiceService: RapportServiceService, 
    private authService:AuthentificationService ,
    private userService:UtilisateurService,) { }


  ngOnInit() {
    this.idProjet = parseInt(this.route.snapshot.paramMap.get('id')); 
    this.isAdmin = this.authService.isAdmin;
    this.isSuperAdmin = this.authService.isSuperAdmin;
 
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
    dialogConfig.data = {tache: element, projet:this.idProjet};
    this.dialog.open(AffecterRessourcesComponent, dialogConfig);

    }else{
      window.alert("Vous n'avez pas les privillèges");
    }
  }


  refresh(){

    // voir si l'utilisateur a le droit d4ajouter des taches
    
    ///
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
          this.userHasAccessToProjet(this.idProjet,this.currentUser.idUser);
          
         // this.userHasAccessToProje()
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
      if(i.tauxAvancement ===  100 && this.isFinished(tache) === 0){
        cmpt += 1;
      }
    }
    //console.log("check task stut:"+ cmpt);
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

  printPrint() {
    this.rapportServiceService.printInvoice(this.idProjet).subscribe((response) => {
  
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  exportDailyOrdersToPdf() {
    this.rapportServiceService.pdf(this.idProjet).subscribe(response => {
      
      // definissons le header autorisation avec le token jwt
      let headers = new Headers();
      headers.append('Authorization','Bearer '+this.authService.getToken())
      if(response){
        console.log(response);
        let blobby = new Blob([response],{type:'application/pdf'});
        console.log("Voici le document apres conversion en blob"+blobby);
       
        if(window.navigator && window.navigator.msSaveOrOpenBlob){
          window.navigator.msSaveOrOpenBlob(blobby);
          return ;
        }

         let url = window.URL.createObjectURL(blobby);
        let a = document.createElement('a')
        a.href = url;
        a.download = "rapport_du_Projet_"+ this.projet.nomProjet+".pdf";
        a.click();
        setTimeout(function(){
          // pour firefox
          window.URL.revokeObjectURL(url);
        },1000)

      }
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
      /*
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
      
    }*/
    //this.userHasAccessToProjet()
    
    }

    // Compter la longuer des taches d'une phase
    public countLengthOfPhase(phase):number{
      let cpt:number =0;
      let tasks:any;
      tasks =phase.taches;
      for(let t of tasks){
        if(t.type !== 'Jalon'){
          cpt++;
        }
      }
      return cpt;
    }



   //si l'une des taches précedante n'est pas terminé 
   public isFinished(tache2){
    let find = 0;
    if(tache2.tachePrecedente != null){
      for(let itache of tache2.tachePrecedente){
        if(itache.tauxAvancement != 100){
          find = 1;
          break;
        }
      }
    }
    //console.log("sssssssssssssss"); 
    return find;
  }

    // role de utilisateru dans le projet
    roleInProject(idProjet,idUser):String{
   
      return  this.projetService.HasActionInProject(idProjet,idUser);
    }

    public userHasAccessToProjet(idProjet,idUser){
      let role ;
      this.projetService.getRoleInProject(idProjet,idUser).subscribe(result=>{
        if(result){
          if(result == 1){
            role ="acteur";
            this.hasAccess =true;
          }
          if(result==2){
            this.isChefProjet = true;
          }
          console.log("IS chef de projet +"+this.isChefProjet)
          console.log("Has access to do something+"+this.hasAccess)
        }
      });
      
     /* console.log("Voici le role de user courant  ::"+role);
      if(this.isAdmin==true || role !="client"){
          this.hasAccess =true
          if(role == "responsable"){
            this.ischefProjet = true;
          }
      }
      console.log("IS chef de projet +"+this.ischefProjet)
          console.log("Has access to do something+"+this.hasAccess)*/
    }

}
