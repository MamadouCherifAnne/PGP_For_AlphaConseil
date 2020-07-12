import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import {ITache} from '../Tache/ITache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient) { }

  ajoutTache(tache){
    return this.http.post("http://localhost:8080/tache/add",tache);
  }

 findAllTache(): Observable<ITache[]>{
   return this.http.get<ITache[]>("http://localhost:8080/tache/findAll");
  } 
}
