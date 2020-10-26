import { Component, OnInit } from '@angular/core';
import { ProjetService } from "src/app/services/projet.service";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Projet } from '../Projet';
import { MatDialogRef, MatDialog } from "@angular/material";
import {EndDateValidation} from "src/app/ValidationsFunctions/EndDateValidation";
import { UtilisateurService } from 'src/app/services/utilisateur.service';

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
  allUsers:any;
  constructor(private projetService: ProjetService, private formBuilder: FormBuilder,
    public userService:UtilisateurService,
    private dialogRef : MatDialogRef<AjoutProjetComponent>) { }
 

  ngOnInit() {
    // CHarger les utilisateurs succeptibles detre responsble
    this.userService.getUsers().subscribe(data=>{
      if(data){
        this.allUsers =data;
      }
    })
    this.ajoutProjetForm= this.formBuilder.group({
    'nomProjet': [this.projet.nomProjet, Validators.required],
    'description': [this.projet.description], 
    'debutProjet': [this.projet.debutProjet, Validators.required],
    'finProjet': [this.projet.finProjet, [Validators.required]],
    'zoneRealisation': [this.projet.zoneRealisation],
    'responsable':[this.projet.responsable]
    });
  }

  
   dateControl(control: AbstractControl): {[key:string]: any} | null{
    
    const sDate = new Date(this.ajoutProjetForm.get('debutProjet').value);
    const eDate = new Date(control.value);

    return (sDate > eDate)?{'StartedDateIsMore': true}: null;
   }

  public addProjet(){
    this.projet.nomProjet= this.ajoutProjetForm.get('nomProjet').value;
    this.projet.description= this.ajoutProjetForm.get('description').value;
    this.projet.debutProjet = this.ajoutProjetForm.get('debutProjet').value;
    this.projet.finProjet = this.ajoutProjetForm.get('finProjet').value;
    this.projet.zoneRealisation = this.ajoutProjetForm.get('zoneRealisation').value;
    this.projet.responsable = this.ajoutProjetForm.get('responsable').value;
    console.log(this.projet.zoneRealisation);
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
