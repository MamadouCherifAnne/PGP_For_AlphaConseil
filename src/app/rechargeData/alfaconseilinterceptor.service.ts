import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthentificationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AlfaconseilinterceptorService implements HttpInterceptor {

  constructor(public authService:AuthentificationService, public router :Router
    ) { }
    // La methode de gestion des exception et des redirection en cas derreur
    handleError(erreur:HttpErrorResponse){
      console.log("une erreur sest produite le jwt es expire")
      this.router.navigate(['seConnecter']);
      return throwError(erreur);
    }

    // Une methode lorsque le usertoken est null
    isTokenNull(erreur:HttpErrorResponse){
      console.log("une erreur sest produite le jwt es expire")
      this.router.navigate(['seConnecter']);
      return throwError(erreur);
    }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // On definit le header pour chaque
     
      // On clone la requete en y integrant le header
      const clone = req.clone({
        setHeaders: {
          Authorization:"Bearer "+this.authService.getToken()
        }
      })
    
      // On laisse  l'appel passer
      return next.handle(clone)
        .pipe(
          
          catchError(this.handleError)
        )
      }
}
