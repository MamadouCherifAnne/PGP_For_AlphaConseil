import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/services/projet.service';
import { AjoutProjetComponent } from "../ajout-projet/ajout-projet.component";
import {EditProjetComponent} from "../edit-projet/edit-projet.component";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {Router, RouterState} from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-all-projets',
  templateUrl: './all-projets.component.html',
  styleUrls: ['./all-projets.component.scss']
})
export class AllProjetsComponent implements OnInit {
  projets : any;
  delateMessage: any;
  currentUser:any;
  constructor(private projetService: ProjetService,
    private authService:AuthentificationService,
    private dialog : MatDialog, private  router: Router) { }

  ngOnInit() {
    this.currentUser =this.authService.getCurrentUser();
   // let resp = this.projetService.getAllProjet();
   let resp = this.projetService.allProjectOfUser(this.currentUser )
    resp.subscribe(data=>{
      this.projets=data
      console.log(data)
    })
  
    this. refresh();
  }

  onCreate(){
    if(this.authService.isSuperAdmin ==true){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(AjoutProjetComponent, dialogConfig).afterClosed()
    .subscribe(result => {
      this.refresh();
    });
  }else{
    window.alert("Vous n'avez pas le droit d'effectuer cette opération");
  }
  }


  edit(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {projet: element};
    this.dialog.open(EditProjetComponent, dialogConfig)
    .afterClosed()
    .subscribe(result => {
      this.refresh();
    });
  }

  delete(idProjet){
    if(this.authService.isSuperAdmin == true){
    if(confirm('Etes vous sur de vouloir supprimer ?')){
      let theValue = this.projetService.delete(idProjet);
      theValue.subscribe((data)=>{this.delateMessage=data;
      
    }); 
    this.refresh();
  }else{
    window.alert("vous n'avez les droits necessaires")
  }
      
    }
    
  }

//renvoie l'id du projet vers le vue-ensemble component 
  onSelect(projet){
    this.router.navigate(["/projet", projet.numProjet]);
  }

  refresh() {
    let resp = this.projetService.allProjectOfUser(this.currentUser )
    resp.subscribe((data)=>this.projets=data);
  }

}
