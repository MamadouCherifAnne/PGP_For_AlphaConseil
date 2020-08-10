import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from 'src/app/services/utilisateur.service'
import { RoleService } from 'src/app/services/role.service';
import { Utilisateur } from 'src/app/Utilisateur/Utilisateur';
import { Profession } from 'src/app/Profession/Profession';
import { IProfession } from 'src/app/Profession/IProfession';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ProfessionService } from 'src/app/services/profession.service';
import { IRole } from 'src/app/Role/IRole';
import {MatDialogRef} from '@angular/material'

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.scss']
})
export class AjoutUtilisateurComponent implements OnInit {
   user:Utilisateur = new Utilisateur()
   
   addUserForm: FormGroup;
   message:any;
   
   idRol:IRole;
   listProfession: Profession[]
   idProfession:IProfession[];


  public professions =[];
   roles:IRole[];
  constructor(private userService: UtilisateurService, private roleService: RoleService,
    private professionService: ProfessionService,
     private formBuilder: FormBuilder,
     public fenetreReference: MatDialogRef<AjoutUtilisateurComponent>
     ) { }

  ngOnInit() {

    //Preparaion du formulaire d'ajout
    this.addUserForm=this.formBuilder.group({
      'username':[this.user.nom, [Validators.required,Validators.maxLength(20)]],
      'prenom':[this.user.prenom, [Validators.required,Validators.maxLength(20),Validators.pattern( '[a-zA-Z ]*')]],
      'email':[this.user.email, [Validators.required, Validators.email]],
      'password':[this.user.password, [Validators.required]],
      'confirmPassword':[[Validators.required]],
      'telephone':[this.user.telephone, [Validators.required,Validators.minLength(11)]],
      'adresse':[this.user.adresse, [Validators.required]],
      'role':[this.idRol,[]],
      'profession':[this.idProfession]
    });
    
    /* .................... Recuperation des roles et professions pour les renseigner dans le formulaires......*/
   
     this.roleService.getRoles()
      .subscribe((data)=> this.roles=data);
      //get the professions for adding a new user 
      this.professionService.getProfession()
      .subscribe((data)=> this.professions=data)
       //---------FIN DE PROCESSUS DE RECUPERATION   ----------------------------------------------------------------------

  }

  /** APPEL DU SERVICE DE L'AJOUT DES UTILISATEUR................................*/
  public addNewUser(){
  //  console.log(this.user)
    this.user.actif=true;
    this.user.role = this.idRol;
    this.user.ptojet=null
    this.user.professions= this.idProfession;
    
    let res=this.userService.addUser(this.user);
    res.subscribe((data)=>this.message=data);
    this.onFermer();
    
  }
  /* FIN DE PROCESSS D'AJOUT --------------*/

  public onFermer(){
    this.addUserForm.reset();
    this.fenetreReference.close();
  }


}
