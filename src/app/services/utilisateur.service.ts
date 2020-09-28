import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { IUtilisateur } from '../Utilisateur/IUtilisateur';
import { Observable } from 'rxjs';
import { ITache } from '../Tache/ITache';
import { AuthentificationService } from './authentification.service';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  entete:any ;
  jeton:string;

  constructor(private http: HttpClient,private authService:AuthentificationService) {
    // Ici on prepare le chargement du jeton d'authentification pour acceder aux 
    // Requetes a travers l'entete authorization
    this.jeton = authService.getToken();
    this.entete= new HttpHeaders({'authorization':this.jeton}) 
  }

  public addUser(user){
    return this.http.post("http://localhost:8080/utilisateur/new/",user,{responseType:'text'})
  }

  public updateUser(user, idUser){
    return this.http.post("http://localhost:8080/utilisateur/update/"+idUser,user,{responseType:'text',headers:this.entete})
  }

  // Delete un utilisateur
  public deleteUser(idUser){

    return this.http.post("http://localhost:8080/utilisateur/delete/"+idUser,[]);
  }
  

  public getUsers() : Observable<IUtilisateur[]>{
    return this.http.get<IUtilisateur[]>("http://localhost:8080/utilisateur/all");
  }
  // find user by name
  public getUserByIdUser(idUser){
    return this.http.get("http://localhost:8080/utilisateur/findUser/"+idUser);
  }
  public getUserByUsername(username):Observable<any>{
    return this.http.get("http://localhost:8080/utilisateur/findUserByUsername/"+username)

  }

  // Affecter un utilisateur a une tache
  public affectToTask(userAffect){
    return this.http.post("http://localhost:8080/affectation/add/",userAffect,{responseType:'text'})
  }
  // Afficher toutes les taches a realise de l'utilisateur
  public getTaskToRealise(idUser): Observable<any>{
  return this.http.get("http://localhost:8080/utilisateur/tacheToRealise/"+idUser);
  }

  // ENvoie de message A un utilisateur
  public sendMessageToUser(message){
    return this.http.post("http://localhost:8080/message/sendMessage",message);
  }

  public verifToGetCmpany(noname):Observable<any>{
    return this.http.get("http://localhost:8080/utilisateur/tryVerifUserCompany/"+noname);
  }
}
