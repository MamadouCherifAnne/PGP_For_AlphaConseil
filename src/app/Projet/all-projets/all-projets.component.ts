import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/services/projet.service';
import { AjoutProjetComponent } from "../ajout-projet/ajout-projet.component";
import {EditProjetComponent} from "../edit-projet/edit-projet.component";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {Router, RouterState} from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-all-projets',
  templateUrl: './all-projets.component.html',
  styleUrls: ['./all-projets.component.scss']
})
export class AllProjetsComponent implements OnInit {
  public isAdmin:boolean = false;
  public isSuperAdmin:boolean = false;
  public projets : any;
  public entrepriseNom:String;
  public delateMessage: any;
  public currentUser:any;
  public userConnected:any;
  constructor(public projetService: ProjetService,
    public userService:UtilisateurService ,
    public authService:AuthentificationService,
    public  dialog : MatDialog, public  router: Router) { }

  ngOnInit() {

    // get the role this user if have's privilleges
    this.isAdmin = this.authService.isAdmin;
    this.isSuperAdmin = this.authService.isSuperAdmin;
    // fin de verif des privilleges 
    console.log("entreprise name"+this.entrepriseNom)
    this.entrepriseNom = this.authService.getEntrepriseName;
    console.log("entreprise name"+this.authService.getEntrepriseName)
    this.currentUser =this.authService.getCurrentUser();
   // let resp = this.projetService.getAllProjet();
  // let resp = this.projetService.allProjectOfUser(this.currentUser )
 /* let resp = this.projetService.getProjectsOfUser(this.currentUser)
    resp.subscribe(data=>{
      if(data){
      this.projets=data
      
      console.log("entreprise name"+this.entrepriseNom)
      console.log(data)
      }
    })*/
  
    this. refresh();
  }

  onCreate(){
   // if(this.authService.isSuperAdmin ==true){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data={defaultProjectOwner:this.userConnected}
    dialogConfig.width = "60%";
    this.dialog.open(AjoutProjetComponent, dialogConfig).afterClosed()
    .subscribe(result => {
      this.refresh();
    });
 /* }else{
    window.alert("Vous n'avez pas le droit d'effectuer cette opération");
  }*/
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
    this.userService.getUserByUsername(this.currentUser).subscribe(result=>{
      if(result){
        this.userConnected = result;
      }
    })
    // Si c'est un admin dans l'entreprise il peut voir tout les projets de l'entreprise
    
    if(this.isAdmin == true){
      let resp = this.projetService.getAllProjet();
      resp.subscribe((data)=>this.projets=data);
    }
    else{
      // Sinon on affiche pour lui que les projets dont il affecte comme membre;
      let resp = this.projetService.getProjectsOfUser(this.currentUser )
      resp.subscribe((data)=>this.projets=data);
    }
  }

}
