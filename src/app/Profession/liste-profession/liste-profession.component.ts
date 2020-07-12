import { Component, OnInit } from '@angular/core';
import { ProfessionService } from 'src/app/services/profession.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddProfessionComponent } from '../add-profession/add-profession.component';
import { UpdateProfessionComponent } from '../update-profession/update-profession.component';

@Component({
  selector: 'app-liste-profession',
  templateUrl: './liste-profession.component.html',
  styleUrls: ['./liste-profession.component.scss']
})
export class ListeProfessionComponent implements OnInit {

  displayedColumns: string [] = ['Profession', 'Action'];
  professions:any;
  message:any;

  constructor(private profService: ProfessionService, private fenetre:MatDialog) { }

  ngOnInit() {

    this.profService.getProfession()
    .subscribe(data=>this.professions=data);
  }

  public goToAddProfession(){
    const fenetreConfig= new MatDialogConfig();
     fenetreConfig.disableClose =true;
     fenetreConfig.autoFocus = true;
     fenetreConfig.width="65%";
     
     this.fenetre.open(AddProfessionComponent,fenetreConfig);

     this.ngOnInit();
  }

  public goToUpdateProfession(prof){
    const fenetreConfig= new MatDialogConfig();
     fenetreConfig.disableClose =true;
     fenetreConfig.autoFocus = true;
     fenetreConfig.width="65%";
     //Passer la profession a modifier
     fenetreConfig.data ={profession:prof}
     this.fenetre.open(UpdateProfessionComponent,fenetreConfig);
  }

  public goToDeleteProfession(idProfession) {

    //this.profService.addProfession(prof);
    
  }

}
