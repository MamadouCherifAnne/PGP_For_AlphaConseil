import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
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
  rechercheKey:string;

  // La dataSource pour le tableau des membres 
  public userDataSource : MatTableDataSource<any>;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator

  displayedColumns: string [] = ['username', 'Role',  'telephone'];
  affectations: any[];
  constructor(public projetService:ProjetService, public route:ActivatedRoute,
    public fenetre:MatDialog) { }

  ngOnInit() {
    this.idProjet= parseInt(this.route.snapshot.paramMap.get('idprojet'));
    
    this.initialisation();
  }

  public initialisation(){

    
    this.projetService.getProjectMembre(this.idProjet).subscribe(data=>{
      if(data){
        this.listofMembres = data;
        console.log("Voici le nombre des membres du projet"+this.listofMembres.length);

        this.userDataSource = new MatTableDataSource(data);
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
        let idUser = 74;

        this.projetService.getRoleInProject(this.idProjet,idUser).subscribe(role=>{
          if(role){
            console.log("Voici le role de Samba  est ::"+role);
          }
        })

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
    
   });
  }

  public supprimerMembre(element){
    
  }
}
