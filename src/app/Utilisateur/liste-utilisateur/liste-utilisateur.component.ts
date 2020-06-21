import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import {IUtilisateur} from '../IUtilisateur'
@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.css']
})
export class ListeUtilisateurComponent implements OnInit {

  public users: IUtilisateur[]= [];
  message:any;

  displayedColumns: string [] = ['username', 'prenom', 'email', 'adresse', 'telephone', 'role', 'profession','Action'];
    
  constructor(private userService:UtilisateurService) { }

  ngOnInit() {
      // Charger la liste des utilisaterus au mment de llancement de la page
      this.userService.getUsers()
      .subscribe((data)=>this.users=data);
  }

  public deleteUser(){

    this.userService.deleteUser(32).subscribe((data)=>this.message=data);
   
  }

}
