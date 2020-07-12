import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
<<<<<<< HEAD
import { Observable } from "rxjs";
import {ITache} from '../Tache/ITache';
=======
import { Observable } from 'rxjs';
>>>>>>> 1ce35799d665e0b69d64707b5208a3a024c13fad

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient) { }

  ajoutTache(tache){
    return this.http.post("http://localhost:8080/tache/add",tache);
  }

<<<<<<< HEAD
 findAllTache(): Observable<ITache[]>{
   return this.http.get<ITache[]>("http://localhost:8080/tache/findAll");
  } 
=======
  public getAllTasks(): Observable<any>{
    return this.http.get("http://localhost:8080/tache/all");
    }

    public getRessoucesForTask(idTache):Observable<any>{
      return this.http.get("http://localhost:8080/tache/ressourcesForTache/"+idTache)
    }
>>>>>>> 1ce35799d665e0b69d64707b5208a3a024c13fad
}
