import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { IRole } from '../Role/IRole';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  roleForm: FormGroup = new FormGroup({
    role: new FormControl('', Validators.required)});

    //Methode de consoomation du service ajout de role
     public addRoleService(role){
       return this.http.post("http://localhost:8080/role/new",role,{responseType:'text' as 'json'});
     }
     // La liste Des role
     public getRoles() : Observable<IRole[]>{
       return this.http.get<IRole[]>("http://localhost:8080/role/all");
     }


}
