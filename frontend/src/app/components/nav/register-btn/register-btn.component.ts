import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-btn',
  templateUrl: './register-btn.component.html',
  styleUrls: ['./register-btn.component.css']
})
export class RegisterBtnComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
