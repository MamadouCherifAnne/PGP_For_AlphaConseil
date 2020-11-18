import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Commentaire } from 'src/app/Commentaire/Commentaire';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { ProjetService } from 'src/app/services/projet.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  message:any;
  projectId:number;
  currentUser:any;
  config: any;
  currentProject:any;
  commentaires:any;
  commentaire:Commentaire = new Commentaire();
  commentaireForm:FormGroup
  constructor(public route:ActivatedRoute,public projetService:ProjetService,
    public userService:UtilisateurService,
    public authService:AuthentificationService,
    public commentService:CommentaireService,
    private formBuilder:FormBuilder
    ) { }

  ngOnInit() {
    this.commentaireForm=this.formBuilder.group({
      'comment':["",[Validators.required,Validators.maxLength(100)]]
    });
    this.projectId = parseInt(this.route.snapshot.paramMap.get('numProjet'));
    console.log("NumProjet"+this.projectId);
   /* let username = this.authService.getCurrentUser();
    this.userService.getUserByUsername(username).subscribe(data=>{
      if(data){
        this.currentUser = data;
      
      }
    });*/
    // get the current project
    this.projetService.getById(this.projectId).subscribe(result=>{
      if(result){
        this.currentProject = result;
      }
    })
    // get the list of project comments
    this.projetService.allCommentsOfProject(this.projectId).subscribe(data=>{
      if(data){
        let size = 0;
        this.commentaires = data;
        this.config = {
          itemsPerPage:5,
          currentPage: 1,
          totalItems: data.length,
          nextLabel:"suivant",
          previousLabel:"précédent"
        };
      }
    });
  }

  pageChanged(event){
    this.config.currentPage = event;
  }
   // Ajouter un commentaire dans un projet
   ajoutCommentaires(){
    let comment= this.commentaireForm.get('comment').value;
    console.log("Voici le projet Courant"+this.currentProject.numProjet);
        this.commentaire.projetComment = this.currentProject;
        this.commentaire.tacheComment=null;
        
        console.log("le utilisateur qui commente"+this.commentaire.user);
        this.commentaire.comment=comment;
        this.commentaire.dateComment = new Date();
        console.log(this.commentaire.dateComment);
        console.log("Voici le commentaire sur le projet"+this.commentaire);
        let username = this.authService.getCurrentUser();
        this.userService.getUserByUsername(username).subscribe(data=>{
          if(data){
            this.currentUser = data;
            this.commentaire.user = this.currentUser;
            this.projetService.addCommentToProject(this.commentaire).subscribe(data=>{
              if(data){
                console.log(data)
                this.refresh();
              }
              
              
            });
          }
        });
   
         
            this.commentaireForm.reset();
          }


  // delete un commentaire
  public deleteComment(idComment){
    if(confirm("voulez vous vraiment supprimer ce commentaire?")){
    this.commentService.deleteComment(idComment).subscribe(data=>{
      this.message = data;
      this.refresh();
    });
  }
  }
  // refresh the page
  public refresh(){
    this.projetService.getById(this.projectId).subscribe(result=>{
      if(result){
        this.currentProject = result;
      }
    })
    // get the list of project comments
    this.projetService.allCommentsOfProject(this.projectId).subscribe(data=>{
      if(data){
        let size = 0;
        this.commentaires = data;
      }
    });
   }
  
}
