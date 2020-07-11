import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient) { }

  ajoutTache(tache){
    return this.http.post("http://localhost:8080/tache/add",tache,{responseType:'text'});
  }

  public getAllTasks(): Observable<any>{
    return this.http.get("http://localhost:8080/tache/all");
    }

    public getRessoucesForTask(idTache):Observable<any>{
      return this.http.get("http://localhost:8080/tache/ressourcesForTache/"+idTache)
    }
}
