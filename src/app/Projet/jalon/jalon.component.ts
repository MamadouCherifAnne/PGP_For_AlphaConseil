import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import {DatePipe} from "@angular/common";
import { ITache } from 'src/app/Tache/ITache';
import { Iphase } from 'src/app/Phase/Iphase';
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
import {AddJalonComponent} from '../add-jalon/add-jalon.component'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog,MatDialogConfig, MatTableDataSource} from '@angular/material'
import { Utilisateur } from 'src/app/Utilisateur/Utilisateur';
import { AuthentificationService } from 'src/app/services/authentification.service';


@Component({
  selector: 'app-jalon',
  templateUrl: './jalon.component.html',
  styleUrls: ['./jalon.component.scss']
})
export class JalonComponent implements OnInit {

 
  public tache:Tache
  public preced:object[] =[];
  public taskfield: object;
  public ajoutJalon:FormGroup;
  public jalons:any
  public currentUser:any;
  public chefProjet:String
  public lateJalon:ITache[]=[]
  public nombreJalon:number
  public projectId:number
  public projectOwner:Utilisateur;
  public isOwner : boolean = false;
  constructor(public userService:UtilisateurService,
    public formBuilder:FormBuilder,
    public projetService:ProjetService,
    public fenetre:MatDialog,
    public taskService:TacheService,
    public authService:AuthentificationService,
    public route:ActivatedRoute,
    ){}

    ngOnInit(){
      this.projectId = parseInt(this.route.snapshot.paramMap.get('id'));
      // recuperer le chef de ce projet 
  
        this.userService.getUserByUsername(this.authService.getCurrentUser()).subscribe(data=>{
          if(data){
            this.currentUser = data;
            this.refresh();
          }
        });
      }
    

  // Ajout d'un Jalon
  goToAddJalon(){

      //this.router.navigate(["add"],{relativeTo: this.route});
       //la configuration du pop up
       const fenetreConfig= new MatDialogConfig();
       fenetreConfig.disableClose =true;
       fenetreConfig.autoFocus = true;
       fenetreConfig.width="65%";
       fenetreConfig.data={projet:this.projectId};
       this.fenetre.open(AddJalonComponent,fenetreConfig)
       .afterClosed().subscribe(result => {
        this.refresh();
      });
  
    }
  
    refresh() {
      this.isChefDeProjectOwner(this.projectId,this.currentUser.idUser);
      this.projetService.getProjectJalonInfos(this.projectId).subscribe((data)=>{
        if(data){
          this.jalons=data;
         /* for(let j of this.jalons){
            if(j.debutTache < new Date()){
              this.lateJalon.push(j);
            }
            }*/
            console.log(this.lateJalon)
        } 
      });
    }

    //verification si il s'agit du chef du projet

    isChefDeProjectOwner(idProjet,idUser){
      //this.chefProjet = this.projetService.HasActionInProject(idProjet,idUser);
      this.projetService.getRoleInProject(idProjet,idUser).subscribe(data=>{
        if(data){
         let verif = data;
          if(verif == 1){
            this.chefProjet ="acteur"
            
          }
          
        else if(2){
          this.chefProjet="responsable" ;
          
        }else{
          this.chefProjet = "client"
        }
        console.log(this.chefProjet)
      }
      });
      
    }
  }
