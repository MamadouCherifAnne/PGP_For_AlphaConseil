import { Component, Inject, OnInit } from '@angular/core';
import { ProjetService } from "src/app/services/projet.service";
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Projet } from '../Projet';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import {EndDateValidation} from "src/app/ValidationsFunctions/EndDateValidation";

import {DateValidation} from "src/app/ValidationsFunctions/DateValidation";

import { UtilisateurService } from 'src/app/services/utilisateur.service';
import {NotificationsService} from 'angular2-notifications';
import { title } from 'process';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef : MatDialogRef<AjoutProjetComponent>,
    private notifService: NotificationsService) { }

 

  ngOnInit() {
    // CHarger les utilisateurs succeptibles detre responsble
    this.userService.getUsers().subscribe(data=>{
      if(data){
        this.allUsers =data;
      }
    })
    this.ajoutProjetForm= this.formBuilder.group({
    'nomProjet': [this.projet.nomProjet,[ Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      Validators.pattern( '^[a-zA-Z \u00C0-\u00FF]*$')]],
    'description': [this.projet.description,  Validators.maxLength(100)], 
    'debutProjet': [this.projet.debutProjet, [Validators.required, this.dateValidator]],
    'finProjet': [this.projet.finProjet, [Validators.required, this.dateValidator]],
    'zoneRealisation': [this.projet.zoneRealisation,[Validators.maxLength(100)]], 
    'responsable':[this.projet.responsable],

    });
 
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.ajoutProjetForm.controls[controlName].hasError(errorName);
  }
 
 //Verification du date format 
  dateValidator(c: AbstractControl): { [key: string]: boolean } {
    let value = c.value;
    if (value && typeof value === "string") {
      let match = value.match(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
      if (!match) {
        return { 'dateInvalid': true };
      } else if (match && match[0] !== value) {
        return { 'dateInvalid': true };
      }
    }
    return null;
  }

   
 
   //.................................................
   
  /*
   dateControl(control: AbstractControl): {[key:string]: any} | null{
    
    const sDate = new Date(this.ajoutProjetForm.get('debutProjet').value);
    const eDate = new Date(control.value);

    return (sDate > eDate)?{'StartedDateIsMore': true}: null;
   } */

   //fonction d'ajout d'un projet 
  public addProjet(){
    this.projet.nomProjet= this.ajoutProjetForm.get('nomProjet').value;
    this.projet.description= this.ajoutProjetForm.get('description').value;
    this.projet.debutProjet = this.ajoutProjetForm.get('debutProjet').value;
    this.projet.finProjet = this.ajoutProjetForm.get('finProjet').value;
    this.projet.zoneRealisation = this.ajoutProjetForm.get('zoneRealisation').value;
    if(this.ajoutProjetForm.get('responsable').value){
      this.projet.responsable = this.ajoutProjetForm.get('responsable').value;
    }else{
      this.projet.responsable = this.data.defaultProjectOwner;
    }
    console.log(this.projet.zoneRealisation);
    this.projetService.add(this.projet).subscribe((data)=>{
      if(data){
        this.message=data
        
      }
     })
     this.testToast();
     this.onClose();
    
  }
  
  testToast(){
    this.notifService.success('Confirmation', "Projet crée avec succés", {
      timeOut : 3000,
      showProgressBar : true,
    })
  }

  onClear(){
    this.dialogRef.close();
  }

  onClose(){
    this.ajoutProjetForm.reset();
    this.dialogRef.close();
  }
  

}
