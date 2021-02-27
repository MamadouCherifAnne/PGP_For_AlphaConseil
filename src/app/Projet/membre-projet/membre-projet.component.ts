import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ProjetService } from 'src/app/services/projet.service';
import { ProjectUserID } from '../UserProjectID';
import { AddMembreComponent } from './add-membre/add-membre.component';

@Component({
  selector: 'app-membre-projet',
  templateUrl: './membre-projet.component.html',
  styleUrls: ['./membre-projet.component.scss']
})
export class MembreProjetComponent implements OnInit {

  public currentProject:any;
  public idProjet:number;
  public listofMembres:[];
  public rechercheKey:string;
  public nombreMembre : number = 0;

  // La dataSource pour le tableau des membres 
  public userDataSource : MatTableDataSource<any>;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator

  displayedColumns: string [] = ['username', 'Role',  'telephone','Action'];
  affectations: any[];
  constructor(public projetService:ProjetService, public route:ActivatedRoute,
    public authService:AuthentificationService,
    public notifService:NotificationsService,
    public fenetre:MatDialog, public router:Router) { }

  ngOnInit() {
    this.idProjet= parseInt(this.route.snapshot.paramMap.get('idprojet'));
    
   /* this.projetService.getRoleInProject(this.idProjet,2).subscribe(data=>{
      if(data){
        console.log("Voici le role de Samba  est ::"+data);
      }
    });*/
    this.initialisation();
  }

  public initialisation(){

    
    this.projetService.getProjectMembre(this.idProjet).subscribe(data=>{
      if(data){
        this.listofMembres = data;
        this.nombreMembre =  this.listofMembres.length;
        console.log("Voici le nombre des membres du projet"+this.listofMembres.length);

        this.userDataSource = new MatTableDataSource(this.listofMembres);
        this.userDataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel="élements par page";
        this.paginator._intl.nextPageLabel="suivant";
        this.paginator._intl.previousPageLabel ="précédent";
        
        this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
          const start = page * pageSize + 1;
          const end = (page + 1) * pageSize;
          return `${start} - ${end} de ${length}`;
        };
        this.userDataSource.paginator =this.paginator;
        let idMembre = new ProjectUserID();
        idMembre.idProjet = this.idProjet;
        idMembre.idUser = 1;
        let idUser = 2;

       

        this.projetService.getById(this.idProjet).subscribe(result=>{
          if(result){
            this.currentProject = result;
          }
        })
      }
    });
  }

 public  viderRecherche(){
    this.rechercheKey ="";
    this.appliquerLeFiltre();
  }
  public appliquerLeFiltre(){
    this.userDataSource.filter = this.rechercheKey.trim().toLowerCase();
  }

  public  addMembre(){
    const fenetreConfig= new MatDialogConfig();
    fenetreConfig.disableClose =true;
    fenetreConfig.autoFocus = true;
    fenetreConfig.width="65%";
    fenetreConfig.data={projet:this.idProjet};
    this.fenetre.open(AddMembreComponent,fenetreConfig)
    .afterClosed().subscribe(result => {
      this.refreshListMembre();
   });
  }

  public goToDeleteMembre(element){
    let idMembre = new  ProjectUserID();
    idMembre.idProjet = this.idProjet;
    idMembre.idUser = element;

    // passer a la suppression
    this.projetService.deleteMembreOfProject(idMembre).subscribe(data=>{
      if(data){
        this.modifSuccess()
        this.refreshListMembre()
      }else{
        window.alert(
          "L'utilisateur est affecte quelque part dans le projet veuiller verifier vos tache"
        );
        this.modifEchec()
      }
    });
  }

  public goToUserDetails(user){
    this.router.navigate(["/utilisateur/details",user]);
  }

  // recharger la liste des membres du projets
  public refreshListMembre(){
    this.projetService.getProjectMembre(this.idProjet).subscribe(data=>{
      if(data){
        this.listofMembres = data;
        this.userDataSource = new MatTableDataSource(this.listofMembres);
        console.log("Voici le nombre des membres du projet"+this.listofMembres.length);
      }
  });
  }


  modifSuccess(){
    this.notifService.success('Confirmation', "L'uilisateur a été supprimé !", {
      timeOut : 3000,
      showProgressBar : true,
    });
  }
    modifEchec(){
      this.notifService.error('Echec', "L'utilisateur est affecté quelque part dans le projet veuiller verifier vos tâches", {
        timeOut : 3000,
        showProgressBar : true,
      });
  }
}
