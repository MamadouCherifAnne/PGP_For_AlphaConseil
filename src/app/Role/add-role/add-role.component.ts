import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { Role } from '../Role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material'

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  
  role: Role = new Role() ;
  addRoleForm:FormGroup;
  roles: any;
  message:any;
  constructor(private roleService:RoleService, private formBuilder:FormBuilder,
    public fenetreRef:MatDialogRef<AddRoleComponent>) { }

  ngOnInit() {
    // creation du formulaire dajout de role
    this.addRoleForm=this.formBuilder.group({
      'role':[this.role.role, [Validators.required]]});

  }
  public addRole(){
   
    this.role.role=this.addRoleForm.get('role').value;

     this.roleService.addRoleService(this.role)
    .subscribe((data)=>this.message=data);
    this.onFermer();
  }
  
  public onFermer(){
    this.addRoleForm.reset();
    this.fenetreRef.close();

  }

  public Quitter(){
    this.onFermer();
  }


}
