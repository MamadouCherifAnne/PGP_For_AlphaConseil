import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import {IUtilisateur} from '../IUtilisateur'
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog,MatDialogConfig, MatTableDataSource, MatSort,MatPaginator} from '@angular/material'
import { AjoutUtilisateurComponent } from '../ajout-utilisateur/ajout-utilisateur.component';
import { UpdateUtilisateurComponent } from '../update-utilisateur/update-utilisateur.component';
import { AuthentificationService } from 'src/app/services/authentification.service';
@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.scss']
})
export class ListeUtilisateurComponent implements OnInit {

  public users: IUtilisateur[]= [];
  public rechercheKey:string;
  public message:any;
  userDataSource =new MatTableDataSource<any>();
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator

  displayedColumns: string [] = ['icon','username', 'prenom', 'email', 'adresse', 'telephone','Action'];
    
  constructor(private userService:UtilisateurService,
    public authService:AuthentificationService, 
     public router:Router, 
     public route:ActivatedRoute,
     public changeDetect: ChangeDetectorRef,
     public fenetre:MatDialog) { }

  ngOnInit() {
      // Charger la liste des utilisaterus au mment de llancement de la page
      this.refresh();
  }

  public deleteUser(id){
    if(this.authService.isSuperAdmin==true){
    let confirm :boolean =  window.confirm("êtes vous sûre de vouloir supprimer cet utilisateur")
    if(confirm == true){
    this.userService.deleteUser(id).subscribe
      (data => {
        if(data){
          console.log(data)
      this.refresh();
        }
  });
}
}
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
  }

  refresh() {
    this.userService.getUsers().subscribe((allUsers:IUtilisateur[])=>{
      this.userDataSource.data=allUsers;
      this.userDataSource.sort=this.sort;
      this.paginator._intl.itemsPerPageLabel="élements par page";
      this.paginator._intl.nextPageLabel="suivant";
      this.paginator._intl.previousPageLabel ="précédent";
      
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        const start = page * pageSize + 1;
        const end = (page + 1) * pageSize;
        return `${start} - ${end} de ${length}`;
      };
      this.userDataSource.paginator= this.paginator;
    })
  }

  // Aller sur le Gantt de l'utilisateur
  public goToGanttUser(user){
    this.router.navigate(["/utilisateur/gantt", user]);
  }

  // Acceder aux details de l'utilisateur
  public goToUserDetails(user){
    this.router.navigate(["/utilisateur/details",user]);
  }

  // Application de  filtre dans la recherche des utilisateurs a partir de la liste des users
  public  viderRecherche(){
    this.rechercheKey ="";
    this.appliquerLeFiltre();
  }
  public appliquerLeFiltre(){
    this.userDataSource.filter = this.rechercheKey.trim().toLowerCase();
  }

}
