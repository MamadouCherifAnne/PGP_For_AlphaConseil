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
import { Time } from '@angular/common';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CommentaireService } from 'src/app/services/commentaire.service';


@Component({
  selector: 'app-file-coment',
  templateUrl: './file-coment.component.html',
  styleUrls: ['./file-coment.component.scss']
})
export class FileComentComponent implements OnInit {

  public tacheProject:any;
  currentTache:any;
  commentaireForm:FormGroup;
  idTache:number;
  tacheComments:ICommentaire[];
  commentaires:ICommentaire[] = [];
  config:any;
  currentUser:any;
  message:any;
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
  commentaire:Commentaire = new Commentaire();

  constructor(private tacheService:TacheService,
    private route:ActivatedRoute,
    private userService:UtilisateurService,
    public authService:AuthentificationService,
    private formBuilder:FormBuilder,
    private commentService:CommentaireService,
    private fichierservice: FichierService) { }

  ngOnInit() {
    //L'utilisateur en session
    this.currentUser= this.authService.getCurrentUser() ;
      // Preparez le formulaire d'ajout de FIchier
      this.commentaireForm=this.formBuilder.group({
        'commentaire':[this.commentaire.comment,[Validators.required]]
      });

   
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
            this.tacheService.getTacheProject(this.idTache).subscribe(result=>{
              if(result){
                this.tacheProject = result;
              }
            })
          } 
        });
          // Recuperation de l'ensemble des commentaires sur la tache
          this.tacheService.getCommentsOfTask(this.idTache).subscribe(commentaire=>{
            if(commentaire){
              this.tacheComments=commentaire;
              this.config = {
                itemsPerPage:5,
                currentPage: 1,
                totalItems: commentaire.length,
                nextLabel:"suivant",
                previousLabel:"précédent"
              };
            }
          });
        
      }
        });
      
        //this.fileInfos = this.fichierservice.allfiles();
  }

  //methode de recup de fichier ajouter
/*  getCommentaires(){
    return this.commentaireForm.get('commentaire') as FormArray;
  }
  addComment(){
    const newFileControl =this.formBuilder.control('', Validators.required);
    console.log(this.commentaireForm.get('commentaire').value)
    this.getCommentaires().push(newFileControl)
    
  }
*/
  ajoutCommentaires(){
    let comment= this.commentaireForm.get('commentaire').value;
   
        this.commentaire.tacheComment=this.tacheToComment;
        this.commentaire.comment=comment;
        this.commentaire.dateComment = new Date();
        
   
        
      
       // this.commentaire.timeComment = heure;
       

        console.log(this.commentaire.dateComment);
        if(this.currentUser!==null){
          console.log(this.currentUser);
        this.userService.getUserByUsername(this.currentUser).subscribe(user=>{
          if(user){
            this.commentaire.user = user;
            console.log(user);
            console.log(this.commentaire);
            this.tacheService.addCommentToTask(this.commentaire).subscribe(data=>{
              this.commentaireForm.reset();
              this.refresh();
            });
            
          }
        });
        
      }
    };

    //Delete Commentaire
    public deleteComment(idComment){
      if(confirm("voulez vous vraiment supprimer ce commentaire?")){
      this.commentService.deleteComment(idComment).subscribe(data=>{
        this.message = data;
        this.refresh();
      });
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
    let fin = new Date(dateFin)
   
    if(today>fin ){

      return true;
    }else{
     
      return false;
    }
  }

   public isCreateur(){
    let verif:boolean = false;
    if(this.currentUser.taches.length != 0 ){
      for(let tache of this.currentUser.taches){
        if(tache.idTache === this.currentTache.idTache &&
          tache.nomTache === this.currentTache.nomTache &&
          tache.lastUpdate === this.currentTache.lastUpdate &&
          tache.debutTache === this.currentTache.debutTache 
          ){
            verif = true;
            break;
          }
      }
      
    
    return verif;
  }
}

// verification si il s'agit du chef du projet
    public isOwnerOfProject(){
      this.currentUser.isChefProjet =0;
      let isChef:boolean = false;
      if(this.currentUser.projets && this.tacheProject !== -1){
        console.log(this.currentUser.projets.length)
      for(let p of this.currentUser.projets){
        console.log("le projet dont jsuis"+p);
        if(p.numProjet == this.tacheProject){
         // this.currentUser.isChefProjet = 1;
          isChef = true;
          break;
        }
      }
      
    }
    return isChef;
    }

    public hasAccessToTask(){
      let verif:Boolean = false;
      if(this.authService.isSuperAdmin == true || this.isCreateur() == true ||
       this.isOwnerOfProject()== true){
        verif = true;
       }
       return verif;
    }

    // Go to depense 
}
