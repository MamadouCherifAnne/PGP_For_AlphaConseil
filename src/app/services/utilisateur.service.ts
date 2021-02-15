import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { IUtilisateur } from '../Utilisateur/IUtilisateur';
import { Observable } from 'rxjs';
import { ITache } from '../Tache/ITache';
import { AuthentificationService } from './authentification.service';

import{environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  entete:any ;
  jeton:string;

  constructor(private http: HttpClient,public authService:AuthentificationService) {
    // Ici on prepare le chargement du jeton d'authentification pour acceder aux 
    // Requetes a travers l'entete authorization
    this.jeton = authService.getToken();
    this.entete= new HttpHeaders({'authorization':this.jeton}) 
  }

  public addUser(user){
    return this.http.post(environment.alfaApiUrl+"/utilisateur/new/",user,{responseType:'text'})
  }

  public updateUser(user, idUser){
    return this.http.post(environment.alfaApiUrl+"/utilisateur/update/"+idUser,user,{responseType:'text',headers:this.entete})
  }

  // Delete un utilisateur
  public deleteUser(idUser){

    return this.http.post(environment.alfaApiUrl+"/utilisateur/delete/"+idUser,{})
  }

  // registration

  public registrationCompany(user){
    return this.http.post(environment.alfaApiUrl+"/locataire/newLocataire",user,{});
  }
  

  public getUsers() : Observable<IUtilisateur[]>{
    return this.http.get<IUtilisateur[]>(environment.alfaApiUrl+"/utilisateur/all");
  }
  // find user by name
  public getUserByIdUser(idUser){
    return this.http.get(environment.alfaApiUrl+"/utilisateur/findUser/"+idUser);
  }


  public getUserByUsername(username):Observable<any>{
    return this.http.get(environment.alfaApiUrl+"/utilisateur/findUsername/"+username)

  }

  public getAlluserTasks(iduser): Observable<any>{
    return this.http.get(environment.alfaApiUrl+"/utilisateur/tasksUser/"+iduser);
  }

  // Affecter un utilisateur a une tache
  public affectToTask(userAffect){
    return this.http.post(environment.alfaApiUrl+"/affectation/add/",userAffect,{responseType:'text'})
  }
  // Afficher toutes les taches a realise de l'utilisateur
  public getTaskToRealise(idUser): Observable<any>{
  return this.http.get(environment.alfaApiUrl+"/utilisateur/tacheToRealise/"+idUser);
  }

  // ENvoie de message A un utilisateur
  public sendMessageToUser(message){
    return this.http.post(environment.alfaApiUrl+"/message/sendMessage",message);
  }
  //Modifier etat du message
  public modifEtatMessage(idmessage){
    return this.http.post(environment.alfaApiUrl+"/message/modifEatMessage/"+idmessage,{responseType:'text'});
  }

  // recuperer mes messages
  public getMessageRecieved(idUser): Observable<any>{
    return this.http.get(environment.alfaApiUrl+"/utilisateur/boiteReception/"+idUser);
    }
   // recuperer mes messages non lu
   public getMessageRecievedNonLus(username): Observable<any>{
    return this.http.get(environment.alfaApiUrl+"/utilisateur/messageNonLus/"+username);
    }

    public getProjetsEncours(username): Observable<any>{
      return this.http.get(environment.alfaApiUrl+"/utilisateur/listOfprojetEncours/"+username);
    }

    public getProjetEnretard(username): Observable<any>{
      return this.http.get(environment.alfaApiUrl+"/utilisateur/listOfprojetEnRetard/"+username)
    }

    public getProjetTermines(username): Observable<any>{
      return this.http.get(environment.alfaApiUrl+"/utilisateur/listOfprojetTermines/"+username)
    }


   public nombreMessageNonLu:number =0;
   
   // methode de detection de nombre des messages non lus
   public getMessageNonLus(){
     if(this.authService.getCurrentUser() != null){
      this.getMessageRecievedNonLus(this.authService.getCurrentUser()).subscribe(result=>{
        if(result){
          this.nombreMessageNonLu = result.msgNonLu;
        }
      })
    }
   }
}
