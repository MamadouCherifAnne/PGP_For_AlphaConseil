import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  regitrationForm: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.regitrationForm = this.formbuilder.group({
    })
  }

}
