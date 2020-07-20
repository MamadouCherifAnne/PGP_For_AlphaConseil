import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import{UtilisateurService} from "src/app/services/utilisateur.service"
import{EntrepriseService} from "src/app/services/entreprise.service"
import { Utilisateur } from 'src/app/Utilisateur/Utilisateur';
import { Entreprise } from '../Entreprise';

@Component({
  selector: 'app-add-entreprise',
  templateUrl: './add-entreprise.component.html',
  styleUrls: ['./add-entreprise.component.scss']
})
export class AddEntrepriseComponent implements OnInit {

  WorkSpaceForm:FormGroup;
  user:Utilisateur = new Utilisateur();
  workSpace:Entreprise =new Entreprise();
  mdpIsValid:boolean=false;
  resultat:any;

  constructor(private userService:UtilisateurService,
              private formBuilder:FormBuilder,
              private entrepriseService:EntrepriseService
    ) { }

  ngOnInit() {
    
    this.WorkSpaceForm=this.formBuilder.group({
      'username':[this.user.nom, [Validators.required]],
      'prenom':[this.user.prenom, [Validators.required]],
      'email':[this.user.email, [Validators.required, Validators.email]],
      'password':[this.user.password, [Validators.required,Validators.minLength(10)]],
      'ConfirmPassword':[this.user.confirmPassword, [Validators.required]],
      'telephone':[this.user.telephone, [Validators.required,Validators.minLength(8)]],
      'adresse':[this.user.adresse, [Validators.required]],
      // Information sur l entreprise
      'nameEntreprise':[this.workSpace.nameEntreprise, [Validators.required]],
      //'domaineEntreprise':[this.workSpace.domaine_Entreprise, [Validators.required]],
      'adresseEntreprise':[this.workSpace.adresseEntreprise, [Validators.required]],
    });

  }

  //.....................................................
  public addNewWorkspace(){
    this.user.actif=true;
    this.user.nom =this.WorkSpaceForm.get("username").value;
    this.user.prenom =this.WorkSpaceForm.get("prenom").value;
    this.user.email=this.WorkSpaceForm.get("email").value;
    this.user.adresse =this.WorkSpaceForm.get("adresse").value;
    this.user.telephone =this.WorkSpaceForm.get("telephone").value;
    this.user.password =this.WorkSpaceForm.get("password").value;
    this.user.confirmPassword =this.WorkSpaceForm.get("ConfirmPassword").value;

    
    // Recuperation des infos sur le work space
    this.workSpace.nameEntreprise=this.WorkSpaceForm.get("nameEntreprise").value;
   // this.workSpace.domaine_Entreprise=this.WorkSpaceForm.get("domaineEntreprise").value;
    this.workSpace.adresseEntreprise=this.WorkSpaceForm.get("adresseEntreprise").value;
    
    this.user.entreprise =this.workSpace;
      // puis on sauvegarde les infos 
      this.entrepriseService.addWorkSpace(this.user).subscribe(data=>{
        if(data){
        this.resultat=data;
      }
      });

    
    
  }


}
