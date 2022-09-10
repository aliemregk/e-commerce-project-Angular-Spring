import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-btn',
  templateUrl: './login-btn.component.html',
  styleUrls: ['./login-btn.component.css']
})
export class LoginBtnComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
