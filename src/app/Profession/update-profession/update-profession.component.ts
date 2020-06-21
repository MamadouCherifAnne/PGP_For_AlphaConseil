import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profession} from '../Profession';
import { MatDialogRef } from '@angular/material';
import { ProfessionService } from 'src/app/services/profession.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-update-profession',
  templateUrl: './update-profession.component.html',
  styleUrls: ['./update-profession.component.css']
})
export class UpdateProfessionComponent implements OnInit {

  updateProfessionForm: FormGroup;
  profession: Profession =new Profession();
  updatingProfession:any;
  message:any;

  constructor(private formBuilder:FormBuilder,
    private profService:ProfessionService,
    public fenetreRef:MatDialogRef<UpdateProfessionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
    

      //Les informatiions du formulaire d'ajout de profession
      this.updateProfessionForm = this.formBuilder.group({
        'titreProfession':[[Validators.required]],
        
      });
      // initialiser le champ par les valeurs deja existantes
      this.updatingProfession = this.data.profession;
      this.updateProfessionForm.get("titreProfession").setValue(this.data.profession.titreProfession)
   
  }

  public updateProfession(){
    let idProf=Number.parseFloat(this.data.profession.numProfession);
    this.profession.titreProfession=this.updateProfessionForm.get("titreProfession").value;
    this.profService.updateProfession(this.profession,idProf)
    .subscribe(data=>this.message=data);
    this.onFermer();
  }

  public onFermer(){
    this.updateProfessionForm.reset();
    this.fenetreRef.close();
  }

}
