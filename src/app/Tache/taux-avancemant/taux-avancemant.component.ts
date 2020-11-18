import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Tache } from 'src/app/Tache/Tache';
import { ITache } from 'src/app/Tache/ITache';
import {TacheService} from "src/app/services/tache.service";

@Component({
  selector: 'app-taux-avancemant',
  templateUrl: './taux-avancemant.component.html',
  styleUrls: ['./taux-avancemant.component.scss']
})
export class TauxAvancemantComponent implements OnInit {
  
 // tache : Tache = new Tache();
  updateTacheForm: FormGroup;
  returnMessage: any;

  @Input() public idTache: any;
  @Input() public tache: any;

  constructor(   private formBuilder: FormBuilder,
    private tacheService: TacheService,) { }

  ngOnInit() {

    this.updateTacheForm = this.formBuilder.group({
      "tauxAvancement" : [this.tache.tauxAvancement],
    })

   
  }

  formatLabel(value: number) {
    return value + '%';
  }
     //Modification du fichier 
     updateTache(){
      
      this.tache.tauxAvancement = this.updateTacheForm.get("tauxAvancement").value;
    
      let value = this.tacheService.updateTaskSecondaire(this.idTache, this.tache);
      value.subscribe((data)=>{
        if(data){
          this.returnMessage=data;
        }
        })
        console.log(this.updateTacheForm.get("tauxAvancement").value);  
        
    }

    test(){
      console.log(this.updateTacheForm.get("tauxAvancement").value);
    }

}
