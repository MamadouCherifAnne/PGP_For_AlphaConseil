import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AjoutUtilisateurComponent} from './Utilisateur/ajout-utilisateur/ajout-utilisateur.component'
import { AppComponent } from './app.component';
import { AddRoleComponent } from './Role/add-role/add-role.component';
import { ListeUtilisateurComponent } from './Utilisateur/liste-utilisateur/liste-utilisateur.component';
import { AllProjetsComponent } from "./Projet/all-projets/all-projets.component";


const routes: Routes = [
  {path: 'utilisateur', component: AjoutUtilisateurComponent},
  {path: 'utilisateur/all', component: ListeUtilisateurComponent},
  {path: 'projet/all', component: AllProjetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
