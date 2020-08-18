import { Component, OnInit } from '@angular/core';
import { ProjetService } from "src/app/services/projet.service";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Projet } from '../Projet';
import { MatDialogRef, MatDialog } from "@angular/material";

@Component({
  selector: 'app-ajout-projet',
  templateUrl: './ajout-projet.component.html',
  styleUrls: ['./ajout-projet.component.scss']
})
export class AjoutProjetComponent implements OnInit {
  projet: Projet = new Projet();
  ajoutProjetForm: FormGroup;
  message: any;
  verif = false;
  constructor(private projetService: ProjetService, private formBuilder: FormBuilder,
    private dialogRef : MatDialogRef<AjoutProjetComponent>) { }
 

  ngOnInit() {
    this.ajoutProjetForm= this.formBuilder.group({
    'nomProjet': [this.projet.nomProjet, Validators.required],
    'description': [this.projet.description], 
    'debutProjet': [this.projet.debutProjet, Validators.required],
    'finProjet': [this.projet.finProjet, Validators.required],
    'zoneRealisation': [this.projet.zoneRealisation]

    });
     
   /* const dprojet = this.ajoutProjetForm.get("debutProjet") ;
    const fprojet = this.ajoutProjetForm.get("finProjet");
    if(this.ajoutProjetForm.get("debutProjet") > this.ajoutProjetForm.get("finProjet")){
      this.ajoutProjetForm.get("debutProjet").setValidators(Validators.required);
    }*/
 ;
  }

  /*dateVerif(){
    let dprojet = this.ajoutProjetForm.get("debutProjet").value;
    let fprojet = this.ajoutProjetForm.get("finProjet").value;
    if( dprojet > fprojet || this.ajoutProjetForm.invalid){
      this.verif = true;
    }
    console.log("val de verif"+this.verif);
  } */

  public addProjet(){
    let val = this.projetService.add(this.projet); 
    val.subscribe((data)=>this.message=data);
    this.onClose();
  }

  onClear(){
    this.dialogRef.close();
  }

  onClose(){
    this.ajoutProjetForm.reset();
    this.dialogRef.close();
  }
  

}
