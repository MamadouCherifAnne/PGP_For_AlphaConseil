import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ProjetService } from 'src/app/services/projet.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import {Router, RouterState} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {EditProjetComponent} from "../edit-projet/edit-projet.component";

@Component({
  selector: 'app-finishedprojects',
  templateUrl: './finishedprojects.component.html',
  styleUrls: ['./finishedprojects.component.scss']
})
export class FinishedprojectsComponent implements OnInit {

  public isAdmin:boolean = false;
  public isSuperAdmin:boolean = false;
  public projets : any;
  public entrepriseNom:String;
  public delateMessage: any;
  public currentUser:any;
  public userConnected:any;

  constructor(public authService: AuthentificationService,public  dialog : MatDialog,
    public projetService: ProjetService, public userService:UtilisateurService, public  router: Router) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin;
    this.isSuperAdmin = this.authService.isSuperAdmin;
    // fin de verif des privilleges 
    console.log("entreprise name"+this.entrepriseNom)
    this.entrepriseNom = this.authService.getEntrepriseName;
    console.log("entreprise name"+this.authService.getEntrepriseName)
    this.currentUser =this.authService.getCurrentUser();
   // let resp = this.projetService.getAllProjet();
  // let resp = this.projetService.allProjectOfUser(this.currentUser )
 
  
    this. refresh();
  }

  refresh() {
    this.userService.getUserByUsername(this.currentUser).subscribe(result=>{
      if(result){
        this.userConnected = result;
      }
    })

    
    if(this.authService.isAdmin || this.authService.isSuperAdmin){
      let resp = this.userService.getProjetTerminesAdmin();
      resp.subscribe((data)=>this.projets=data);
  
     }else{
      let resp = this.userService.getProjetTermines(this.currentUser)
      resp.subscribe((data)=>this.projets=data);
     }
      
    
  }

  onSelect(projet){
    this.router.navigate(["/projet", projet.numProjet]);
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

}
