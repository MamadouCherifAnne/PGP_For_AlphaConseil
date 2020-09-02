import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Depense } from '../Depense';
import { TacheService } from 'src/app/services/tache.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-depense',
  templateUrl: './add-depense.component.html',
  styleUrls: ['./add-depense.component.scss']
})
export class AddDepenseComponent implements OnInit {
  
  depenseForm:FormGroup
  depense:Depense = new Depense();
  idTache:number;
  

  constructor(private formBuilder:FormBuilder,private tacheService:TacheService,
              private route:ActivatedRoute
    ) { }

  ngOnInit() {
    // Recuperation de la tache concerner
    this.idTache=parseInt(this.route.snapshot.paramMap.get('idTache'));
    // Construire le formulaire
    this.depenseForm = this.formBuilder.group({
      'libelle':[this.depense.libelle,[Validators.required]],
      'coutDepense':[this.depense.coutDepense,[Validators.required]],
      'Description':[this.depense.description,[Validators.required]],
      'dateEnregistrement':[this.depense.dateEnregistrement,[Validators.required]]
    });
    this.tacheService.getTache(this.idTache).subscribe(data=>{
      if(data){
        
        this.depense.tache=data;
      }
    });
  }

  // Ajout d'une depense
  ajouterDepense(){
    console.log(this.depense.tache)
    this.depense.description=this.depenseForm.get('Description').value;
    this.depense.coutDepense=this.depenseForm.get('coutDepense').value;
    this.depense.libelle=this.depenseForm.get('libelle').value;
    this.depense.dateEnregistrement = this.depenseForm.get('dateEnregistrement').value;
    console.log(this.depenseForm.get('Description').value)
    console.log(this.depense.description);
    console.log(this.depense)
    
    this.tacheService.addDepenseToTask(this.depense).subscribe(data=>{
      if(data){
        console.log(this.depense)
        let resultat = data;
        console.log(resultat);
        this.depenseForm.reset();
      }
    });

  }

}
