import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UtilisateurService} from 'src/app/services/utilisateur.service';
import { Utilisateur } from '../Utilisateur';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Message } from 'src/app/Message/Message';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.scss']
})
export class DetailUtilisateurComponent implements OnInit {

  currentUser:any;
  userProfessions:string[]=[];
  messageForm:FormGroup;
  message:Message =new Message();
  controlForm: number= 1;
  expediteur:number;
  destinataire:Utilisateur;
  

  constructor(private userService:UtilisateurService,
               private route:ActivatedRoute,
               private formBuilder:FormBuilder,
               private authService: AuthentificationService
    ) { }

  ngOnInit() {
    //Initialisation du formulaire
    this.messageForm =this.formBuilder.group({
      'messageContent':[this.message.messageContent,[Validators.required]]
    });
     
    // Recuperer l'identifiant de l'utilisateur sollicite
      let idUser =parseInt(this.route.snapshot.paramMap.get('iduser'));
       // Getter lutilisateur en cours 
       this.userService.getUserByIdUser(idUser).subscribe((data)=>{
          if(data){
            this.currentUser =data;
           for(let p of this.currentUser.professions){
             this.userProfessions.push(p.titreProfession)
           }
            console.log(this.currentUser);
          }
       });

}
    onMessageForm(){
      this.messageForm =this.formBuilder.group({
        'messageContent':[this.message.messageContent,[Validators.required]]
      });

    }

    
  // Methode d'envoide message de la part d'un utilisateur a un autre
  onSendMessage(){
    let exped = this.authService.getCurrentUser();
    
    this.expediteur = 14;
    this.destinataire=this.currentUser;
    this.message.messageContent=this.messageForm.get('messageContent').value;
    if(exped != null){
      //Recuperation de l'objet editeur du message
       // this.userService.getUserByIdUser(this.expediteur).subscribe(data=>{
          this.userService.getUserByUsername(exped).subscribe(data=>{
        if(data){
          let userEDit = data;
          //Recuperation de l'objet destinataire du message
              
              this.message.editUser=userEDit;
              this.message.destinataire = this.destinataire;
              this.message.dateEnvoie =new Date();
              this.userService.sendMessageToUser(this.message).subscribe(done=>{
                if(done){
                  console.log("Message envoye");
                }
              });
              this.messageForm.reset();
        }
      });
    }
  }
}
