import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators} from '@angular/forms';
import{ActivatedRoute} from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Message } from '../Message';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss']
})
export class MessagerieComponent implements OnInit {

  messageForm:FormGroup;
  message: Message =new Message();
  expediteur:number;
  destinataire:number;

  constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,
    private userService:UtilisateurService) {
  }

  ngOnInit() {
    // Recuperer  L'utilisateur qui envoie le message
    this.expediteur = 2;
    this.destinataire = parseInt(this.route.snapshot.paramMap.get('idDestinataire'));

    this.messageForm = this.formBuilder.group({
      "messageContent":[this.message.messageContent,[Validators.required]]
    });
  }

  // Methode d'envoide message de la part d'un utilisateur a un autre
  onSendMessage(){
    this.message.messageContent=this.messageForm.get('messageContent').value;
    if(this.expediteur != this.destinataire){
      //Recuperation de l'objet editeur du message
        this.userService.getUserByIdUser(this.expediteur).subscribe(data=>{
        if(data){
          let userEDit = data;
          //Recuperation de l'objet destinataire du message

          this.userService.getUserByIdUser(this.destinataire).subscribe(desti=>{
            if(desti){
              let userDest=desti;
              this.message.editUser=userEDit;
              this.message.destinataire = userDest;
              this.message.dateEnvoie =new Date();
              this.userService.sendMessageToUser(this.message);
            }
          });
        }
      });
    }
  }


}
