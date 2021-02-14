import { Component, OnInit } from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import { title } from 'process';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
 imageVar: String = "assets/images/alfaconseil1.jpg";
 constructor(private notifService: NotificationsService) { }

  ngOnInit() {
  }

 
}
