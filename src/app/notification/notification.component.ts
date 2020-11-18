import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { TacheService } from '../services/tache.service';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public listofNewAffectation:any;
  public currentUser:any;
  constructor(public tacheService:TacheService,
    public authService:AuthentificationService ,
    public userService:UtilisateurService
    ) { }

  ngOnInit() {
    let username = this.authService.getCurrentUser();
    this.tacheService.getLatestAffectationOfUser(username).subscribe(data=>{
      if(data){
       this.listofNewAffectation = data;
      }
    });
  }

}
