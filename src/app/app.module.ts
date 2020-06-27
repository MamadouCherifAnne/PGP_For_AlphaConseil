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
import { ProfessionService } from './services/profession.service';
import {FormsModule} from '@angular/forms'
import { AddRoleComponent } from './Role/add-role/add-role.component'
import { RoleService } from './services/role.service';
import { Routes, RouterModule } from '@angular/router';
import { AddProfessionComponent } from './Profession/add-profession/add-profession.component';
import { AjoutProjetComponent } from './Projet/ajout-projet/ajout-projet.component';
import { ListeUtilisateurComponent } from './Utilisateur/liste-utilisateur/liste-utilisateur.component';
import { UpdateUtilisateurComponent } from './Utilisateur/update-utilisateur/update-utilisateur.component';
import { DetailUtilisateurComponent } from './Utilisateur/detail-utilisateur/detail-utilisateur.component';
import { ListeRoleComponent } from './Role/liste-role/liste-role.component';
import { UpdateRoleComponent } from './Role/update-role/update-role.component';
import { ListeProfessionComponent } from './Profession/liste-profession/liste-profession.component';
import { UpdateProfessionComponent } from './Profession/update-profession/update-profession.component';
import { TableauDeBordComponent } from './tableau-de-bord/tableau-de-bord.component';
import { AddTacheComponent } from './Tache/add-tache/add-tache.component';
import { AjoutPhaseComponent } from './Phase/ajout-phase/ajout-phase.component';

const appRoutes:Routes =[
 
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AjoutUtilisateurComponent,
    AddRoleComponent,
    AddProfessionComponent,
    ListeUtilisateurComponent,
    UpdateUtilisateurComponent,
    DetailUtilisateurComponent,
    ListeRoleComponent,
    UpdateRoleComponent,
    ListeProfessionComponent,
    UpdateProfessionComponent,
    TableauDeBordComponent,
    AddTacheComponent,
    AjoutPhaseComponent,
    
    
    
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
  providers: [UtilisateurService,RoleService, ProfessionService],
  bootstrap: [AppComponent],
  entryComponents: [AjoutUtilisateurComponent,UpdateUtilisateurComponent,
    AddRoleComponent,
    AddProfessionComponent,
    AjoutPhaseComponent,
    UpdateProfessionComponent,
    UpdateRoleComponent]
})
export class AppModule { }
