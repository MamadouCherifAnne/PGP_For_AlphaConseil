import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  entete:any ;
  jeton:string;

  constructor(private http: HttpClient,private authService:AuthentificationService) {
    // Ici on prepare le chargement du jeton d'authentification pour acceder aux 
    // Requetes a travers l'entete authorization
    this.jeton = authService.getToken();
    this.entete= new HttpHeaders({'authorization':this.jeton}) 
   } 
  // Ajout d'une nouvelle space de travail pour y gerer les projets d'une entreprise
  public addWorkSpace(proprietaire){
    return this.http.post("http://localhost:8080/entreprise/addEspaceTravail",proprietaire,{headers:this.entete});
  }

  public updateEntreprise(proprietaire){
    return this.http.post("http://localhost:8080/entreprise/update",proprietaire,{headers:this.entete});
  }
  public delete(idEntreprise){
    return this.http.delete("http://localhost:8080/entreprise/addEspaceTravail/"+idEntreprise,{headers:this.entete});
  }

  public getAllEntreprise(): Observable <any>{
    return this.http.get<any>("http://localhost:8080/entreprise/all",{headers:this.entete})
  }

  public getEntreprise(idEntreprise): Observable <any>{
    return this.http.get<any>("http://localhost:8080/entreprise/findEntreprise/"+idEntreprise,{headers:this.entete})
  }
}
