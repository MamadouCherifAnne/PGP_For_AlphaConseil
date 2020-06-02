import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AjoutUtilisateurComponent} from './Utilisateur/ajout-utilisateur/ajout-utilisateur.component'
import { AppComponent } from './app.component';
import { AddRoleComponent } from './Role/add-role/add-role.component';



const routes: Routes = [
  {path: 'utilisateur', component: AjoutUtilisateurComponent},
  {path: 'role', component: AddRoleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
