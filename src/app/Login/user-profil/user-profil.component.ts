import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ActivatedRoute } from '@angular/router';
import { Utilisateur } from 'src/app/Utilisateur/Utilisateur';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Message } from 'src/app/Message/Message';
import { PageEvent } from '@angular/material';

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

  constructor(
    public authService: AuthentificationService,
    public userService:UtilisateurService,
    private actRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
  ) {
   
  }

  ngOnInit() { 
    this.messageForm=this.formBuilder.group({
      'messageContent':["",[Validators.required,Validators.maxLength(100)]],
      'destinataire':["",[Validators.required,Validators.maxLength(50)]]
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
            this.userService.getUserByUsername(username).subscribe(data=>{
              console.log(data);
          if(data){
            this.destinataire = data;
            console.log(data);
            //Recuperation de l'objet destinataire du message
                
                this.message.editUser=this.currentUser;
                this.message.destinataire = this.destinataire;
                this.message.dateEnvoie =new Date();
                this.userService.sendMessageToUser(this.message).subscribe(done=>{
                  if(done){
                    console.log("Message envoye");
                  }
                });
                this.messageForm.reset();
          }else{
            window.alert("Impossible de trouver un utilisateur avec ce username! assuerz vous des vos données");
            this.messageForm.get('destinataire').setValue('')
          }
        });

    }
    
    refresh(){
      let username = this.authService.getCurrentUser();
      this.userService.getUserByUsername(username).subscribe(data=>{
        if(data){
          this.currentUser = data;
        }

      });
    }

    public deleteMessage(idmess){
      // a faire
      return "supprimer message";
    }
}
