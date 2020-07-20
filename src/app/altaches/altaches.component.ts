import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjetService} from 'src/app/services/projet.service';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {Router, RouterState} from '@angular/router';
import{UpdateTacheComponent} from '../Tache/update-tache/update-tache.component';

@Component({
  selector: 'app-altaches',
  templateUrl: './altaches.component.html',
  styleUrls: ['./altaches.component.scss']
})
export class AltachesComponent implements OnInit {
  idProjet : any;
  allphase : any;
  countPhase: number;
  iteration:number =0;

  display = true;
  togleDisplay(){
  this.display = !this.display
  }
  constructor( private route: ActivatedRoute, private dialog : MatDialog,
    private projetService: ProjetService, private  router: Router) { }

  ngOnInit() {
    this.idProjet = parseInt(this.route.snapshot.paramMap.get('id'));

     this.projetService.AllphaseDeProjet(this.idProjet).subscribe(data=>{
        if(data){
          this.allphase = data;
          this.countPhase= this.allphase.length;
        }
     });
  }

  

  modifier(element){ 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {tache: element};
    this.dialog.open(UpdateTacheComponent, dialogConfig);
  } 


}
