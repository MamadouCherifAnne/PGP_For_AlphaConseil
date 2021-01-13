import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ProjetService } from 'src/app/services/projet.service';
import {TacheService} from 'src/app/services/tache.service';
@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.scss']
})
export class ActiviteComponent implements OnInit {
  currentUser: any;
  projets: any;
  entrepriseName: String;
  phase: any;

  constructor(private authService: AuthentificationService,
    private projetService: ProjetService, private tacheService: TacheService) { }

  ngOnInit() {
    this.entrepriseName = this.authService.getEntrepriseName;
    this.currentUser =this.authService.getCurrentUser();
    // let resp = this.projetService.getAllProjet();
    let resp = this.projetService.allProjectOfUser(this.currentUser )
     resp.subscribe(data=>{
       this.projets=data
      // console.log(data)
     })
  }

  compareDate(element){
    let res=0;
    let today= new Date();
    let yesterdayMliscd = today.getMilliseconds()-(24*60*60*1000); 
    let yesterday = new Date(yesterdayMliscd);
    if(new Date(element)== new Date()  ||  new Date(element) == yesterday ){
      res=1;
    }
    
    return res;
  }

  getPhaseDuneTache(idtache){

    this.tacheService.getPhaseDuneTache(idtache).subscribe((data)=>{
      if(data){
        this.phase = data;
       // console.log("c'est bon"+this.phase);
       return this.phase.nomTache;
      }
    });
   
  }

  //

}
