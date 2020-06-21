import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IProjet } from "../Projet/IProjet";

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private http: HttpClient) { }

  public add(projet){
    return this.http.post("http://localhost:8080/projet/add", projet, {'responseType': 'text'});
  }

  public getAllProjet(): Observable<IProjet[]>{
    return this.http.get<IProjet[]>("http://localhost:8080/projet/findAll");
  }

  public delete(){
    return this.http.delete("");
  }

  public getByDateDebut(){
    return this.http.get("");
  }

}
