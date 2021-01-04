import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from "rxjs";
import {ITache} from '../Tache/ITache';
import { AuthentificationService } from './authentification.service';
import{environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TacheService {

  entete:any ;
  jeton:string;

  constructor(private http: HttpClient,private authService:AuthentificationService) {
    // Ici on prepare le chargement du jeton d'authentification pour acceder aux 
    // Requetes a travers l'entete authorization
    this.jeton = authService.getToken();
    this.entete= new HttpHeaders({'authorization':this.jeton}) 
  }
//....................................ajout tache.....................;............................
  ajoutTache(tache){
    return this.http.post(environment.alfaApiUrl+"/tache/add",tache,{headers:this.entete});
  }

  ajoutJalon(tache){
    return this.http.post(environment.alfaApiUrl+"/tache/addJalon",tache,{headers:this.entete});
  }

  //......................................................................................
 findAllTache(): Observable<ITache[]>{
   return this.http.get<ITache[]>(environment.alfaApiUrl+"/tache/findAll",{headers:this.entete});
  } 


  public getAllTasks(): Observable<any>{
    return this.http.get(environment.alfaApiUrl+"/tache/all",{headers:this.entete});
  }
//...........................les ressources d'une tache.................................................................
  public getRessoucesForTask(idTache):Observable<any>{
      return this.http.get(environment.alfaApiUrl+"/tache/ressourcesForTache/"+idTache,{headers:this.entete})

  }

  //................supprimer une tache.......................................;
  public deleteTask(idTache){
    if(this.authService.isAdmin){
    return this.http.delete(environment.alfaApiUrl+"/tache/delete/"+idTache,{headers:this.entete});
    }else{
      // On fait une alerte 
      window.alert("Vous netes pas authentifier vous n'avez pas le droit");
    }
  }
  //.......................modifier une tache .............................................
  public updateTask(idtache, tache){
    return this.http.post(environment.alfaApiUrl+"/tache/update/"+idtache, tache,  {'responseType': 'text',headers:this.entete});
  }

  //................modifier tache secondaire.....................
  public updateTaskSecondaire(idtache, tache){
    return this.http.put(environment.alfaApiUrl+"/tache/updateSecondaire/"+idtache, tache, {'responseType': 'text',headers:this.entete});
  }
    
    // Recuperer la liste des taches precedents d'une tache ayant de predecesseur

  public getPredecesseurTask(idTache):Observable<any>{
      return this.http.get<any>(environment.alfaApiUrl+"/tache/predecesseurs/"+idTache,{headers:this.entete});
  }
  
  //..... recuperation d'une tache by Id.......................................
  public getTache(tacheId):Observable<any>{
    return this.http.get<any>(environment.alfaApiUrl+"/tache/findTache/" +tacheId,{headers:this.entete});
  }

  // Listes des taches succeptibles d'etre des predecesseurs a une tache T
  public getPotentielPredecesseurs(tacheId):Observable<any>{
    return this.http.get<any>(environment.alfaApiUrl+"/tache/potentielPredecesseurs/" +tacheId,{headers:this.entete});
  }

  // Ajouter ds commentaires a une tache
  public addCommentToTask(comments){
    return this.http.post(environment.alfaApiUrl+"/tache/addCommentsToTask",comments,{headers:this.entete})
  }

  // Afficher les commentaires effectue sur une tache
  public getCommentsOfTask(idTache):Observable<any>{
    return this.http.get<any>(environment.alfaApiUrl+"/tache/commentsOfTask/" +idTache,{headers:this.entete});
  }

  // Ajouter Une depense a une tache
  public addDepenseToTask(depense){
    return this.http.post(environment.alfaApiUrl+"/tache/addDepenseToTask",depense,{headers:this.entete}) 
  }

  // Afficher toutes les depenses dune tache
  public getTaskDepenses(idTache):Observable<any>{
    return this.http.get<any>(environment.alfaApiUrl+"/tache/depenseOfTask/" +idTache,{headers:this.entete});
  }
  
  // Afficher les affectations sur une tache donne
  public getAffectationOfTask(idTache):Observable<any>{
    return this.http.get<any>(environment.alfaApiUrl+"/affectation/tacheAffectations/" +idTache,{headers:this.entete});
  }

   // Afficher les affectations sur une tache avec un format preparer pour laffichage
  public getAffectationOfTaskFormat(idTache):Observable<any>{
    return this.http.get<any>(environment.alfaApiUrl+"/affectation/tacheAffectationsFormater/" +idTache,{headers:this.entete});
  }
  
  // Afficher les dernieres affectation dun utilisateur selon la date d'affectation de la tache
  public getLatestAffectationOfUser(username):Observable<any>{
    return this.http.get<any>(environment.alfaApiUrl+"/affectation/LatestTacheToRealise/" +username);
  }

  // Modifier l'affectation sur une tache donnee
  public updateAffectationOfTask(affectation){
    return this.http.post(environment.alfaApiUrl+"/affectation/update",affectation,{responseType:'text',headers:this.entete});
  }
  
  // Supprimer une affectation d'une tache
  public deleteAffectation(idAffect){
    return this.http.post(environment.alfaApiUrl+"/affectation/deleteAffectation",idAffect,{responseType:'text',headers:this.entete});
  }

  // Afficher une Affectation par son id
  public getAffectationById(idUser,idTache):Observable<any>{
    return this.http.get<any>(environment.alfaApiUrl+"/affectation/getAffectationById/"+idUser+"/"+idTache,{headers:this.entete});
  }

  // Afficher le createur de la tache
  public getOwner(idTache):Observable<any>{
    return this.http.get(environment.alfaApiUrl+"/tache/getOwner/"+idTache,{responseType:'text',headers:this.entete});
  }


  // Recuperer les informations 

  

  public getTachesInfo(idProjet):Observable<any>{
    return this.http.get(environment.alfaApiUrl+"/tache/TasksInformation/"+idProjet,{headers:this.entete});
  }
  //les tache, le phase et le projet en meme temps

  public getTacheProject(idTache):Observable<any>{
    return this.http.get(environment.alfaApiUrl+"/tache/getTacheProject/"+idTache,{headers:this.entete});
  }

  public getPhaseDuneTache(idTache): Observable<any>{
    return this.http.get(environment.alfaApiUrl+"/tache/getPhaseDuneTache/"+idTache,{headers:this.entete});
  }

  // affiche de la tache avec sa liste des depenses  et ses infos
  public getTacheWithDepenses(idTache): Observable<any>{
    return this.http.get(environment.alfaApiUrl+"/tache/gettachewithdepenses/"+idTache);
  }


}
