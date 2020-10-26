import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IProjet } from "../Projet/IProjet";
import { Iphase } from "../Phase/Iphase";
import { ITache } from '../Tache/ITache';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  entete:any ;
  jeton:string;

  constructor(private http: HttpClient,private authService:AuthentificationService) {
    // Ici on prepare le chargement du jeton d'authentification pour acceder aux 
    // Requetes a travers l'entete authorization
    this.jeton = authService.getToken();
    this.entete= new HttpHeaders({'authorization':this.jeton}) 
  }
  //...............................................................................................
  public add(projet){
    return this.http.post("http://localhost:8080/projet/add", projet, {'responseType': 'text',headers:this.entete});
  }

  //...............................................................................................
  public getAllProjet(): Observable<IProjet[]>{
    return this.http.get<IProjet[]>("http://localhost:8080/projet/findAll",{headers:this.entete});
  }
//...............................................................................................
  public getById(idProjet): Observable<IProjet[]>{
    return this.http.get<IProjet[]>("http://localhost:8080/projet/findById/"+idProjet,{headers:this.entete});
  }
//...............................................................................................
  public update(projet, idProjet){
    return this.http.post("http://localhost:8080/projet/update/"+idProjet,projet, {'responseType': 'text',headers:this.entete});
  }
//...............................................................................................
  public delete(idProjet){
    return this.http.delete("http://localhost:8080/projet/delete/"+idProjet,{'responseType': 'text',headers:this.entete});
  }
//...............................................................................................
  public getByDateDebut(){
    return this.http.get(""); 
  }
//................................................................................................
  public AllphaseDeProjet(idProjet): Observable<Iphase[]>{
    return this.http.get<Iphase[]>("http://localhost:8080/projet/AllphaseDeProjet/"+idProjet,{headers:this.entete});
  }

//................................................................................................
  public projectAllTask(idProjet): Observable<ITache[]>{
    return this.http.get<ITache[]>("http://localhost:8080/projet/projectAllTask/"+idProjet,{headers:this.entete});
  }

  //...............................................................................................
  public projectAllTasks(idProject):Observable<any>{
    return this.http.get<any>("http://localhost:8080/projet/projectAllTask/"+idProject,{headers:this.entete});
  }

  // Afficher tout les jalons du projet
  public getProjectJalons(idProjet): Observable<ITache[]>{
    return this.http.get<ITache[]>("http://localhost:8080/projet/projectJalons/"+idProjet,{headers:this.entete});
  }

  // AFFICHER LES PROJET LIER A UN UTILISATEUR
  public allProjectOfUser(username): Observable<any>{
    return this.http.get<any>("http://localhost:8080/utilisateur/myProjects/"+username,{headers:this.entete});
  }
}
