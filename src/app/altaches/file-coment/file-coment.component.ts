import { Component, OnInit } from '@angular/core';
import {TacheService} from 'src/app/services/tache.service';
import {ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Tache } from 'src/app/Tache/Tache';
import { ICommentaire } from 'src/app/Commentaire/ICommentaire';
import { Commentaire } from 'src/app/Commentaire/Commentaire';
import {UtilisateurService} from 'src/app/services/utilisateur.service';
import {FichierService} from 'src/app/services/fichier.service';
import{Observable} from 'rxjs';


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
  laTache : any;
  fileInfos: any;
  fileTodownload: any;
  today:Date =new Date();
  retardTache:number =0;

  constructor(private tacheService:TacheService,
    private route:ActivatedRoute,
    private userService:UtilisateurService,
    private formBuilder:FormBuilder,
    private fichierservice: FichierService) { }

  ngOnInit() {
    //L'utilisateur en session
    this.currentUser= 14;
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
        // calcul du retard de la tache
         let val = ((this.today.getTime() - new Date(this.currentTache.finTache).getTime())/(1000*3600*24));
         this.retardTache =Math.trunc(val)
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

        this.tacheService.getTache(this.idTache).subscribe( tache=>{
          if(tache){
            this.laTache = tache;
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
      
        //this.fileInfos = this.fichierservice.allfiles();
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
            this.tacheService.addCommentToTask(comment).subscribe(data=>{
              if(data){
                this.commentaires=[];
               
              }
            });
            this.commentaires.push(comment);
            
          }
        });
        
      }
       
    
    }
    
    this.commentaireForm.reset();
    this.refresh();
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

  fileDownlod(fileId){

    this.fichierservice.getFile(fileId).subscribe((data)=>{
      if(data){
        console.log("çcam marche");
      }
    })
    for(let i of this.laTache.fichiers){
      console.log(i);
    }
    console.log("hello friend");
  }

  public isLate(dateFin:Date){
    let today =  new Date()
    if(dateFin > today){

      return false;
    }else{
     
      return true;
    }
  }
}
