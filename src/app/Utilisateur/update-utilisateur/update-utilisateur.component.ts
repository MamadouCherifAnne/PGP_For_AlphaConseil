import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from 'src/app/services/utilisateur.service'
import { RoleService } from 'src/app/services/role.service';
import { Utilisateur } from 'src/app/Utilisateur/Utilisateur';
import { Profession } from 'src/app/Profession/Profession';
import { IProfession } from 'src/app/Profession/IProfession';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ProfessionService } from 'src/app/services/profession.service';
import { IRole } from 'src/app/Role/IRole';
import { IUtilisateur } from '../IUtilisateur';

@Component({
  selector: 'app-update-utilisateur',
  templateUrl: './update-utilisateur.component.html',
  styleUrls: ['./update-utilisateur.component.css']
})
export class UpdateUtilisateurComponent implements OnInit {

  user:Utilisateur = new Utilisateur()
  oldUser:any
  ;
  idRol:IRole;
  updatingUser:any;
  professions: IProfession[]
  idProfession:IProfession[];
  updateUserForm: FormGroup;
  message:any;

  constructor(private userService: UtilisateurService, private roleService: RoleService,
    private professionService: ProfessionService,
     private formBuilder: FormBuilder) { }

  ngOnInit() {

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
      
      'profession':[this.idProfession]
  });
//+++++++++++++++++++ REmplissage du form par les valeurs anciennes desirable a la modification
    let name:number = 20;
     this.userService.getUserByIdUser(name)
    .subscribe((data)=> this.updatingUser=data);
     
}

public userUpdate(){
  console.log(this.user)
  this.user.actif=true;
  this.user.role = this.idRol;
  this.user.ptojet=null
  this.user.professions= this.idProfession;
  
  let res=this.userService.updateUser(this.user,this.updatingUser.idUser);
  res.subscribe((data)=>this.message=data);
}


}
