import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { IUtilisateur } from '../Utilisateur/IUtilisateur';
import { Observable } from 'rxjs';
import { ITache } from '../Tache/ITache';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http:HttpClient) { }

  

  public addUser(user){
    return this.http.post("http://localhost:8080/utilisateur/new/",user,{responseType:'text'})
  }

  public updateUser(user, idUser){
    return this.http.post("http://localhost:8080/utilisateur/update/"+idUser,user,{responseType:'text'})
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
    return this.http.post("http://localhost:8080/message/sendMessage/",message);
  }
}
