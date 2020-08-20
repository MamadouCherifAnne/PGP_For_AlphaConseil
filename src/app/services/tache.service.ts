import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Observable } from "rxjs";
import {ITache} from '../Tache/ITache';


@Injectable({
  providedIn: 'root'
})
export class TacheService {

  constructor(private http: HttpClient) { }
//....................................ajout tache.....................;............................
  ajoutTache(tache){
    return this.http.post("http://localhost:8080/tache/add",tache);
  }

  ajoutJalon(tache){
    return this.http.post("http://localhost:8080/tache/addJalon",tache);
  }

  //......................................................................................
 findAllTache(): Observable<ITache[]>{
   return this.http.get<ITache[]>("http://localhost:8080/tache/findAll");
  } 


  public getAllTasks(): Observable<any>{
    return this.http.get("http://localhost:8080/tache/all");
  }
//...........................les ressources d'une tache.................................................................
  public getRessoucesForTask(idTache):Observable<any>{
      return this.http.get("http://localhost:8080/tache/ressourcesForTache/"+idTache)

  }

  //................supprimer une tache.......................................;
  public deleteTask(idTache){
    return this.http.delete("http://localhost:8080/tache/delete/"+idTache);
  }
  //.......................modifier une tache .............................................
  public updateTask(idtache, tache){
    return this.http.post("http://localhost:8080/tache/update/"+idtache, tache,  {'responseType': 'text'});
  }

    
    // Recuperer la liste des taches precedents d'une tache ayant de predecesseur

  public getPredecesseurTask(idTache):Observable<any>{
      return this.http.get<any>("http://localhost:8080/tache/predecesseurs/"+idTache);
  }
  
  //..... recuperation d'une tache by Id.......................................
  public getTache(tacheId):Observable<any>{
    return this.http.get<any>("http://localhost:8080/tache/findTache/" +tacheId);
  }

  // Listes des taches succeptibles d'etre des predecesseurs a une tache T
  public getPotentielPredecesseurs(tacheId):Observable<any>{
    return this.http.get<any>("http://localhost:8080/tache/potentielPredecesseurs/" +tacheId);
  }

  // Ajouter ds commentaires a une tache
  public addCommentToTask(comments){
    return this.http.post("http://localhost:8080/tache/addCommentsToTask",comments)
  }

  // Afficher les commentaires effectue sur une tache
  public getCommentsOfTask(idTache){
    return this.http.get<any>("http://localhost:8080/tache/commentsOfTask/" +idTache);
  }


}
