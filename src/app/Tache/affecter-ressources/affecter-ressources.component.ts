import { Component, OnInit, Inject } from '@angular/core';
import { Utilisateur } from 'src/app/Utilisateur/Utilisateur';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TacheService } from 'src/app/services/tache.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { PhaseService } from 'src/app/services/phase.service';
import { Tache } from 'src/app/Tache/Tache';
import { UserToTask } from 'src/app/Utilisateur//UserToTask';
import { UtilisateurAffectation } from 'src/app/Utilisateur/UtilisateurAffectation';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {EmailService} from 'src/app/services/email.service';
import {Mail} from 'src/app/Email/email';
import { ProjetService } from 'src/app/services/projet.service';


@Component({
  selector: 'app-affecter-ressources',
  templateUrl: './affecter-ressources.component.html',
  styleUrls: ['./affecter-ressources.component.scss']
})
export class AffecterRessourcesComponent implements OnInit {

  public affectationForm: FormGroup;
  public message: any;
  ressource: UserToTask = new UserToTask();
  public affectation: UtilisateurAffectation = new UtilisateurAffectation();
  allPhases: any;
  idTache:number;
  public idProjet:number;
  allUsers:any;
  mail : Mail = new Mail();
  ceTache : any;
  userMail: any;
  retourMsg: any;

  constructor(private tacheService: TacheService ,
    private userService:UtilisateurService,
    private emailService: EmailService,
    public projetService:ProjetService,
    private phaseService:PhaseService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fenetreReference: MatDialogRef<AffecterRessourcesComponent>
   ) { }

  ngOnInit() {
    // Preparation du formulaire d' affectation de ressources a une tache
    this.idProjet=this.data.projet;
    this.affectationForm = this.formBuilder.group({
    "ressources": [this.ressource.idUser, [Validators.required]],
    "tempsPasser": [this.affectation.tempsPasser, [Validators.required]]
    })
    this.idTache=this.data.tache.numTache
    /*this.userService.getUsers().subscribe((data)=>{
      if(data){
      this.allUsers=data;
      }
    });*/

    this.projetService.getProjectMembre(this.idProjet).subscribe((data)=>{
      if(data){
      this.allUsers=data;
      }
    });
  }

  affecterRessource(){
    this.idTache=this.data.tache.numTache
    this.ressource.idUser=this.affectationForm.get("ressources").value;
    this.ressource.idTache=this.idTache;
    this.affectation.tempsPasser= this.affectationForm.get("tempsPasser").value
    this.affectation.user_task =this.ressource;
    this.affectation.dateAffectation = new Date();
    console.log("//........affectation..............."+this.affectation.dateAffectation)
    console.log(this.affectation)
    this.userService.affectToTask(this.affectation)
    .subscribe(data=>{
      if(data){
        let reponse:String  ="false";
        reponse=data;
        if(reponse == "true"){
          this.message="Affectation realisé avec succés";
           //envoyer des mails au utilisateurs ajouter à la taches; 
     //
  /*   this.userService.getUserByIdUser(this.ressource.idUser).subscribe(data=>{
      if(data){
        this.userMail = data;
      }
    })
    this.tacheService.getTache(this.ressource.idTache).subscribe(data=>{
      if(data){
        this.ceTache = data;
        console.log("c'est la le p", this.ceTache);
      }
      //mail do etre le mail de l'uitilisateur connecté donc à modifier
     /* this.mail.to.push("bows4844@gmail.com");
      console.log("icisssssss"+this.mail.to);
      this.mail.subject = "Mamadou vient de vous affecter à une tache";
      console.log("je suis la"+this.mail.subject);
      this.mail.body = "Détails de la tache: \n - Nom de la tache: "+this.ceTache.nomTache+"\n -Débute: "+this.ceTache.debutTache+"\n -Termine: "+this.ceTache.finTache+
      "\n\n Voici le lien pour voir la tache: http://localhost:4200/Taches/1";
      this.emailService.simpleEmail(this.mail).subscribe(data=>{
        if(data){
          this.retourMsg =  data;
        }
        console.log("help its works");
      });
      console.log("hi"+this.mail.to+ this.mail.subject+this.mail.body);
    });
    */

        }else{
          this.message ="Cet utilisateur est dèja affecté à cette tache";
          window.alert(this.message);
          this.onFermer()
        }
        console.log(this.message)
      }
    })
    this.affectationForm.reset()
    
  }

  // Methode de la fermeture du modal ouvert
  public onFermer(){
    this.affectationForm.reset();
    this.fenetreReference.close();
  }


}
