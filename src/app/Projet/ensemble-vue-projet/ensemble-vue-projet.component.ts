import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AjoutPhaseComponent} from 'src/app/Phase/ajout-phase/ajout-phase.component';
import {AddTacheComponent} from 'src/app/Tache/add-tache/add-tache.component';
import { ProjetService } from 'src/app/services/projet.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ensemble-vue-projet',
  templateUrl: './ensemble-vue-projet.component.html',
  styleUrls: ['./ensemble-vue-projet.component.scss']
})
export class EnsembleVueProjetComponent implements OnInit {
  projetId: any;
  projet: any;
  listPhase : any;
  listTache :any;
 


  constructor(private route: ActivatedRoute, private projetService: ProjetService) { }

  ngOnInit() {
    
    //ici je recupère l'ID 
    this.projetId = parseInt(this.route.snapshot.paramMap.get('id'));

    let valeur = this.projetService.getById(this.projetId);
    valeur.subscribe((data)=>this.projet=data);
  }

  nomProjet(){
    return this.projet.nomProjet;
  }
  

}
