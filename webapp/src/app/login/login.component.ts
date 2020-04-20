import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Observable } from 'rxjs';
import { User } from '../models/User'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginService: LoginServiceService;
  td: any;
  ur: User;

  constructor(loginService: LoginServiceService) {
    this.loginService = loginService;
  }

  ngOnInit(): void {
  }

  checkUser(user) {
    alert(user.value);
    let newTodo$: Observable<User> = this.loginService.getUser(user.value);
    newTodo$.subscribe(user => {
      this.ur=user;
    });
    alert(this.ur.userName);
    if (this.ur.userName === undefined) {
      //user doesn't exist
      document.getElementById("noAccount").style.display = "block";

    } else {
      //if find the username,
      document.getElementById("noAccount").style.display = "none";
      document.getElementById("userName").style.display = "none";
      document.getElementById("password").style.display = "block";
      document.getElementById("ua").innerHTML = "Hi";
    }

  }

  back() {
    document.getElementById("userName").style.display = "block";
    document.getElementById("password").style.display = "none";
  }
}
