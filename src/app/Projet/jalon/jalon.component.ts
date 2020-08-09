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


@Component({
  selector: 'app-jalon',
  templateUrl: './jalon.component.html',
  styleUrls: ['./jalon.component.scss']
})
export class JalonComponent implements OnInit {

 
  tache:Tache
  preced:object[] =[];
  taskfield: object;
  ajoutJalon:FormGroup;
  jalons:ITache[]
  lateJalon:ITache[]=[]
  nombreJalon:number
  projectId:number

  constructor(private userService:UtilisateurService,
    private formBuilder:FormBuilder,
    private projetService:ProjetService,
    private fenetre:MatDialog,
    private taskService:TacheService,
    private route:ActivatedRoute,
    ){}

    ngOnInit(){
      this.projectId = parseInt(this.route.snapshot.paramMap.get('id'));
     
      // Recuperer tout les jalons
      this.projetService.getProjectJalons(this.projectId).subscribe((data)=>{
        if(data){
          this.jalons=data;
          this.nombreJalon=this.jalons.length
          for(let j of this.jalons){
            if(new Date(j.debutTache ) < new Date()){
              this.lateJalon.push(j);
              console.log(j.nomTache+"#   #"+j.debutTache)
            }
            }
            console.log(new Date())
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
       fenetreConfig.data;
       this.fenetre.open(AddJalonComponent,fenetreConfig)
       .afterClosed().subscribe(result => {
        this.refresh();
      });
  
    }
  
    refresh() {
     
      this.projetService.getProjectJalons(1).subscribe((data)=>{
        if(data){
          this.jalons=data;
          for(let j of this.jalons){
            if(j.debutTache < new Date()){
              this.lateJalon.push(j);
            }
            }
            console.log(this.lateJalon)
        } 
      });
    }
    
  }
