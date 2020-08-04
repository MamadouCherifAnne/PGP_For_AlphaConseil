import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UtilisateurService} from 'src/app/services/utilisateur.service';
import { Utilisateur } from '../Utilisateur';

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.scss']
})
export class DetailUtilisateurComponent implements OnInit {

  currentUser:any;
  userProfessions:string[]=[];
  

  constructor(private userService:UtilisateurService,
               private route:ActivatedRoute
    ) { }

  ngOnInit() {
    // Recuperer l'identifiant de l'utilisateur sollicite
      let idUser =parseInt(this.route.snapshot.paramMap.get('iduser'));
       // Getter lutilisateur en cours 
       this.userService.getUserByIdUser(idUser).subscribe((data)=>{
          if(data){
            this.currentUser =data;
           for(let p of this.currentUser.professions){
             this.userProfessions.push(p.titreProfession)
           }
            console.log(this.currentUser);
          }
       });

}
}
