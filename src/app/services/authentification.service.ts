 import { Injectable } from '@angular/core';
import {Observable, of, Subscription, throwError} from 'rxjs';
import {Utilisateur} from '../Utilisateur/Utilisateur';
import { catchError, delay, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { UtilisateurService } from './utilisateur.service';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  // On definit les headers et le serveur 
  public host =environment.alfaApiUrl;
  // On definit l'entete des formats de donnes de nos services
  public entete  = new HttpHeaders().set('Content-Type','application/json');
  public jwtToken :string;
  public currentUser ={};
  public entrepriseName:string;
  public tokenSubscription = new Subscription()
  public timeout;

  constructor(private http:HttpClient,
    public router:Router
    ) { }

    //service Login dune autre maniere
    public login(user){
      return this.http.post(this.host+"/authenticate/login",user,{observe:'response'})
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
          this.entrepriseName = userBody.tenantID;
          console.log(userBody.tenantID);
           
         this.getUserProfile(username).subscribe((res) => {
          this.currentUser = res;
          console.log(res);
          this.router.navigate(['user/profil/'+ res.idUser]);
        });
          

         

        }
       
       // localStorage.setItem("token",jwtToken);
     
      });
    }

    // Get ENtreprise name
    public get getEntrepriseName():String{
      let company:string ="";
      let keys =this.decodeJwtToken()
      console.log(keys);
      
      company = keys.tenantID;
      console.log("company "+ company);
      return company;

    }

    // Recuperer le jwt
    public saveJWT(jwtToken){
      this.jwtToken=jwtToken;
      localStorage.setItem('token',this.jwtToken) //jwtToken
      const jwtHelper = new JwtHelperService();
      const userBody =jwtHelper.decodeToken(this.jwtToken);
      //recuperer la date de lexipiration du cle jwt 
      this.timeout = jwtHelper.getTokenExpirationDate(this.jwtToken).valueOf() - new Date().valueOf();
      console.log(this.timeout);
      console.log(userBody)
      //console.log("Voici le utilisateur connecte:"+userBody.sub+" avec les roles :"+userBody.roles)
      //on gette l'expiration de la jwt de user courrant
      this.expirationCounter(this.timeout);
    }
    // Decodage du token
    public decodeJwtToken(){
      const jwtHelper = new JwtHelperService();
      if(this.getToken() !== null){
      const userBody =jwtHelper.decodeToken(this.getToken());
      
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

    public get getCurrentCompany(): string {
      let authenticateUser = this.decodeJwtToken();
      if(authenticateUser != null){
        console.log(authenticateUser.tenantID);
        return authenticateUser.tenantID;
      }
      return null; 
    }
    

    // Service de Registration d'un nouveau utilisateur
    public registrer(user:Utilisateur):Observable<any>{
      let service = this.host+'/utilisateur/new';
      return this.http.post(service,user)
        .pipe(
          // On capte si ya une exception generer
          catchError(this.handleError)
        )
    }

    // Service de L'authentification
    seConnecter(user:Utilisateur){

      let service = this.host+'/authenticate/login';
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
      let service =this.host+"/utilisateur/findUsername/"+username;
      return this.http.get(service, { headers: new HttpHeaders({'authorization':this.getToken()}) }).pipe(
        map((res: Response) => {
          if(res){
            
          return res || null;
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
      this.tokenSubscription.unsubscribe();
      this.jwtToken = null;
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
      //this.isNotExpiredKey();
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


        // Verifier si il est un admin
    
        public get isSuperAdmin() : boolean {
          let isSuperAdmin:boolean=false;
          //this.isNotExpiredKey();
          const jwtHelper = new JwtHelperService();
          if(this.isLoggedIn && this.getToken()!==null){
           const  verifUser=jwtHelper.decodeToken(this.getToken());
           let roles:any[] = verifUser.roles;
           console.log(roles)
           
           for(let v=0;v<roles.length; v++){
             if(roles[v] =="SUPERADMIN"){
               return true;
             }
             console.log(roles[v]);
            }
           }
         
           return isSuperAdmin;
       
           
        }


    public getUserByUsername(username){
      /* { headers: new HttpHeaders({'authorization':this.getToken()}) }*/
      let user:any;
      let service = this.host+"/utilisateur/findUsername/"+username;
      return this.http.get(service)
      .subscribe(res=>{
        if(res){
          user = res;
          return user;
        }
      });
      
    }

    // get object of the current user
    public getObjectUserConnected(){
      
      let username =this.getCurrentUser();
    
        let user = this.getUserByUsername(username);
        return user;
      }

      isNotExpiredKey(){
        
        let verif:boolean = false
        if(this.getToken() != null){
          let decodedToken =  this.decodeJwtToken();
          let expired = decodedToken.exp;
          let date = new Date(expired *1000);
          let now = new Date();
          if(date < now){
            verif = true;
            console.log(expired)
            console.log("La date de expiration"+date);
            // la cles est expirer on supprime la session demande d'une nouvelle connexion
            //this.doLogout();
          }
          
          return verif;
        }

        
      }

  
   public  expirationCounter(expiredTime) {
      this.tokenSubscription.unsubscribe();
      
      this.tokenSubscription = of(null).pipe(delay(expiredTime)).subscribe((expired) => {
        console.log('Votre connecxion a expire veuillez vous reconnecter a nouveau!!');
        this.jwtToken = null
        this.doLogout();
        
      });
    }

}
