import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService:AuthentificationService, public router:Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // On verifie si l'utilisateur qui veut acceder est authentifie ou non
      if(this.authService.isLoggedIn !==true){
        // On fait une alerte 
        window.alert("Vous netes pas authentifier vous n'avez pas le droit");
        this.router.navigate(['seConnecter']);
      } 
    return true;
  }
  
}
