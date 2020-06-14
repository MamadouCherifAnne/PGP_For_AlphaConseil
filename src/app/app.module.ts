import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { ProjetService } from "./services/projet.service";
import { ReactiveFormsModule } from "@angular/forms";
import { AjoutUtilisateurComponent } from './Utilisateur/ajout-utilisateur/ajout-utilisateur.component';
import { UtilisateurService } from './services/utilisateur.service';

import { AddRoleComponent } from './Role/add-role/add-role.component'
import { RoleService } from './services/role.service';

import { Routes, RouterModule } from '@angular/router';
import { AddProfessionComponent } from './Profession/add-profession/add-profession.component';
import { AjoutProjetComponent } from './Projet/ajout-projet/ajout-projet.component';
import { ListeUtilisateurComponent } from './Utilisateur/liste-utilisateur/liste-utilisateur.component';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { AllProjetsComponent } from './Projet/all-projets/all-projets.component';
import { AddTacheComponent } from './Tache/add-tache/add-tache.component';
import { AjoutPhaseComponent } from './Phase/ajout-phase/ajout-phase.component';
import { FormsModule} from '@angular/forms';
const appRoutes:Routes =[
 
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AjoutUtilisateurComponent,
    AddRoleComponent,
    AddProfessionComponent,
    AjoutProjetComponent,
    ListeUtilisateurComponent,
    TableauDeBordComponent,
    AllProjetsComponent,
    AddTacheComponent,
    AjoutPhaseComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  

  providers: [ProjetService, UtilisateurService, RoleService],
  bootstrap: [AppComponent],
  entryComponents: [AjoutProjetComponent]
})
export class AppModule { }
