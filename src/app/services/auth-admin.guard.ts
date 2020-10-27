import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { UtilisateurService } from './utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(
    public authService:AuthentificationService, public userService:UtilisateurService, public router:Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
        // On verifie si l'utilisateur qui veut acceder est authentifie ou non
        if(this.authService.isAdmin !==true ){
          let username = this.authService.getCurrentUser();
          console.log(username);
          let id :any = this.userService.getUserByUsername(username)
          // On fait une alerte 
          window.alert("Vous  n'avez pas les privilleges poyr y acceder");
          
          this.router.navigate(['']);
        } 
      return true;
    }
  }
