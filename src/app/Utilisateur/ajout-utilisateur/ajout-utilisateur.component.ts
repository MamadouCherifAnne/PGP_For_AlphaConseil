import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from 'src/app/services/utilisateur.service'
import { RoleService } from 'src/app/services/role.service';
import { Utilisateur } from 'src/app/Utilisateur/Utilisateur';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.css']
})
export class AjoutUtilisateurComponent implements OnInit {
   user:Utilisateur = new Utilisateur()
   addUserForm: FormGroup;
   message:any;
   idRol:number;

  roles: any;
  constructor(private userService: UtilisateurService, private roleService: RoleService,
     private formBuilder: FormBuilder) { }

  ngOnInit() {

    //Preparaion du formulaire d'ajout
    this.addUserForm=this.formBuilder.group({
      'username':[this.user.nom, [Validators.required]],
      'prenom':[this.user.prenom, [Validators.required]],
      'email':[this.user.email, [Validators.required, Validators.email]],
      'password':[this.user.password, [Validators.required]],
      'telephone':[this.user.telephone, [Validators.required,Validators.minLength(8)]],
      'adresse':[this.user.adresse, [Validators.required]],
      'role':[this.idRol,[Validators.required]],
      'profession':[this.user.profession]
    });
    
    //
    let roleList = this.roleService.getRoles()
    roleList.subscribe((data)=>this.roles=data);
    

  }

  // Public Add User
  public addNewUser(){
    console.log(this.user)
    this.user.actif=true;
    
    this.user.ptojet=null
    this.user.profession=null;
  
    
    let res=this.userService.addUser(this.user,this.idRol);
    res.subscribe((data)=>this.message=data);
  }

}
