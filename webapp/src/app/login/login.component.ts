import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginService: LoginServiceService;
  td: any;
  
  constructor(loginService: LoginServiceService) {
    this.loginService = loginService;
  }

  ngOnInit(): void {
  }

}
