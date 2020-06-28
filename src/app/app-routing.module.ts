import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AjoutUtilisateurComponent} from './Utilisateur/ajout-utilisateur/ajout-utilisateur.component'
import { AppComponent } from './app.component';
import { AddRoleComponent } from './Role/add-role/add-role.component';
import {ListeRoleComponent} from './Role/liste-role/liste-role.component'
import { ListeUtilisateurComponent } from './Utilisateur/liste-utilisateur/liste-utilisateur.component';
import { UpdateUtilisateurComponent } from './Utilisateur/update-utilisateur/update-utilisateur.component';
import { AddProfessionComponent } from './Profession/add-profession/add-profession.component';
import { ListeProfessionComponent } from './Profession/liste-profession/liste-profession.component';

import {AllProjetsComponent} from './Projet/all-projets/all-projets.component';
import {AjoutPhaseComponent} from './Phase/ajout-phase/ajout-phase.component';
import {EnsembleVueProjetComponent} from './Projet/ensemble-vue-projet/ensemble-vue-projet.component';



const routes: Routes = [
  {path: 'utilisateur', component: ListeUtilisateurComponent, children:[
    {path: 'add', component: AjoutUtilisateurComponent},
    {path: 'update',component: UpdateUtilisateurComponent}
  ]},
  {path:'role', component:ListeRoleComponent},

  {path:'profession', component:ListeProfessionComponent},

  {path: 'projet', component: AllProjetsComponent},
  {path: 'projet/:id', component: EnsembleVueProjetComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
