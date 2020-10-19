import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Utilisateur} from '../Utilisateur/Utilisateur';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  // On definit les headers et le serveur 
  host:string = 'http://localhost:8080/';
  // On definit l'entete des formats de donnes de nos services
  entete  = new HttpHeaders().set('Content-Type','application/json');
  jwtToken :string;
  currentUser ={};

  constructor(private http:HttpClient,
    public router:Router
    ) { }

    //service Login dune autre maniere
    public login(user){
      return this.http.post("http://localhost:8080/authenticate/login",user,{observe:'response'})
      .subscribe((data)=>{
        let bodyToken:any;
        console.log(data.body.valueOf())
        bodyToken = data.body.valueOf();
       
        let jwtToken = bodyToken["token"];
        console.log(jwtToken);
        if(jwtToken!== null){
          let use =this.saveJWT(jwtToken);
          const jwtHelper = new JwtHelperService();
          const userBody =jwtHelper.decodeToken(this.getToken())
          console.log(userBody.sub);
          let username =  userBody.sub
          
          console.log(userBody.sub);
           
         this.getUserProfile(username).subscribe((res) => {
          this.currentUser = res;
          console.log(res);
          this.router.navigate(['user/profil/'+ res.idUser]);
        });
          

         

        }
       
       // localStorage.setItem("token",jwtToken);
     
      });
    }

    // Recuperer le jwt
    public saveJWT(jwtToken){
      this.jwtToken=jwtToken;
      localStorage.setItem('token',jwtToken)
      const jwtHelper = new JwtHelperService();
      const userBody =jwtHelper.decodeToken(this.jwtToken);
      console.log(userBody)
      //console.log("Voici le utilisateur connecte:"+userBody.sub+" avec les roles :"+userBody.roles)
      
    }
    // Decodage du token
    public decodeJwtToken(){
      const jwtHelper = new JwtHelperService();
      if(this.jwtToken !== null){
      const userBody =jwtHelper.decodeToken(this.getToken());
      console.log(userBody)
      return userBody;
      }
      return null;
    }
    // getCurrent utilisateur
    public getCurrentUser(){
      let authenticateUser = this.decodeJwtToken();
      if(authenticateUser != null){
        console.log(authenticateUser.sub);
        return authenticateUser.sub;
      }
      return null;

      


    }

    // Service de Registration d'un nouveau utilisateur
    public registrer(user:Utilisateur):Observable<any>{
      let service = 'http://localhost:8080/utilisateur/new';
      return this.http.post(service,user)
        .pipe(
          // On capte si ya une exception generer
          catchError(this.handleError)
        )
    }

    // Service de L'authentification
    seConnecter(user:Utilisateur){

      let service = 'http://localhost:8080/authenticate/login';
      return this.http.post<any>(service,user,{observe:'response'})
      .subscribe((resp:any)=>{
        console.log(resp)
       
        localStorage.setItem("token",resp.token);
        console.log(resp.token)
        this.getUserProfile(resp.idUser).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['utilisateur']);
        });
      });
    }


    // Recuperer le profil de l'utilisateur en cours
    getUserProfile(username):Observable<any>{
      let service = "http://localhost:8080/utilisateur/findUsername/"+username;
      return this.http.get(service, { headers: new HttpHeaders({'authorization':this.getToken()}) }).pipe(
        map((res: Response) => {
          if(res){
            console.log(res.body)
          return res || {}
          }
        }),
        catchError(this.handleError)
      )
    }

    // Save the JWT TOKEN


    // Gestion du login et du logout
    getToken() {
      return localStorage.getItem('token');
    }
  
    
    public get isLoggedIn() : boolean {
      let authToken = localStorage.getItem('token');
      return (authToken !== null) ? true : false;
    }
  
    doLogout() {
      let removeToken = localStorage.removeItem('token');
      if (removeToken == null) {
        this.router.navigate(['seConnecter']);
      }
    }

   

    // Gestion des messages d'exceptions
    handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Code de l'erreur: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }
    // Verifier si il est un admin
    
    public get isAdmin() : boolean {
      let isadmin:boolean=false;
      const jwtHelper = new JwtHelperService();
      if(this.isLoggedIn && this.getToken()!==null){
       const  verifUser=jwtHelper.decodeToken(this.getToken());
       let roles:any[] = verifUser.roles;
       console.log(roles)
       
       for(let v=0;v<roles.length; v++){
         if(roles[v] =="ADMIN"){
           return true;
         }
         console.log(roles[v]);
        }
       }
     
       return isadmin;
   
       
    }
    

}
