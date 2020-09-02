import { Component, OnInit } from '@angular/core';
import { TacheService } from 'src/app/services/tache.service';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurAffectation } from 'src/app/Utilisateur/UtilisateurAffectation';

@Component({
  selector: 'app-facture-tache',
  templateUrl: './facture-tache.component.html',
  styleUrls: ['./facture-tache.component.scss']
})
export class FactureTacheComponent implements OnInit {
  idTache:number;
  currentTache:any;
  affectations:UtilisateurAffectation;
  constructor(private tacheService:TacheService, private route:ActivatedRoute) { }

  ngOnInit() {
    // Recuperer la tache concerne 
    this.idTache = parseInt(this.route.snapshot.paramMap.get('idTache'));
     this.tacheService.getTache(this.idTache).subscribe(data=>{
       if(data){
       this.currentTache = data;


       // Appel de la methode de calcul du cout total de la facture et des information de la tache
       this.tacheService.getAffectationOfTask(this.idTache).subscribe(affect=>{
         if(affect){
           this.affectations=affect;
         }

       });
     }
     });

  }

}
