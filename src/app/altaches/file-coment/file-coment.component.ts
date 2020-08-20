import { Component, OnInit } from '@angular/core';
import {TacheService} from 'src/app/services/tache.service';
import {ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Tache } from 'src/app/Tache/Tache';
import { ICommentaire } from 'src/app/Commentaire/ICommentaire';
import { Commentaire } from 'src/app/Commentaire/Commentaire';
import {UtilisateurService} from 'src/app/services/utilisateur.service';
import {FichierService} from 'src/app/services/fichier.service';


@Component({
  selector: 'app-file-coment',
  templateUrl: './file-coment.component.html',
  styleUrls: ['./file-coment.component.scss']
})
export class FileComentComponent implements OnInit {

  currentTache:any;
  commentaireForm:FormGroup;
  idTache:number;
  tacheComments:ICommentaire[];
  commentaires:ICommentaire[] = [];
  currentUser:number;
  tacheToComment:Tache;
  ressources:any;
  resourcesNames:string[] =[]
  closeCommentForm:number=1;
  tacheFile: any = File;

  constructor(private tacheService:TacheService,
    private route:ActivatedRoute,
    private userService:UtilisateurService,
    private formBuilder:FormBuilder,
    private fichierservice: FichierService) { }

  ngOnInit() {
    //L'utilisateur en session
    this.currentUser= 3;
      // Preparez le formulaire d'ajout de FIchier
      this.commentaireForm=this.formBuilder.group({
        'commentaire':this.formBuilder.array([])
      })
    // Getter l'id de la tache 
    this.idTache=  parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.idTache)
    // Recuperer les donnees de la tache en cours
    this.tacheService.getTache(this.idTache).subscribe((data)=>{
      if(data){
        this.currentTache=data;
        this.tacheToComment=this.currentTache;
         
        this.tacheService.getRessoucesForTask(this.idTache).subscribe((resources)=>{
         if(resources){
           this.ressources=resources;
         this.resourcesNames=[]
          for(let r of resources){
            
            this.resourcesNames.push(r.nom)
            
          }
          console.log(this.resourcesNames)
         }

        });
          // Recuperation de l'ensemble des commentaires sur la tache
          this.tacheService.getCommentsOfTask(this.idTache).subscribe(commentaire=>{
            if(commentaire){
              this.tacheComments=commentaire;
            }
          });
        
      }
        });
  }

  //methode de recup de fichier ajouter
  getCommentaires(){
    return this.commentaireForm.get('commentaire') as FormArray;
  }
  addComment(){
    const newFileControl =this.formBuilder.control('', Validators.required);
    console.log(this.commentaireForm.get('commentaire').value)
    this.getCommentaires().push(newFileControl)
    
  }

  ajoutCommentaires(){
    let comments= this.commentaireForm.get('commentaire').value;
    if(comments){
      console.log(comments);
      for(let com of comments){
        let comment:Commentaire = new Commentaire();
        
        comment.tacheComment=this.tacheToComment;
        comment.comment=com;
        comment.dateComment = new Date();
        this.userService.getUserByIdUser(this.currentUser).subscribe(user=>{
          if(user){
            comment.user = user;
            console.log(comment);
            this.commentaires.push(comment);
            
          }
        });
        
       

      }
      this.tacheService.addCommentToTask(this.commentaires).subscribe(data=>{
        if(data){
          this.commentaires=[];
          this.refresh();
        }
      });
      this.commentaireForm.reset();
      
    }
  }
  refresh(){
    this.tacheService.getCommentsOfTask(this.idTache).subscribe(commentaire=>{
      if(commentaire){
        this.tacheComments=commentaire;
      }
    });
  }

  //Recuperation du fichier charger 
  onSelectFile(event){
    const file = event.target.files[0];
    this.tacheFile = file;
  } 

  //enregistrement du fichier 
  fileSubmission(){
    const formData = new FormData();
    formData.append('file', this.tacheFile);
    this.fichierservice.uploadFile(formData, this.idTache).subscribe((response) =>{
      console.log(response);
    })

    console.log("#######yup");
  } 

}
