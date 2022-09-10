import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel-btn',
  templateUrl: './admin-panel-btn.component.html',
  styleUrls: ['./admin-panel-btn.component.css']
})
export class AdminPanelBtnComponent implements OnInit {

  isLoggedIn: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
