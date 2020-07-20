import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IProjet } from "../Projet/IProjet";
import { Iphase } from "../Phase/Iphase";
import { ITache } from '../Tache/ITache';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http: HttpClient) { }
  //...............................................................................................
  public add(projet){
    return this.http.post("http://localhost:8080/projet/add", projet, {'responseType': 'text'});
  }

  //...............................................................................................
  public getAllProjet(): Observable<IProjet[]>{
    return this.http.get<IProjet[]>("http://localhost:8080/projet/findAll");
  }
//...............................................................................................
  public getById(idProjet): Observable<IProjet[]>{
    return this.http.get<IProjet[]>("http://localhost:8080/projet/findById/"+idProjet);
  }
//...............................................................................................
  public update(projet, idProjet){
    return this.http.post("http://localhost:8080/projet/update/"+idProjet,projet, {'responseType': 'text'});
  }
//...............................................................................................
  public delete(idProjet){
    return this.http.delete("http://localhost:8080/projet/delete/"+idProjet,{'responseType': 'text'});
  }
//...............................................................................................
  public getByDateDebut(){
    return this.http.get(""); 
  }
//................................................................................................
  public AllphaseDeProjet(idProjet): Observable<Iphase[]>{
    return this.http.get<Iphase[]>("http://localhost:8080/projet/AllphaseDeProjet/"+idProjet);
  }

//................................................................................................
  public projectAllTask(idProjet): Observable<ITache[]>{
    return this.http.get<ITache[]>("http://localhost:8080/projet/projectAllTask/"+idProjet);
  }

  //...............................................................................................
  public projectAllTasks(idProject):Observable<any>{
    return this.http.get<any>("http://localhost:8080/projet/projectAllTask/"+idProject);
  }
}
