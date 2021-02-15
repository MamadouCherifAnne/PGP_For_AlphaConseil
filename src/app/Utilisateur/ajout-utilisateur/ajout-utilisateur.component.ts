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
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-ajout-utilisateur',
  templateUrl: './ajout-utilisateur.component.html',
  styleUrls: ['./ajout-utilisateur.component.scss']
})
export class AjoutUtilisateurComponent implements OnInit {
   user:Utilisateur = new Utilisateur()
   
  public addUserForm: FormGroup;
  public message:any;
  public  hide:boolean = true;
  public  listProfession: Profession[]
  public idProfession:IProfession[];


  public professions =[];

  constructor(private userService: UtilisateurService,
    public authService:AuthentificationService,
    private professionService: ProfessionService,
     private formBuilder: FormBuilder,
     public fenetreReference: MatDialogRef<AjoutUtilisateurComponent>
     ) { }

  ngOnInit() {

    //Preparaion du formulaire d'ajout
    this.addUserForm=this.formBuilder.group({
      'username':[this.user.username, [Validators.required,Validators.maxLength(20)]],
      'nom':[this.user.nom, [Validators.required,Validators.maxLength(20),Validators.pattern('^[a-zA-Z \u00C0-\u00FF]*$')]],
      'prenom':[this.user.prenom, [Validators.required,Validators.maxLength(20),Validators.pattern('^[a-zA-Z \u00C0-\u00FF]*$')]],
      'email':[this.user.email, [Validators.required, Validators.email]],
      'password':[this.user.password, [Validators.required]],

      'telephone':[this.user.telephone, [Validators.required,Validators.minLength(8),Validators.pattern('[0-9]*')]],

      'confirmPassword':["",[Validators.required]],

      'adresse':[this.user.adresse, [Validators.required]],
      
      'profession':[this.idProfession]
    });
    
    /* .................... Recuperation des roles et professions pour les renseigner dans le formulaires......*/
      //get the professions for adding a new user 
      this.professionService.getProfession()
      .subscribe((data)=> this.professions=data)
       //---------FIN DE PROCESSUS DE RECUPERATION   ----------------------------------------------------------------------

  }

  // checker les erreurs dans les formulaires
  public checkError = (controlName: string, errorName: string) => {
    return this.addUserForm.controls[controlName].hasError(errorName);
  }
  /** APPEL DU SERVICE DE L'AJOUT DES UTILISATEUR................................*/
  public addNewUser(){
  //  console.log(this.user)
    this.user.actif=true;
    this.user.company = this.authService.entrepriseName;
    this.user.projets=null
    this.user.professions= this.idProfession;
    if(this.user.password == this.addUserForm.get('confirPassword').value){
      let res=this.userService.addUser(this.user);
      res.subscribe((data)=>this.message=data);
      this.onFermer();
    }
    
  }
  /* FIN DE PROCESSS D'AJOUT --------------*/

  public onFermer(){
    this.addUserForm.reset();
    this.fenetreReference.close();
  }


}
