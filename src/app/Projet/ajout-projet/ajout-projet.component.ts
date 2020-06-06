import { Component, OnInit } from '@angular/core';
import { ProjetService } from "src/app/services/projet.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Projet } from '../Projet';

@Component({
  selector: 'app-ajout-projet',
  templateUrl: './ajout-projet.component.html',
  styleUrls: ['./ajout-projet.component.css']
})
export class AjoutProjetComponent implements OnInit {
  projet: Projet = new Projet();
  ajoutProjetFrom: FormGroup;
  message: any;

  constructor(private projetService: ProjetService, private formBuilder: FormBuilder) { }
 

  ngOnInit() {
    this.ajoutProjetFrom= this.formBuilder.group({
    'nomProjet': this.projet.nomProjet,
    'description': this.projet.description,
    'debutProjet': this.projet.debutProjet,
    'finProjet': this.projet.finProjet,
    'zoneRealisation': this.projet.zoneRealisation

    });
  }

  public addProjet(){
    let val = this.projetService.add(this.projet);
    val.subscribe((data)=>this.message=data);
    console.log("ça marche");
  }

}
