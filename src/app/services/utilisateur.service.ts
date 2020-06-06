import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http:HttpClient) { }


  public addUser(user,idRole){
    return this.http.post("http://localhost:8080/utilisateur/new/"+idRole,user, {responseType:'text'})
  }
}
