import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { Role } from '../Role';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  
  role: Role = new Role("");
  roles: any;
  message:any;
  constructor(private roleService:RoleService) { }

  ngOnInit() {
   let r = this.roleService.getRoles()
   r.subscribe((data)=>this.roles=data)
  }
  public addRole(){
   this.role['role'] = this.roleService.roleForm.get('role').value

    let reponse= this.roleService.addRoleService(this.role);
    reponse.subscribe((data)=>this.message=data);
  }
  


}
