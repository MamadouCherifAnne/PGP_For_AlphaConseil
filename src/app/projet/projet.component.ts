import { Component, OnInit } from '@angular/core';
import { ProjetService } from "../services/projet.service";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {

  constructor(private projetService: ProjetService) { }

  ngOnInit() {
  }

}
