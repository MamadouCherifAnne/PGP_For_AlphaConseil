import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 
  constructor(
    public authService:AuthentificationService
  ){}

  ngOnInit(){}

  logout() {
    this.authService.doLogout()
  }

}
