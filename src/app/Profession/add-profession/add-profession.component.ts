import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profession} from '../Profession';
import { MatDialogRef } from '@angular/material';
import { ProfessionService } from 'src/app/services/profession.service';

@Component({
  selector: 'app-add-profession',
  templateUrl: './add-profession.component.html',
  styleUrls: ['./add-profession.component.css']
})
export class AddProfessionComponent implements OnInit {
  addProfessionForm: FormGroup;
  profession: Profession =new Profession();
  message:any;

  constructor(private formBuilder:FormBuilder,
    private profService:ProfessionService,
    public fenetreRef:MatDialogRef<AddProfessionComponent>) { }

  ngOnInit() {

    //Les informatiions du formulaire d'ajout de profession
    this.addProfessionForm = this.formBuilder.group({
      'titreProfession':[this.profession.titreProfession,[Validators.required,Validators.required]],
      
    });
  }

  public addProfession(){
    this.profService.addProfession(this.profession)
    .subscribe(data=>this.message=data);
    this.onFermer();
  }

  public onFermer(){
    this.addProfessionForm.reset();
    this.fenetreRef.close();
  }
  

}
