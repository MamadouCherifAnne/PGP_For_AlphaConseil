import { Component, OnInit, Inject } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { Role } from '../Role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {
  
  role: Role = new Role() ;
  updateForm:FormGroup;
  roles: any;
  message:any;
  constructor(private roleService:RoleService, private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fenetreRef:MatDialogRef<UpdateRoleComponent>) { }

  ngOnInit() {
    // creation du formulaire dajout de role
    this.updateForm=this.formBuilder.group({
      'role':[this.role.role, [Validators.required]]});

  }
  public updateRole(){
    

    this.role.role=this.updateForm.get('role').value;
    let idRole =Number.parseFloat(this.data.role.idRole);
     this.roleService.updateRole(this.role,idRole)
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
