import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { IRole } from '../Role/IRole';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public host = environment.alfaApiUrl;
  constructor(private http:HttpClient) { }



  roleForm: FormGroup = new FormGroup({
    role: new FormControl('', Validators.required)});

    // 
    

    //Methode de consoomation du service ajout de role
     public addRoleService(role){
       return this.http.post(environment.alfaApiUrl+"/role/new",role,{responseType:'text'});
     }
     // La liste Des role
     public getRoles() : Observable<IRole[]>{
       return this.http.get<IRole[]>(environment.alfaApiUrl+"/role/all");
     }
     // update role
     public updateRole(role,idRole){
       return this.http.post(environment.alfaApiUrl+"/role/update/"+idRole,role,{responseType:'text'})
     }
     //supprimer un role
     public deleteRole(idrole){
       return this.http.post(environment.alfaApiUrl+"/role/delete/"+idrole,{responseType:'text'})
     }


}
