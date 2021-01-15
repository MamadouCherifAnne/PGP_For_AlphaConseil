import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RechargeService } from '../rechargeData/recharge.service';
import { AuthentificationService } from '../services/authentification.service';
import { TacheService } from '../services/tache.service';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  public listofNewAffectation:any=[];
  public currentUser:any;
  public loading:any;
  public openNotif:boolean = false;
  public messageNonLus:any;
  constructor(
    public authService:AuthentificationService,
    public tacheService:TacheService,
    public loaderService:RechargeService,
    public  changedetector: ChangeDetectorRef,
    public userService:UtilisateurService,
   
  ){
    setInterval(() => {
      //this.numberOfTicks++;
      // require view to be updated
      this.changedetector.markForCheck();
    }, 1000);
  }
  ngAfterViewChecked(): void {
   /* this.loaderService.isLoading.subscribe(value=>{
      this.changedetector.detectChanges();
    });*/
  }
  /*ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    //this.loading = this.loaderService.isLoading;
    this.loaderService.isLoading.subscribe(value=>{
      this.changedetector.detectChanges();
    });
    
  }*/

  ngOnInit(){
    this.loading = this.loaderService.isLoading;
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
     // this.tacheService.getLatestAffectationOfUser(username).subscribe(data=>{
       this.userService.getMessageRecievedNonLus(username).subscribe(data=>{
        if(data){
          this.messageNonLus = data;
        }
      });
    }
  }


}
