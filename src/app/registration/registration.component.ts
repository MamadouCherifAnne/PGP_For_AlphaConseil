import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/Utilisateur/Utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';
import { DataSourceconfig } from './DataSourceConfig';
import { TenantCompte } from './TenantCompte';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  public user: Utilisateur = new Utilisateur();
  public tenanMaster: TenantCompte  = new TenantCompte();
  public  hide:boolean = true;
  constructor(
    private formbuilder: FormBuilder,
    public userService:UtilisateurService
  ) { }

  ngOnInit() {
    this.registrationForm = this.formbuilder.group({
      'username':["", [Validators.required,Validators.maxLength(10)]],
      'nom':["", [Validators.required,Validators.maxLength(20),Validators.pattern('^[a-zA-Z \u00C0-\u00FF]*$')]],
      'prenom':["", [Validators.required,Validators.maxLength(20),Validators.pattern('^[a-zA-Z \u00C0-\u00FF]*$')]],
      'email':["", [Validators.required, Validators.email]],
      'password':["", [Validators.required,Validators.minLength(8)]],

      'telephone':["", [Validators.required,Validators.minLength(8),Validators.pattern('[0-9]*')]],

      'confirmPassword':["",[Validators.required]],

      'adresse':["", [Validators.required]],
      'company':["", [Validators.required,Validators.pattern('^[a-z]*')]],
      
    });
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }

  public loginUser(){
    console.log("user"+this.user);
  }

  public addNewRegistration(){
    
      //console.log(this.oldUser)
    let tenant:DataSourceconfig = new DataSourceconfig();
     
      this.user.username =this.registrationForm.get("username").value;
      this.user.nom =this.registrationForm.get("nom").value;
      this.user.prenom =this.registrationForm.get("prenom").value;
      this.user.email=this.registrationForm.get("email").value;
      this.user.adresse =this.registrationForm.get("adresse").value;
      this.user.telephone =this.registrationForm.get("telephone").value;
      this.user.company =this.registrationForm.get("company").value;
      this.user.password =this.registrationForm.get("password").value;
      this.user.confirmPassword =this.registrationForm.get("confirmPassword").value;
      this.user.actif = false;
      if(this.user.password == this.user.confirmPassword){
        this.tenanMaster.proprietaire = this.user;
        this.tenanMaster.tenantCompte = tenant;
        this.tenanMaster.tenantCompte.name=this.user.company;
        this.userService.registrationCompany(this.tenanMaster).subscribe(data=>{
          if(data){
            if(data == 1){
                console.log("abonnement creer veuillez patientez")
                // faire le message sur un toast;
            }else if(data == -1){
              console.log("ce username existe deja  veuillez la changer")
                // faire le message sur un toast;
            }else{
              console.log("un company du meme nom existe deja")
              // faire le message sur un toast;
            }
            // faire le message sur un toast;
          }
        });
      }else{
        //toast password non conforme
        console.log("password non conforme")
      }

     
  }

}
