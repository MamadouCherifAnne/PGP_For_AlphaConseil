import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from './authentification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  entete:any ;
  jeton:string;

  constructor(private http: HttpClient,private authService:AuthentificationService) {
    // Ici on prepare le chargement du jeton d'authentification pour acceder aux 
    // Requetes a travers l'entete authorization
    this.jeton = authService.getToken();
    this.entete= new HttpHeaders({'authorization':this.jeton}) 
   } 

  public deleteComment(idComment): Observable<any>{
    return this.http.delete("http://localhost:8080/commentaire/deleteComment/"+idComment,{headers:this.entete});
  }
}
