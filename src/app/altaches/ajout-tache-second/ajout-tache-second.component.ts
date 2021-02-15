import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Tache } from 'src/app/Tache/Tache';
import {TacheService} from "src/app/services/tache.service";
import {ProjetService} from 'src/app/services/projet.service';
import {PhaseService} from 'src/app/services/phase.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-tache-second',
  templateUrl: './ajout-tache-second.component.html',
  styleUrls: ['./ajout-tache-second.component.scss']
})
export class AjoutTacheSecondComponent implements OnInit {
  niveauPriorite = {"faible": 'faible', "moyen": 'Moyen', "fort": 'Fort'};
  tache : Tache = new Tache();
  AjoutTacheSecndForm: FormGroup;
  AjoutMessage: any;
  projet: any;
  listTache: any;
  newPhase: any;
  currentUser:any;

  @Input() public idProjet: any;
  @Input() public idPhase: any;

  constructor(private tacheService: TacheService, private projetService: ProjetService,
     private formBuilder: FormBuilder, private phaseService: PhaseService ,
     public userService:UtilisateurService,
     public authService:AuthentificationService,
     private  router: Router,
     @Inject(DOCUMENT) private _document: Document ) { }

  ngOnInit() {
    let username = this.authService.getCurrentUser();
    this.userService.getUserByUsername(username).subscribe(data=>{
      if(data){
        this.currentUser = data;
      }
    })
    this.AjoutTacheSecndForm = this.formBuilder.group({
      "nomTache": [this.tache.nomTache,Validators.required],
      "description": this.tache.description,
      "chargeTache": this.tache.chargeTache,
      "niveauPriorite": this.tache.niveauPriorite,
      "duree": [this.tache.duree, Validators.required],
      "debutTache": [this.tache.debutTache,Validators.required],
      "finTache": [this.tache.finTache,Validators.required],
      "tauxAvancement" : [this.tache.tauxAvancement],
      "tachePrecedente" : [this.tache.tachePrecedente],
    })  

      //......................Recuperation du projet par son id.....................
   this.projetService.getById(this.idProjet).subscribe(data=>{
    if(data){
      this.projet=data;
     }
   });

   //...................Recuperation de la liste de tache d'un projet....................
   this.projetService.projectAllTasks(this.idProjet).subscribe(data=>{
     if(data){
       this.listTache=data;
      }
     });

    this.phaseService.findById(this.idPhase).subscribe(data=>{
      if(data){
        this.newPhase=data;
      }
    })
      
  }

  formatLabel(value: number) {
    return value + '%'; 
  }

  Ajouter(){
    console.log("fof"+this.idProjet);
    console.log("fif"+this.newPhase);
    console.log("Le user courant est "+this.currentUser.username)
    this.tache.createur= this.currentUser;
    this.tache.phase = this.newPhase;
    let val = this.tacheService.ajoutTache(this.tache);
    val.subscribe((data)=>{
      if(data){
        this.AjoutMessage = data;
        this.refreshPage();
      }
    });

    //..............................................
    this.AjoutTacheSecndForm.reset();

  }


  refreshPage() {
    //this._document.defaultView.location.reload();
    let currentUrl = this.router.url;
    console.log("voici le current URL ADD SECOND TACHE"+ currentUrl)
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

}
