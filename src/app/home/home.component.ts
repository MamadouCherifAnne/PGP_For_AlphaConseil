import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import { title } from 'process';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
 imageVar: String = "assets/images/alfaconseil1.jpg";
 constructor(private notifService: NotificationsService,
  private authService:AuthentificationService,
  private route:Router) { }

  ngOnInit() {
  }

  public gotORegesitrer(){
    this.route.navigate(['registration']);
  }
 
}
