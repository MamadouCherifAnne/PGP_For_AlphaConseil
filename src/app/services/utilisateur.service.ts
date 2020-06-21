import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { IUtilisateur } from '../Utilisateur/IUtilisateur';
import { Observable } from 'rxjs';


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
  public getUserByIdUser(idUser): Observable<void> {
    return this.http.get<void>("http://localhost:8080/utilisateur/findUser/"+idUser);
  }
}
