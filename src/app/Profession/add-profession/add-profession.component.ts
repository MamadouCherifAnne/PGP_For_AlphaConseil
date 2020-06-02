import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profession} from '../Profession';

@Component({
  selector: 'app-add-profession',
  templateUrl: './add-profession.component.html',
  styleUrls: ['./add-profession.component.css']
})
export class AddProfessionComponent implements OnInit {
  addProfessionForm: FormGroup;
  profession: Profession =new Profession();

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {

    //Les informatiions du formulaire d'ajout de profession
    this.addProfessionForm = this.formBuilder.group({
      'titreProfession':[this.profession.titreProfession,[Validators.required,Validators.required]],
      'utilsateurs':[this.profession.titreProfession,[Validators.required]]
    });
  }

}
