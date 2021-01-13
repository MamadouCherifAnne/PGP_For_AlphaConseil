import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
 imageVar: String = "assets/images/alfaconseil1.jpg";
 constructor() { }

  ngOnInit() {
  }

}
