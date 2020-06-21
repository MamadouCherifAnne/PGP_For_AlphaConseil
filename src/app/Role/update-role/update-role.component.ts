import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { Role } from '../Role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material'

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.css']
})
export class UpdateRoleComponent implements OnInit {
  
  role: Role = new Role() ;
  updateForm:FormGroup;
  roles: any;
  message:any;
  constructor(private roleService:RoleService, private formBuilder:FormBuilder,
    public fenetreRef:MatDialogRef<UpdateRoleComponent>) { }

  ngOnInit() {
    // creation du formulaire dajout de role
    this.updateForm=this.formBuilder.group({
      'role':[this.role.role, [Validators.required]]});

  }
  public updateRole(){
    

    this.role.role=this.updateForm.get('role').value;

     this.roleService.updateRole(this.role.role)
    .subscribe((data)=>this.message=data);
    this.onFermer();
  }
  
  public onFermer(){
    this.updateForm.reset();
    this.fenetreRef.close();

  }

  public Quitter(){
    this.onFermer();
  }


}
