import { Component, OnInit } from '@angular/core';
import { ProjetService } from "src/app/services/projet.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Projet } from '../Projet';
import { MatDialogRef, MatDialog } from "@angular/material";

@Component({
  selector: 'app-ajout-projet',
  templateUrl: './ajout-projet.component.html',
  styleUrls: ['./ajout-projet.component.css']
})
export class AjoutProjetComponent implements OnInit {
  projet: Projet = new Projet();
  ajoutProjetForm: FormGroup;
  message: any;

  constructor(private projetService: ProjetService, private formBuilder: FormBuilder,
    private dialogRef : MatDialogRef<AjoutProjetComponent>) { }
 

  ngOnInit() {
    this.ajoutProjetForm= this.formBuilder.group({
    'nomProjet': [this.projet.nomProjet, Validators.required],
    'description': [this.projet.description],
    'debutProjet': [this.projet.debutProjet, Validators.required],
    'finProjet': [this.projet.finProjet,Validators.required],
    'zoneRealisation': [this.projet.zoneRealisation]

    });
  }

  public addProjet(){
    let val = this.projetService.add(this.projet);
    val.subscribe((data)=>this.message=data);
    console.log("ça marche");
    this.onClose();
  }

  onClear(){
    this.ajoutProjetForm.reset();
  }

  onClose(){
    this.ajoutProjetForm.reset();
    this.dialogRef.close();
  }

}
