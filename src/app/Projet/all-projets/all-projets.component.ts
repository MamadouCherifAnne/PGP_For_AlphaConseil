import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/services/projet.service';
import { AjoutProjetComponent } from "../ajout-projet/ajout-projet.component";
import {EditProjetComponent} from "../edit-projet/edit-projet.component";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {Router, RouterState} from '@angular/router';

@Component({
  selector: 'app-all-projets',
  templateUrl: './all-projets.component.html',
  styleUrls: ['./all-projets.component.scss']
})
export class AllProjetsComponent implements OnInit {
  projets : any;
  delateMessage: any;
  constructor(private projetService: ProjetService,
    private dialog : MatDialog, private  router: Router) { }

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


  edit(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {projet: element};
    this.dialog.open(EditProjetComponent, dialogConfig);
  }

  delete(idProjet){
    if(confirm('Etes vous sur de vouloir supprimer ?')){
      let theValue = this.projetService.delete(idProjet);
      theValue.subscribe((data)=>this.delateMessage=data); 
    }
    
  }

//renvoie l'id du projet vers le vue-ensemble component 
  onSelect(projet){
    this.router.navigate(["/projet", projet.numProjet]);
  }
}
