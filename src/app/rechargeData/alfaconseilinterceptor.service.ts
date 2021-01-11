import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthentificationService } from '../services/authentification.service';
import { RechargeService } from './recharge.service';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlfaconseilinterceptorService implements HttpInterceptor {

  // url vers l'api backend
  public  alfaPgpUrl = environment.alfaApiUrl;

  constructor(public authService:AuthentificationService, public router :Router,
    public loadService:RechargeService,
    ) { }
    // La methode de gestion des exception et des redirection en cas derreur
    handleError(erreur:HttpErrorResponse){
      console.log("une erreur sest produite le jwt es expire")
      //this.router.navigate(['seConnecter']);
      return throwError(erreur);
    }

    // Une methode lorsque le usertoken est null
   /* isTokenNull(erreur:HttpErrorResponse){
      console.log("une erreur sest produite le jwt es expire")
      this.router.navigate(['seConnecter']);
      return throwError(erreur);
    }
*/
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // on get la configuration du loader
    this.loadService.isLoading.next(true);
    //this.authService.expirationCounter(this.authService.timeout);
      // On definit le header pour chaque
     
      // On clone la requete en y integrant le header
      console.log("Voici le getToken() +::"+this.authService.getToken())
      
      const clone = req.clone({
        setHeaders: {
          Authorization:"Bearer "+this.authService.getToken()
        }
        //url:this.alfaPgpUrl + req.url
      })
    
      // On laisse  l'appel passer
      return next.handle(clone)
        .pipe(
          
          catchError(this.handleError),
          finalize(
            () =>{
              
              this.loadService.isLoading.next(false);
              
            }
          )
        )
      }
}
