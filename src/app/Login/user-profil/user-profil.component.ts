import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ActivatedRoute } from '@angular/router';
import { Utilisateur } from 'src/app/Utilisateur/Utilisateur';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Message } from 'src/app/Message/Message';
import { PageEvent } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.scss']
})
export class UserProfilComponent implements OnInit {

  public currentUser:Utilisateur;
  public config:any;
  public messages:any;
  public messageForm:FormGroup;
  public message: Message = new Message();
  destinataire:any;
  public firstLetterNom: String;
  public firstLetterPrenom: String;
  public pageChanged:PageEvent;
  public allUsers:any;

  constructor(
    public authService: AuthentificationService,
    public userService:UtilisateurService,
    private actRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    public notifService:NotificationsService
  ) {
     this.userService.getUsers().subscribe(result=>{
       if(result){
         this.allUsers = result;
       }
     })
  }

  ngOnInit() { 

    // reinitialiser le nombre des messages non lu a 0
    this.userService.nombreMessageNonLu=0;
    this.messageForm=this.formBuilder.group({
      'messageContent':["",[Validators.required,Validators.maxLength(100)]],
      'destinataire':[this.destinataire,[Validators.required]]
    });

    //let id = this.actRoute.snapshot.paramMap.get('id');
    let username = this.authService.getCurrentUser();
   
    this.userService.getUserByUsername(username).subscribe(data=>{
      if(data){
        this.currentUser = data;
        this.firstLetterNom = this.currentUser.nom.charAt(0).toUpperCase();
        this.firstLetterPrenom = this.currentUser.prenom.charAt(0).toUpperCase();
        this.userService.getMessageRecieved(this.currentUser.idUser).subscribe(result=>{
          if(result){
            this.messages = result;
            this.config = {
              itemsPerPage:5,
              currentPage: 1,
              totalItems: this.messages.length,
            };
          }
        });
        
      }
    });
    
    
    
  }


    // Methode d'envoide message de la part d'un utilisateur a un autre
    onSendMessage(){
      let exped = this.currentUser;
      this.message.messageContent=this.messageForm.get('messageContent').value;
      let username = this.messageForm.get('destinataire').value;
        //Recuperation de l'objet editeur du message
         // this.userService.getUserByIdUser(this.expediteur).subscribe(data=>{
            /*this.userService.getUserByUsername(username).subscribe(data=>{
              console.log(data);
          if(data){
            this.destinataire = data;
            console.log(data);
            //Recuperation de l'objet destinataire du message
                */
               
                this.message.editUser=this.currentUser;
                this.message.destinataire = this.destinataire;
                this.message.dateEnvoie =new Date();
                this.userService.sendMessageToUser(this.message).subscribe(done=>{
                  if(done){
                    console.log("Message envoye");
                    this.modifSuccess("le message a été envoyé avec succés")
                  }
                    else{
                  window.alert("Impossible de trouver un utilisateur avec ce username! assuerz vous des vos données");
                  this.messageForm.get('destinataire').setValue('')
                  this.modifEchec("le message n'est pas envoyé, verifier vos informations");
                }

                
                });
                this.messageForm.reset();
          

    }
    
    refresh(){
      this.userService.nombreMessageNonLu=0;
      let username = this.authService.getCurrentUser();
      this.userService.getUserByUsername(username).subscribe(data=>{
        if(data){
          this.currentUser = data;
        }

      });
    }

    public deleteMessage(idmess){
      // a faire
      this.userService.deleTeMessage(idmess).subscribe(result=>{
        this.modifSuccess(result);
      })
    }


    modifSuccess(message){
      this.notifService.success('Confirmation', message, {
        timeOut : 3000,
        showProgressBar : true,
      });
    }
      modifEchec(message){
        this.notifService.warn('Echec', message, {
          timeOut : 3000,
          showProgressBar : true,
        });
    }
}
