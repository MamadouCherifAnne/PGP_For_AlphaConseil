import { Component, OnInit, Inject } from '@angular/core';
import {UtilisateurService} from 'src/app/services/utilisateur.service'
import { RoleService } from 'src/app/services/role.service';
import { Utilisateur } from 'src/app/Utilisateur/Utilisateur';
import { Profession } from 'src/app/Profession/Profession';
import { IProfession } from 'src/app/Profession/IProfession';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ProfessionService } from 'src/app/services/profession.service';
import { IRole } from 'src/app/Role/IRole';
import { IUtilisateur } from '../IUtilisateur';
import {MatDialogRef}  from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-update-utilisateur',
  templateUrl: './update-utilisateur.component.html',
  styleUrls: ['./update-utilisateur.component.scss']
})
export class UpdateUtilisateurComponent implements OnInit {

  user:Utilisateur = new Utilisateur()
  oldUser:any;
  idRol:IRole;
  updatingUser:any;
  professions: IProfession[];
  roles:any;
  idProfession:IProfession[];
  updateUserForm: FormGroup;
  message:any;

  constructor(private userService: UtilisateurService, private roleService: RoleService,
    private professionService: ProfessionService,
     private formBuilder: FormBuilder,
     public fenetereRef: MatDialogRef<UpdateUtilisateurComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any) {
      }

  ngOnInit() {
    // get roles
    this.roleService.getRoles()
      .subscribe((data)=> this.roles=data);
    

    this.professionService.getProfession()
    .subscribe((data)=> this.professions=data)

    // +++++++++++++++ Creation du formulaire de modification ++++++++++++++++++++++++++++++

    this.updateUserForm=this.formBuilder.group({
      'username':[this.user.nom, [Validators.required]],
      'prenom':[this.user.prenom, [Validators.required]],
      'email':[this.user.email, [Validators.required, Validators.email]],
      'password':[this.user.password, [Validators.required]],
      'telephone':[this.user.telephone, [Validators.required,Validators.minLength(8)]],
      'adresse':[this.user.adresse, [Validators.required]],
      'role':[this.user.role, [Validators.required]],
      'profession':[this.idProfession]
  });
  
    this.updatingUser =this.data;
    console.log(this.updatingUser.user.role);
  
//+++++++++++++++++++ REmplissage du form par les valeurs anciennes desirable a la modification

  this.chargerFormulaire();
    
     
}


public userUpdate(){
  //console.log(this.oldUser)

 this.user.actif=true;
  this.user.nom =this.updateUserForm.get("username").value;
  this.user.prenom =this.updateUserForm.get("prenom").value;
  this.user.email=this.updateUserForm.get("email").value;
  this.user.adresse =this.updateUserForm.get("adresse").value;
  this.user.telephone =this.updateUserForm.get("telephone").value;
  let id=Number.parseFloat(this.updatingUser.user.idUser);
  
  this.user.role = this.updatingUser.user.role;
  this.user.ptojet=null
  this.user.professions=this.updateUserForm.get("profession").value
  this.user.role=this.updateUserForm.get("role").value
  
  let res=this.userService.updateUser(this.user,id);
  res.subscribe((data)=>this.message=data);
  

  this.onFermer();
}


public onFermer(){
  this.updateUserForm.reset();
  this.fenetereRef.close();
}

public chargerFormulaire(){
  
  this.updateUserForm.get("username").setValue(this.updatingUser.user.nom);
  this.updateUserForm.get("prenom").setValue(this.updatingUser.user.prenom);
  this.updateUserForm.get("email").setValue(this.updatingUser.user.email);
  this.updateUserForm.get("telephone").setValue(this.updatingUser.user.telephone);
  this.updateUserForm.get("adresse").setValue(this.updatingUser.user.adresse);
  this.updateUserForm.get("profession").setValue(this.updatingUser.user.professions);
  this.updateUserForm.get("role").setValue(this.updatingUser.user.role) ;

}


}
