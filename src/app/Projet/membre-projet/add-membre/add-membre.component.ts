import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjetService } from 'src/app/services/projet.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { ProjetMembre } from '../../ProjetMembre';
import { ProjectUserID } from '../../UserProjectID';

@Component({
  selector: 'app-add-membre',
  templateUrl: './add-membre.component.html',
  styleUrls: ['./add-membre.component.scss']
})
export class AddMembreComponent implements OnInit {
  public membreForm:FormGroup;
  public membre : ProjetMembre = new ProjetMembre();
  public idUser:number;
  public users:any[]
  constructor(public formBuilder:FormBuilder, public projetService:ProjetService,
    public userService:UtilisateurService,
    public dialogRef : MatDialogRef<AddMembreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    //charger la liste des utilisateurs du site
    this.membreForm = this.formBuilder.group({
      'role':['',[Validators.required]],
      'activiste':[this.idUser,Validators.required]
    })
    this.initialiser();
   
  }

  public addMembreToProject(){
      let idMembre = new ProjectUserID();
      idMembre.idProjet = this.data.projet;
      idMembre.idUser =
      this.membre.projectRole=this.membreForm.get('role').value;
      console.log(this.membreForm.get('activiste').value)
      let id = this.membreForm.get('activiste').value;
      console.log("voici le num de user"+id)
      idMembre.idProjet = this.data.projet;
      idMembre.idUser =id;
      
      this.membre.idMembre = idMembre;
      this.membreForm.reset();
      this.projetService.addMembreToProject(this.membre).subscribe(data=>{
        if(data == true){
          //alerte
          console.log("Il a ete  ajoute avec success")
        }else{
          window.alert("L'ajout a échoué")
        }
      })

  }

  public onFermer(){
    this.membreForm.reset();
    this.dialogRef.close();
  }

  initialiser(){
    this.userService.getUsers().subscribe(data=>{
      if(data){
        this.users =data;
      }
    })
  }
}
