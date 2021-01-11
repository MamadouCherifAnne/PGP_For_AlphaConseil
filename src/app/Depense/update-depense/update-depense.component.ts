import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TacheService } from 'src/app/services/tache.service';
import { Depense } from '../Depense';

@Component({
  selector: 'app-update-depense',
  templateUrl: './update-depense.component.html',
  styleUrls: ['./update-depense.component.scss']
})
export class UpdateDepenseComponent implements OnInit {


 public  depenseForm:FormGroup
  public depense:Depense = new Depense();
  public idTache:number;
  public updatingDepense:Depense;
  

  constructor(private formBuilder:FormBuilder,private tacheService:TacheService,
              private route:ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef : MatDialogRef<UpdateDepenseComponent>
    ) { }

  ngOnInit() {
    // Recuperation de la tache concerner
    // this.idTache=parseInt(this.route.snapshot.paramMap.get('idTache'));
    
    // Construire le formulaire
    this.depenseForm = this.formBuilder.group({
      'libelle':[this.depense.libelle,[Validators.required]],
      'coutDepense':[this.depense.coutDepense,[Validators.required]],
      'Description':[this.depense.description,[Validators.required]],
      'dateEnregistrement':[this.depense.dateEnregistrement,[Validators.required]]
    });
    /*this.tacheService.getTache(this.idTache).subscribe(data=>{
      if(data){
        
        this.depense.tache=data;
      }
    });*/
  }

  // Ajout d'une depense
  updateDepense(){
    console.log(this.depense.tache)
    this.depense.NumDepense = this.data.depense.NumDepense
    this.depense.description=this.depenseForm.get('Description').value;
    this.depense.coutDepense=this.depenseForm.get('coutDepense').value;
    this.depense.libelle=this.depenseForm.get('libelle').value;
    this.depense.dateEnregistrement = this.depenseForm.get('dateEnregistrement').value;
    console.log(this.depenseForm.get('Description').value)
    console.log(this.depense.description);
    console.log(this.depense)
    this.depense.tache =this.data.tache
    
    this.tacheService.addDepenseToTask(this.depense).subscribe(data=>{
      if(data){
        console.log(this.depense)
        let resultat = data;
        console.log(resultat);
        this.depenseForm.reset();
      }
    });

  }

  // annuler la saisie d4une nouvelle depenses
  public onFermer(){
    this.depenseForm.reset();
    this.dialogRef.close();
  }

  public chargerFormulaire(){
    this.updatingDepense = this.data.depense;
    if(this.updatingDepense){
    this.depenseForm.get("Description").setValue(this.updatingDepense.description);
    this.depenseForm.get("libelle").setValue(this.updatingDepense.libelle);
    this.depenseForm.get("coutDepense").setValue(this.updatingDepense.coutDepense);
    this.depenseForm.get("libelle").setValue(this.updatingDepense.dateEnregistrement);
    
    }
  }

}


