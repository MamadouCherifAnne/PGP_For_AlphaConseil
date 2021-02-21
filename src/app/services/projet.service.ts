import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IProjet } from "../Projet/IProjet";
import { Iphase } from "../Phase/Iphase";
import { ITache } from '../Tache/ITache';
import { AuthentificationService } from './authentification.service';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProjetService {
public static isowner:boolean=false;

  public refreshProject:boolean = false;
  public host = environment.alfaApiUrl;

  entete:any ;
  jeton:string;

  constructor(private http: HttpClient,private authService:AuthentificationService) {
    // Ici on prepare le chargement du jeton d'authentification pour acceder aux 
    // Requetes a travers l'entete authorization
    this.jeton = authService.getToken();
    this.entete= new HttpHeaders({'authorization':this.jeton}) 
  }
  //...............................................................................................
  public add(projet){
    return this.http.post(this.host+"/projet/add", projet, {'responseType': 'text',headers:this.entete});
  }

  //...............................................................................................
  public getAllProjet(): Observable<IProjet[]>{
    return this.http.get<IProjet[]>(this.host+"/projet/findAll",{headers:this.entete});
  }
//...............................................................................................
  public getById(idProjet): Observable<IProjet[]>{
    return this.http.get<IProjet[]>(this.host+"/projet/findById/"+idProjet,{headers:this.entete});
  }
//...............................................................................................
  public update(projet, idProjet){
    return this.http.post(this.host+"/projet/update/"+idProjet,projet, {'responseType': 'text',headers:this.entete});
  }
//...............................................................................................
  public delete(idProjet){
    return this.http.delete(this.host+"/projet/delete/"+idProjet,{'responseType': 'text',headers:this.entete});
  }
//...............................................................................................
  public getByDateDebut(){
    return this.http.get(""); 
  }
//................................................................................................
  public AllphaseDeProjet(idProjet): Observable<Iphase[]>{
    return this.http.get<Iphase[]>(this.host+"/projet/AllphaseDeProjet/"+idProjet,{headers:this.entete});
  }

//................................................................................................
  public projectAllTask(idProjet): Observable<ITache[]>{
    return this.http.get<ITache[]>(this.host+"/projet/projectAllTask/"+idProjet,{headers:this.entete});
  }

  //...............................................................................................
  public projectAllTasks(idProject):Observable<any>{
    return this.http.get<any>(this.host+"/projet/projectAllTask/"+idProject,{headers:this.entete});
  }

  // Afficher tout les jalons du projet
  public getProjectJalons(idProjet): Observable<ITache[]>{
    return this.http.get<ITache[]>(this.host+"/projet/projectJalons/"+idProjet,{headers:this.entete});
  }
  //Afficher les jalons et les jalons enr etard en meme temps
  public getProjectJalonInfos(idProjet): Observable<any>{
    return this.http.get(this.host+"/projet/jalonsOfProject/"+idProjet,{headers:this.entete});
  }

  // AFFICHER LES PROJET LIER A UN UTILISATEUR
  public allProjectOfUser(username): Observable<any>{
    return this.http.get<any>(this.host+"/utilisateur/myProjects/"+username);
  }

   // AFFICHER LES PROJET dont un utilisateur est membre
   public getProjectsOfUser(username): Observable<any>{
    return this.http.get<any>(this.host+"/utilisateur/userProjects/"+username);
  }

  // afficher les comentaire d,un projet
  public allCommentsOfProject(numProjet): Observable<any>{
    return this.http.get<any>(this.host+"/projet/commentsOfProject/"+numProjet,{headers:this.entete});
  }

  // Ajouter un commentaire  a un projet
  public addCommentToProject(comment):Observable<any>{
    return this.http.post(this.host+"/projet/addCommentofProjet",comment,{headers:this.entete})
  }
  // Ajout de membre dans un projet

  public addMembreToProject(membre):Observable<any>{
    return this.http.post(this.host+"/projet/addMembreToProject",membre);
  }

   // afficher les membres d'un projet
   public getProjectMembre(numProjet): Observable<any>{
    return this.http.get<any>(this.host+"/projet/projectMembres/"+numProjet);
  }
  // voir s'il peut intervenir dans un projet
  public getRoleInProject(idProjet,idUser):Observable<any>{
    return this.http.get<any>(this.host+"/projet/getRoleInProject/"+idProjet+"/"+idUser,{headers:this.entete});
  }

  // delete a membre from a  project
  public deleteMembreOfProject(idMembre){
    return this.http.post(this.host+"/projet/deleteMembre",idMembre);
  }


  // Verification de l'accessibilite d'un membre sur  un projet
  public HasActionInProject(idProjet,idUser):String {
    let projectRole : String = "client"
    let verif = 0;
    this.getRoleInProject(idProjet,idUser).subscribe(data=>{
      if(data){
        verif = data;
        if(verif = 1){
          projectRole ="acteur"
        }
        
      }else if(2){
         projectRole="responsable" ;
      }else{
        projectRole="client"
      }
    });
    return projectRole;
    
  }

  // Afficher le proprietaire du projet
  public getProjectOwner(idProjet):Observable<any>{
    return this.http.get<any>(this.host+"/projet/owner/"+idProjet);
  }

  // affiche le nombre de projets actifs
  public getprojetsActifs(username): Observable<any>{
    return this.http.get<any>(this.host+"/projet/getprojetsActifs/"+username);
  }

  // le nombre de projets en retard
  public getprojetsEnretard(username): Observable<any>{
    return this.http.get<any>(this.host+"/projet/getprojetsEnretard/"+username);
  }

  //Affiche le nombre de projet termines
  public getProjetsTermines(username): Observable<any>{
    return this.http.get<any>(this.host+"/projet/getprojetTermines/"+username);
  }

  public getFileExportExcel(idProjet){
    return this.http.get(this.host+"/projet/download/Excel/"+idProjet, {responseType  : 'blob' });
  }

    // affiche le nombre de projets actifs
    public getprojetsActifsAdmin(): Observable<any>{
      return this.http.get<any>(this.host+"/projet/getprojetsActifsAdmin");
    }
   // le nombre de projets en retard
   public getprojetsEnretardAdmin(): Observable<any>{
    return this.http.get<any>(this.host+"/projet/getprojetsEnretardsAdmin");
  }

  //Affiche le nombre de projet termines
  public getProjetsTerminesAdmin(): Observable<any>{
    return this.http.get<any>(this.host+"/projet/getprojetTerminesAdmin");
  }



  // refresh la liste des phases d'un projet si une tache vient detre ajouter
   // service la ou si jajoute une tache je refresh la liste de 
   public refreshIfTaskAdded(idProjet){
    this.refreshProject = true;
  }

}
