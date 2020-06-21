import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import {IUtilisateur} from '../IUtilisateur'
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog,MatDialogConfig} from '@angular/material'
import { AjoutUtilisateurComponent } from '../ajout-utilisateur/ajout-utilisateur.component';
import { UpdateUtilisateurComponent } from '../update-utilisateur/update-utilisateur.component';
@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.css']
})
export class ListeUtilisateurComponent implements OnInit {

  public users: IUtilisateur[]= [];
  message:any;

  displayedColumns: string [] = ['username', 'prenom', 'email', 'adresse', 'telephone', 'role', 'profession','Action'];
    
  constructor(private userService:UtilisateurService,
     private router:Router, 
     private route:ActivatedRoute,
     private fenetre:MatDialog) { }

  ngOnInit() {
      // Charger la liste des utilisaterus au mment de llancement de la page
      this.userService.getUsers()
      .subscribe((data)=>this.users=data);
  }

  public deleteUser(id){

    this.userService.deleteUser(id).subscribe((data)=>this.message=data);
  }

  // Navigation vers la page update utilisateur
  public goToUpdateUser(nom){

    //this.router.navigate(["update"],{relativeTo: this.route});
    const fenetreConfig= new MatDialogConfig();
    fenetreConfig.disableClose =true;
    fenetreConfig.autoFocus = true;
    fenetreConfig.width="65%";
    fenetreConfig.data={user : nom};
    this.fenetre.open(UpdateUtilisateurComponent, fenetreConfig
    );

  }
  public goToAddUser(){
    //this.router.navigate(["add"],{relativeTo: this.route});
     //la configuration du pop up
     const fenetreConfig= new MatDialogConfig();
     fenetreConfig.disableClose =true;
     fenetreConfig.autoFocus = true;
     fenetreConfig.width="65%";
     fenetreConfig.data;
     this.fenetre.open(AjoutUtilisateurComponent,fenetreConfig);

  }

}
