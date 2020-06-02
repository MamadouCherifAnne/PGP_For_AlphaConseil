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


  public addUser(user,idRole){
    return this.http.post("http://localhost:8080/utilisateur/new/"+idRole,user, {responseType:'text'})
  }

  public getUsers() : Observable<IUtilisateur[]>{
    return this.http.get<IUtilisateur[]>("http://localhost:8080/utilisateur/all");
  }
}
