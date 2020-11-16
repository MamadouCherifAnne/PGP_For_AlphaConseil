import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TacheService } from 'src/app/services/tache.service';
import { UtilisateurAffectation } from 'src/app/Utilisateur/UtilisateurAffectation';
import { UserToTask } from 'src/app/Utilisateur/UserToTask';
import { UpdateAffectationComponent } from '../update-affectation/update-affectation.component';
import { AffecterRessourcesComponent } from '../affecter-ressources/affecter-ressources.component';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-affectation-tache',
  templateUrl: './affectation-tache.component.html',
  styleUrls: ['./affectation-tache.component.scss']
})
export class AffectationTacheComponent implements OnInit {

  @Input() public idTache: any;
 // idTache:number;
 public itHasAccessToTask:boolean = false;
  currentTache:any;
  tacheProject:any;
  affectations:any;
  currentUser:any;
  affect:UtilisateurAffectation;
  displayedColumns: string [] = ['Ressources', 'TempsPasser', 'TempsEffectuer','CoutHeure','Action']
  rechercheKey:string;
  listAffectation:MatTableDataSource<any>;
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator


  constructor(private tacheService:TacheService, private route:ActivatedRoute,
    public userService:UtilisateurService,
    public authService:AuthentificationService,
    private fenetre:MatDialog
    ) { }

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel="élements par page";
    this.paginator._intl.nextPageLabel="suivant";
    this.paginator._intl.previousPageLabel ="précédent";
    
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${length}`;
    };
    // Initialisation de la page
    let username =this.authService.getCurrentUser();
    this.userService.getUserByUsername(username).subscribe(data=>{
      if(data){
        this.currentUser=data;
        
        this.tacheService.getTacheProject(this.idTache).subscribe(result=>{
          if(result){
            this.tacheProject = result;
            
             this.refresh();
          }
        });
      }
    });
   
   

  }

  public getTheUserOfAffectation(element){
    this.userService.getUserByIdUser(element).subscribe(data=>{
      if(data){
        let user :any =data;
        return data;
      }
    })
  }

  //Modification de Affectation de la tache COurante
  goToUpdateAffectation(element){
      let idAffect =new UserToTask()
      idAffect.idUser=element.user_task.idUser;
      idAffect.idTache =this.idTache;
    // Appel du service de modification de l'affectation
      const fenetreConfig= new MatDialogConfig();
      fenetreConfig.disableClose =true;
      fenetreConfig.autoFocus = true;
      fenetreConfig.width="65%";
      fenetreConfig.data={affect : element};
      this.fenetre.open(UpdateAffectationComponent, fenetreConfig
      ).afterClosed().subscribe(result => {
        this.refresh();
      });
  

  }
  //Suppression de L'affectation sur un La Tache
  goToDeleteAffectation(element){
    let verif :boolean = window.confirm("voulez vraiment supprimer cette affectation");
    console.log("la confirmation "+verif)
    if(verif == true){
    let idAffect = new UserToTask();
   
    idAffect.idTache = element.user_task.idTache;
    idAffect.idUser = element.user_task.idUser;
    console.log("Entrer dans suppression "+element);
    this.tacheService.deleteAffectation(idAffect).subscribe(data=>{
      if(data){
       // console.log(data)
       this.refresh();
      }
     
    });
  }
  }

   // Vider l'espace de recherche
   viderRecherche(){
    this.rechercheKey ="";
    this.appliquerLeFiltre();
  }
  appliquerLeFiltre(){
    this.listAffectation.filter = this.rechercheKey.trim().toLowerCase();
  }

  // Re Actualisation de la page
  refresh(){
       // Recuperer la tache concerne 
       this.idTache = parseInt(this.route.snapshot.paramMap.get('id'));
       this.tacheService.getTache(this.idTache).subscribe(data=>{
         if(data){
           this.currentTache = data;
           this.itHasAccessToTask = this.hasAccessToTask();
          // get la tache projey
          

         // Appel de la methode de calcul du cout total de la facture et des information de la tache
         this.tacheService.getAffectationOfTaskFormat(this.idTache).subscribe(affect=>{
           if(affect){
             console.log(affect)
              this.affectations=affect;
              this.listAffectation = new MatTableDataSource(this.affectations);
              this.listAffectation.sort = this.sort;
  
              this.listAffectation.paginator =this.paginator;
           }
  
         });
       }
       });

  }

  // Affectation des ressources
  affecterRessources(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {tache: this.currentTache};
    this.fenetre.open(AffecterRessourcesComponent, dialogConfig)
    .afterClosed()
    .subscribe(result => {
      this.refresh();
    });
  }

  public isCreateur(){
    let verif:boolean = false;

    if(this.currentUser.taches!= null && this.currentUser.taches.length != 0 ){
      for(let tache of this.currentUser.taches){
        if(tache.idTache === this.currentTache.idTache &&
          tache.nomTache === this.currentTache.nomTache &&
          tache.lastUpdate === this.currentTache.lastUpdate &&
          tache.debutTache === this.currentTache.debutTache 
          ){
            verif = true;
            break;
          }
      }
      
    
    return verif;
  }
}

// verification si il s'agit du chef du projet
    public isOwnerOfProject(){
      this.currentUser.isChefProjet =0;
      let isChef:boolean = false;
      if(this.currentUser.projets && this.tacheProject !== -1){
        console.log(this.currentUser.projets.length)
      for(let p of this.currentUser.projets){
        console.log("le projet dont jsuis"+p);
        if(p.numProjet == this.tacheProject){
         // this.currentUser.isChefProjet = 1;
          isChef = true;
          break;
        }
      }
      
    }
    return isChef;
    }

    public hasAccessToTask():boolean{
      
      if(this.authService.isSuperAdmin == true || this.isCreateur() == true ||
       this.isOwnerOfProject()== true){
        
        return true;
       }else{
       return false;
       }
    }

}
