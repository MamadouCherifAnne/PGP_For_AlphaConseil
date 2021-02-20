import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Projet } from '../Projet';
import {ProjetService} from "src/app/services/projet.service";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-edit-projet',
  templateUrl: './edit-projet.component.html',
  styleUrls: ['./edit-projet.component.scss']
})
export class EditProjetComponent implements OnInit {
  editProjetForm: FormGroup;
  projet: Projet = new Projet;
  projetToEdit : any;
  reurnMessage:  any;

  constructor( private formBuilder: FormBuilder, private projetService: ProjetService,
    @Inject(MAT_DIALOG_DATA) public data: any,  private dialogRef : MatDialogRef<EditProjetComponent>) { }

  ngOnInit() {
    this.editProjetForm= this.formBuilder.group({
      'nomProjet': [this.projet.nomProjet, [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern( '^[a-zA-Z \u00C0-\u00FF]*$')]],
      'description': [this.projet.description, Validators.maxLength(100)],
      'debutProjet': [this.projet.debutProjet, [Validators.required, this.dateValidator]],
      'finProjet': [this.projet.finProjet,[Validators.required, this.dateValidator]],
      'zoneRealisation': [this.projet.zoneRealisation, [Validators.maxLength(100)]],
      'responsable':[this.projet.responsable]
  
      });

      this.projetToEdit = this.data;
      console.log(this.projetToEdit.projet.numProjet);

      

      this.currentForm();
    }

    public checkError = (controlName: string, errorName: string) => {
      return this.editProjetForm.controls[controlName].hasError(errorName);
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
  
  public updateProjet(){
     this.projet.nomProjet = this.editProjetForm.get("nomProjet").value;
     this.projet.description = this.editProjetForm.get("description").value;
     this.projet.debutProjet  = this.editProjetForm.get("debutProjet").value;
     this.projet.finProjet = this.editProjetForm.get("finProjet").value;
     this.projet.zoneRealisation = this.editProjetForm.get("zoneRealisation").value;
     this.projet.responsable =  this.editProjetForm.get("responsable").value;

     let idProjet = Number.parseFloat(this.projetToEdit.projet.numProjet);

     let value = this.projetService.update(this.projet, idProjet);
     value.subscribe((data)=>this.reurnMessage= data);

     this.Close();
  }

  Clear(){
    this.dialogRef.close();
  }

  Close(){
    this.editProjetForm.reset();
    this.dialogRef.close();
  }
//.............................Charger les elements..............................................................
  currentForm(){
    console.log(" "+this.projetToEdit.projet.zoneRealisation);
    this.editProjetForm.get("nomProjet").setValue(this.projetToEdit.projet.nomProjet);
    this.editProjetForm.get("description").setValue(this.projetToEdit.projet.description);
    this.editProjetForm.get("debutProjet").setValue(this.projetToEdit.projet.debutProjet);
    this.editProjetForm.get("finProjet").setValue(this.projetToEdit.projet.finProjet);
    this.editProjetForm.get("zoneRealisation").setValue(this.projetToEdit.projet.zoneRealisation);
    this.editProjetForm.get("finProjet").setValue(this.projetToEdit.projet.finProjet);
  }
  
}
