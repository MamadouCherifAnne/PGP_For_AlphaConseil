import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public listofNewAffectation:any=[];
  public currentUser:any;

  public openNotif:boolean = false;
  constructor(
    public authService:AuthentificationService,
    public tacheService:TacheService
  ){
    ;
  }

  ngOnInit(){
    this.initialiser()
  }

  logout() {
    this.authService.doLogout()
  }

  openNotification(state: boolean) {
    this.openNotif = state;
  }

  public initialiser(){
    if(this.authService.isLoggedIn){
      let username = this.authService.getCurrentUser();
      this.tacheService.getLatestAffectationOfUser(username).subscribe(data=>{
        if(data){
          this.listofNewAffectation = data;
        }
      });
    }
  }
}
