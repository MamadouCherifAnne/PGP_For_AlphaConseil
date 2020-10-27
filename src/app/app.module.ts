import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { AddRoleComponent } from './Role/add-role/add-role.component';
import {FichierService} from './services/fichier.service';
import { RoleService } from './services/role.service';
import {  PhaseService } from './services/phase.service';
import {TacheService} from './services/tache.service';
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

import { ResumeProjetComponent } from './projet/resume-projet/resume-projet.component';
import { EnsembleVueProjetComponent } from './Projet/ensemble-vue-projet/ensemble-vue-projet.component';
import { EditProjetComponent } from './Projet/edit-projet/edit-projet.component';
import { AllProjetsComponent } from './Projet/all-projets/all-projets.component';
import { AffectationUserComponent } from './Utilisateur/affectation-user/affectation-user.component';
// Importation de la librairies de visualisation du diagramm de Gantt
import {GanttModule} from '@syncfusion/ej2-angular-gantt';
import {jsPDF} from 'jspdf';
import { UtilisateurGanttComponent } from './Utilisateur/utilisateur-gantt/utilisateur-gantt.component';

import { AltachesComponent } from './altaches/altaches.component';
import { EditTacheComponent } from './Tache/edit-tache/edit-tache.component';
import {FieldsetModule} from 'primeng/fieldset';
import { GanttProjectComponent } from './Projet/gantt-project/gantt-project.component';
import { AddEntrepriseComponent } from './Entreprise/add-entreprise/add-entreprise.component';
import { AffecterRessourcesComponent } from './Tache/affecter-ressources/affecter-ressources.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AjoutPhaseSecondComponent } from './altaches/ajout-phase-second/ajout-phase-second.component';
import { JalonComponent } from './Projet/jalon/jalon.component';

import { AddJalonComponent } from './Projet/add-jalon/add-jalon.component';

import { AjoutTacheSecondComponent } from './altaches/ajout-tache-second/ajout-tache-second.component';
import { FileComentComponent } from './altaches/file-coment/file-coment.component';
import { MessagerieComponent } from './Message/messagerie/messagerie.component';

import { AddDepenseComponent } from './Depense/add-depense/add-depense.component';
import { DepensesComponent } from './Depense/depenses/depenses.component';
import { FactureTacheComponent } from './Facture/facture-tache/facture-tache.component';
import { AffectationTacheComponent } from './Tache/affectation-tache/affectation-tache.component';
import { UpdateAffectationComponent } from './Tache/update-affectation/update-affectation.component';

import { CommentComponent } from './Projet/comment/comment.component';
import {EndDateValidation} from "src/app/ValidationsFunctions/EndDateValidation";
import { RapportComponent } from './Rapport/rapport/rapport.component';
import { RapportPhaseComponent } from './Rapport/rapport-phase/rapport-phase.component';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
<<<<<<< HEAD
import { MonTravailComponent } from './Utilisateur/mon-travail/mon-travail.component';
=======
import { LoginComponent } from './Login/login/login.component';
import { AuthInterceptor} from './services/authconfig.interceptor';
import { UserProfilComponent } from './Login/user-profil/user-profil.component';
import { UserEntrepriseComponent } from './Entreprise/user-entreprise/user-entreprise.component';
>>>>>>> 5c60ba5f4caa6f517c6765cd219b2f6cef9bc90e
registerLocaleData(localeFr, 'fr');





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
    AllProjetsComponent,
    AjoutProjetComponent,
    GanttProjectComponent,
    TableauDeBordComponent,
    AddTacheComponent,
    AjoutPhaseComponent,
    ResumeProjetComponent,
    EnsembleVueProjetComponent,
    EditProjetComponent,
    AffectationUserComponent,
    
   
    AltachesComponent,
    EditTacheComponent,
    GanttProjectComponent,
    UtilisateurGanttComponent,
    AddEntrepriseComponent,
    AffecterRessourcesComponent,
    SideNavComponent,
    AjoutPhaseSecondComponent,

    JalonComponent,


    AddJalonComponent,

    AjoutTacheSecondComponent,

    FileComentComponent,

    MessagerieComponent,


    AddDepenseComponent,

    DepensesComponent,

    FactureTacheComponent,

    AffectationTacheComponent,

    UpdateAffectationComponent,
    CommentComponent,
    EndDateValidation,
<<<<<<< HEAD
    RapportComponent,
    RapportPhaseComponent,
    MonTravailComponent,
=======
    LoginComponent,
    UserProfilComponent,
    UserEntrepriseComponent,
>>>>>>> 5c60ba5f4caa6f517c6765cd219b2f6cef9bc90e



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    GanttModule,
    FieldsetModule
  ],

  providers: [UtilisateurService,RoleService, ProfessionService,  PhaseService, ProjetService, TacheService, FichierService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor ,
        multi: true
      }
    
  ],
  bootstrap: [AppComponent],
  entryComponents: [AjoutUtilisateurComponent,UpdateUtilisateurComponent,
    AddRoleComponent,
    AddProfessionComponent,
    AjoutPhaseComponent,
    UpdateProfessionComponent,
    AffecterRessourcesComponent,
    AjoutPhaseSecondComponent,
    AjoutProjetComponent,
    AjoutPhaseComponent,
    AddTacheComponent,
    EditProjetComponent,
    UpdateRoleComponent,
    AddJalonComponent,
    UpdateAffectationComponent],
})
export class AppModule { }
