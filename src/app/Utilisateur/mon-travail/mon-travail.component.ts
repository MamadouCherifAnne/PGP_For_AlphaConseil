import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {Router, RouterState} from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ProjetService } from 'src/app/services/projet.service';
import { DOCUMENT } from '@angular/common';
import {UtilisateurService} from 'src/app/services/utilisateur.service';
import {TacheService} from 'src/app/services/tache.service';
import { Tache } from 'src/app/Tache/Tache';

@Component({
  selector: 'app-mon-travail',
  templateUrl: './mon-travail.component.html',
  styleUrls: ['./mon-travail.component.scss'],

})
export class MonTravailComponent implements OnInit {
  projets: any;
  currentUser: any;
  userTaches: any = [];
  theuser: any ;
  display = [];
  public vide:any;

  constructor( 
    private authService: AuthentificationService,
    private userService: UtilisateurService,
    private projetService: ProjetService,
    private tacheService: TacheService,
    private route: Router,
  ) { }

  ngOnInit() {
   

    //l'utilisateur connecté
    this.currentUser =this.authService.getCurrentUser()

    //On récupère les projets de l'utilisateur connecté
    let resp = this.projetService.allProjectOfUser(this.currentUser )
    resp.subscribe(data=>{
      this.projets=data
      console.log(data)
      
      this.userService.getUserByUsername(this.currentUser).subscribe((data)=>{
        if(data){
          this.theuser = data;
          console.log("....//....le user"+this.theuser);
        }

        this.userService.getAlluserTasks(this.theuser.idUser).subscribe((data)=>{
          if(data){
            this.userTaches = data;
            console.log("hola ....."+this.userTaches);
          }
        })
       
      })
      
    }) 
   

  }
  

  compareDateDebut(element){
    let res=0;
    if(new Date() < new Date(element) ){
      res=1;
    }
    
    return res;
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

  public gatAllusers(idTache){
    let users: any = null;
    let val = 0;
    this.tacheService.getRessoucesForTask(idTache).subscribe(ressource=>{
      if(ressource){
        users = ressource;
      }
    })
    val = users.lenght; 
    return val;
  }
 
  public monPlaning(){
    this.route.navigate(['utilisateur/gantt/', this.theuser.idUser]);
  }

}
