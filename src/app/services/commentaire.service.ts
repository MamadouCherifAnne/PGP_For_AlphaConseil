import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from './authentification.service';
import { Observable } from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  entete:any ;
  jeton:string;
  public host =environment.alfaApiUrl;
  constructor(private http: HttpClient,private authService:AuthentificationService) {
    // Ici on prepare le chargement du jeton d'authentification pour acceder aux 
    // Requetes a travers l'entete authorization
    this.jeton = authService.getToken();
    this.entete= new HttpHeaders({'authorization':this.jeton}) 
   } 

  public deleteComment(idComment): Observable<any>{
    return this.http.delete(this.host+"/commentaire/deleteComment/"+idComment,{headers:this.entete});
  }
}
