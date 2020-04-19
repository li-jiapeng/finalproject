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

  checkUser( user){

    //if find the username,
    document.getElementById("userName").style.display = "none";
    document.getElementById("password").style.display = "block";
    document.getElementById("ua").innerHTML = "Hi";
  }

  back(){
    document.getElementById("userName").style.display = "block";
    document.getElementById("password").style.display = "none";
  }
}
