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

   //Modification de la tache 
  updateTache(){
      
   this.tache.tauxAvancement = this.updateTacheForm.get("tauxAvancement").value;
    
   let value = this.tacheService.updateTaskSecondaire(this.idTache, this.tache);
   value.subscribe((data)=>{
   if(data){
    this.returnMessage=data;
    }
    })
    console.log("taux d'avanvement de la tache "+this.updateTacheForm.get("tauxAvancement").value);  
        
  }

    test(){
      console.log(this.updateTacheForm.get("tauxAvancement").value);
    }

    //si l'une des taches précedante n'est pas terminé 
    public isFinished(){
      let find = 0;
      if(this.tache.tachePrecedente != null){
        for(let itache of this.tache.tachePrecedente){
          if(itache.tauxAvancement != 100){
            find = 1;
            break;
          }
        }
      }
      console.log("sssssssssssssss"); 
      return find;
    }

}
