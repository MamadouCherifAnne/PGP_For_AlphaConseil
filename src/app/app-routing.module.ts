import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AjoutUtilisateurComponent} from './Utilisateur/ajout-utilisateur/ajout-utilisateur.component'
import { AppComponent } from './app.component';
import { AddRoleComponent } from './Role/add-role/add-role.component';
import { ListeUtilisateurComponent } from './Utilisateur/liste-utilisateur/liste-utilisateur.component';
import { UpdateUtilisateurComponent } from './Utilisateur/update-utilisateur/update-utilisateur.component';



const routes: Routes = [
  {path: 'utilisateur', component: ListeUtilisateurComponent, children:[
    {path: 'add', component: AjoutUtilisateurComponent},
    {path: 'update',component: UpdateUtilisateurComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
