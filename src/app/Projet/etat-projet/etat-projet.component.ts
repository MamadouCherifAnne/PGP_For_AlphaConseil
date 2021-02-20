import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ProjetService } from 'src/app/services/projet.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-etat-projet',
  templateUrl: './etat-projet.component.html',
  styleUrls: ['./etat-projet.component.scss']
})
export class EtatProjetComponent implements OnInit {

  public isAdmin:boolean = false;
  public isSuperAdmin:boolean = false;
  public projets : any;
  public entrepriseNom:String;
  public delateMessage: any;
  public currentUser:any;
  public userConnected:any;
  public nbrdeprojetactif: any = 0;
  public nbrdeprojetenretard: any = 0;
  public nbrdeprojettermine: any = 0;

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

    this.refresh();
  }

  refresh() {
      // Sinon on affiche pour lui que les projets dont il affecte comme membre;
      if(this.authService.isAdmin || this.authService.isSuperAdmin){
      this.projetService.getprojetsActifs(this.currentUser).subscribe((data)=>{
        if(data){
          this.nbrdeprojetactif=data
        }
      });

      this.projetService.getprojetsEnretard(this.currentUser).subscribe((data)=>{
        if(data){
          this.nbrdeprojetenretard=data
        }
      });

      this.projetService.getProjetsTermines(this.currentUser).subscribe((data)=>{
        if(data){
          this.nbrdeprojettermine=data
        }
      });
      }else{

        this.projetService.getprojetsActifsAdmin().subscribe((data)=>{
          if(data){
            this.nbrdeprojetactif=data
          }
        });
  
        this.projetService.getprojetsEnretardAdmin().subscribe((data)=>{
          if(data){
            this.nbrdeprojetenretard=data
          }
        });
  
        this.projetService.getProjetsTerminesAdmin().subscribe((data)=>{
          if(data){
            this.nbrdeprojettermine=data
          }
        });
      }
  }

}
