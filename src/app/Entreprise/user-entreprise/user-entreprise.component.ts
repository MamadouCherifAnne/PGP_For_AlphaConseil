import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise.service';

@Component({
  selector: 'app-user-entreprise',
  templateUrl: './user-entreprise.component.html',
  styleUrls: ['./user-entreprise.component.scss']
})
export class UserEntrepriseComponent implements OnInit {

  entreprises : any;
  delateMessage: any;
  constructor(private epService: EntrepriseService,
    private dialog : MatDialog, private  router: Router) { }

  ngOnInit() {
    
    
  }

}
