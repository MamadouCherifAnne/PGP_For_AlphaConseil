import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthentificationService } from './services/authentification.service';
import { UtilisateurService } from './services/utilisateur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor( public userService:UtilisateurService){
    this.userService.getMessageNonLus();
  }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
   this
  }
  


  title = 'alpha-conseil-PGP';

}
