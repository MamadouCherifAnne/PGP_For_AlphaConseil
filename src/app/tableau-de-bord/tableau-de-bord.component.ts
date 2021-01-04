import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})
export class TableauDeBordComponent implements OnInit {
  public msgLu:any;
  public messageNonLu:number=0;
  public currentUser:any;
  constructor(
    public authService:AuthentificationService,
    public userService:UtilisateurService
  ) { 

  }

  ngOnInit() {

    let username = this.authService.getCurrentUser();
    this.userService.getUserByUsername(username).subscribe(result=>{
      if(result){
        this.currentUser =result;
      }
    });
    this.userService.getMessageRecievedNonLus(username).subscribe(data=>{
      if(data){
        this.msgLu = data;
        this.messageNonLu=this.msgLu.msgNonLu;
        console.log("les messaes non lu"+data);
      }
    });
  }

}
