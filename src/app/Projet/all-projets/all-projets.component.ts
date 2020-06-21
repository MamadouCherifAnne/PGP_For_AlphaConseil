import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/services/projet.service';
import { AjoutProjetComponent } from "../ajout-projet/ajout-projet.component";
import {MatDialog, MatDialogConfig} from "@angular/material";

@Component({
  selector: 'app-all-projets',
  templateUrl: './all-projets.component.html',
  styleUrls: ['./all-projets.component.css']
})
export class AllProjetsComponent implements OnInit {
  projets : any;

  constructor(private projetService: ProjetService,
    private dialog : MatDialog) { }

  ngOnInit() {
    let resp = this.projetService.getAllProjet();
    resp.subscribe((data)=>this.projets=data);
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutProjetComponent, dialogConfig);
  }
}
