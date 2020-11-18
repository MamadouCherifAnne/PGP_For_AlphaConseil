import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-activite',
  templateUrl: './activite.component.html',
  styleUrls: ['./activite.component.scss']
})
export class ActiviteComponent implements OnInit {
  currentUser: any;
  projets: any;

  constructor(private authService: AuthentificationService,
    private projetService: ProjetService) { }

  ngOnInit() {
    this.currentUser =this.authService.getCurrentUser();
    // let resp = this.projetService.getAllProjet();
    let resp = this.projetService.allProjectOfUser(this.currentUser )
     resp.subscribe(data=>{
       this.projets=data
       console.log(data)
     })
  }

}
