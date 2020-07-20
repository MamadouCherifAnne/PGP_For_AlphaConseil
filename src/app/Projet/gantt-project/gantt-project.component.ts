import { Component, OnInit } from '@angular/core';
import { TacheService } from 'src/app/services/tache.service';
import { PhaseService } from 'src/app/services/phase.service';
import { ProjetService} from 'src/app/services/projet.service';

@Component({
  selector: 'app-gantt-project',
  templateUrl: './gantt-project.component.html',
  styleUrls: ['./gantt-project.component.scss']
})
export class GanttProjectComponent implements OnInit {

  tacheduProjet:Object[];
  champTache:object;

  constructor(private tacheService: TacheService,
    private projetService:ProjetService,
    private phaseService:PhaseService) { }

  ngOnInit() {
  }

  // Preparer la Source de donnees a afficher dans le diagramme de gantt du projet
  public afficherGanttProject(){
    
  }

}
