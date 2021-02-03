import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-projet-liens',
  templateUrl: './projet-liens.component.html',
  styleUrls: ['./projet-liens.component.scss']
})
export class ProjetLiensComponent implements OnInit {

  @Input() public idProjet: any;
  public projectId:number;

  constructor() { }

  ngOnInit() {
    this.projectId =this.idProjet;
  }

}
