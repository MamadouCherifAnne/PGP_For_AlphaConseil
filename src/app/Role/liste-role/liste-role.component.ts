import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import {MatDialog, MatDialogConfig} from '@angular/material'
import { AddRoleComponent } from '../add-role/add-role.component';
import { IRole } from '../IRole';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateRoleComponent } from '../update-role/update-role.component';

@Component({
  selector: 'app-liste-role',
  templateUrl: './liste-role.component.html',
  styleUrls: ['./liste-role.component.css']
})
export class ListeRoleComponent implements OnInit {
  displayedColumns: string [] = ['numRole', 'role', 'Action'];
  roles:any;
  message:any;
  datasource =new MatTableDataSource<any>();

  constructor(private roleService:RoleService, private fenetre:MatDialog) { }

  ngOnInit() {
    this.refresh();
  }

  public goToAddRole(){
    //this.router.navigate(["add"],{relativeTo: this.route});
     //la configuration du pop up
     const fenetreConfig= new MatDialogConfig();
     fenetreConfig.disableClose =true;
     fenetreConfig.autoFocus = true;
     fenetreConfig.width="65%";
     this.fenetre.open(AddRoleComponent,fenetreConfig)
     .afterClosed().subscribe(result => {
      this.refresh();
    });
    

  
  }

  public goToUpdateRole(element){
    //this.router.navigate(["add"],{relativeTo: this.route});
     //la configuration du pop up
     const fenetreConfig= new MatDialogConfig();
     fenetreConfig.disableClose =true;
     fenetreConfig.autoFocus = true;
     fenetreConfig.width="65%";
    fenetreConfig.data={role: element}
     this.fenetre.open(UpdateRoleComponent,fenetreConfig)
     .afterClosed().subscribe(result => {
      this.refresh();
    });
;
  
  }
  public goToDeleteRole(idRole){
    this.roleService.deleteRole(idRole).subscribe(result => {
      this.refresh();
    });
  }

  refresh() {
    this.roleService.getRoles().subscribe((allRole:IRole[])=>{
      this.datasource.data=allRole;
    })
  }

}

