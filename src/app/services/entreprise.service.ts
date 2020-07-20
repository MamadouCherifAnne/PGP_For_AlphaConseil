import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private http:HttpClient) { }

  // Ajout d'une nouvelle space de travail pour y gerer les projets d'une entreprise
  public addWorkSpace(proprietaire){
    return this.http.post("http://localhost:8080/entreprise/addEspaceTravail",proprietaire);
  }
}
