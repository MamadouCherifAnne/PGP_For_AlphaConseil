import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import {IUtilisateur} from '../IUtilisateur'
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog,MatDialogConfig, MatTableDataSource, MatSort,MatPaginator} from '@angular/material'
import { AjoutUtilisateurComponent } from '../ajout-utilisateur/ajout-utilisateur.component';
import { UpdateUtilisateurComponent } from '../update-utilisateur/update-utilisateur.component';
@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.scss']
})
export class ListeUtilisateurComponent implements OnInit {

  public users: IUtilisateur[]= [];
  message:any;
  userDataSource =new MatTableDataSource<any>();
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator

  displayedColumns: string [] = ['icon','username', 'prenom', 'email', 'adresse', 'telephone','Action'];
    
  constructor(private userService:UtilisateurService,
     private router:Router, 
     private route:ActivatedRoute,
     private changeDetect: ChangeDetectorRef,
     private fenetre:MatDialog) { }

  ngOnInit() {
      // Charger la liste des utilisaterus au mment de llancement de la page
      this.refresh();
  }

  public deleteUser(id){
    console.log("bonsoir")
    this.userService.deleteUser(id).subscribe
      (data => {
        if(data){
          console.log(data)
      this.refresh();
        }
  });
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
    ).afterClosed().subscribe(result => {
      this.refresh();
    });

  }
  public goToAddUser(){
    //this.router.navigate(["add"],{relativeTo: this.route});
     //la configuration du pop up
     const fenetreConfig= new MatDialogConfig();
     fenetreConfig.disableClose =true;
     fenetreConfig.autoFocus = true;
     fenetreConfig.width="65%";
     fenetreConfig.data;
     this.fenetre.open(AjoutUtilisateurComponent,fenetreConfig)
     .afterClosed().subscribe(result => {
      this.refresh();
    });
;
  }

  refresh() {
    this.userService.getUsers().subscribe((allUsers:IUtilisateur[])=>{
      this.userDataSource.data=allUsers;
      this.userDataSource.sort=this.sort;
      this.userDataSource.paginator= this.paginator;
    })
  }

  // Aller sur le Gantt de l'utilisateur
  goToGanttUser(user){
    this.router.navigate(["/utilisateur/gantt", user]);
  }

  // Acceder aux details de l'utilisateur
  goToUserDetails(user){
    this.router.navigate(["/utilisateur/details",user]);
  }
}
