import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ProjetService } from 'src/app/services/projet.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-actifsprojets',
  templateUrl: './actifsprojets.component.html',
  styleUrls: ['./actifsprojets.component.scss']
})
export class ActifsprojetsComponent implements OnInit {
  public isAdmin:boolean = false;
  public isSuperAdmin:boolean = false;
  public projets : any;
  public entrepriseNom:String;
  public delateMessage: any;
  public currentUser:any;
  public userConnected:any;

  constructor(public authService: AuthentificationService,
    public projetService: ProjetService, public userService:UtilisateurService) { }

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
    
    let resp = this.userService.getProjetsEncours(this.currentUser)
    resp.subscribe((data)=>this.projets=data);
    
  }
  
 
}
