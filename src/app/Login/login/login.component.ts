import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/Utilisateur/AppUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthentificationService,
    public router: Router,
    private userService:UtilisateurService
  ) {
    this.signinForm = this.fb.group({
      'username': ["",[Validators.required]],
      'password': ['',[Validators.required]]
    })
  }

  get username(){ return this.signinForm.get('username')}

  ngOnInit() {
    // on login avec le token
  
   }

  loginUser() {
    let userLogin = new AppUser();
    userLogin.username =this.signinForm.get("username").value;
    userLogin.password= this.signinForm.get("password").value;
    console.log("VOICI LE USERNAME "+ userLogin.username);
    console.log("VOICI LE USERNAME "+ userLogin.username);
    this.authService.login(userLogin);
   /* this.userService.verifToGetCmpany(userLogin.username).subscribe(data=>{
      if(data){
        console.log("LE TENANT"+data);
      }
    });*/
    
    //  this.authService.login(userLogin);
   /* this.authService.verifToGetCmpany(userLogin.username).subscribe(data=>{
      if(data){
        let verifUser = data;
         userLogin.company=verifUser
        
      }
    });*/
   // this.authService.seConnecter(this.signinForm.value)
   
  
  }
}
