import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
      'nomProjet': [this.projet.nomProjet, Validators.required],
      'description': [this.projet.description],
      'debutProjet': [this.projet.debutProjet, Validators.required],
      'finProjet': [this.projet.finProjet,Validators.required],
      'zoneRealisation': [this.projet.zoneRealisation],
      'responsable':[this.projet.responsable, Validators.required]
  
      });

      this.projetToEdit = this.data;
      console.log(this.projetToEdit.projet.numProjet);

      

      this.currentForm();
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
    this.editProjetForm.reset();
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
