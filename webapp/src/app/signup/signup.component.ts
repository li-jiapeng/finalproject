import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  loginService: LoginServiceService;
  usr: User;
  router: Router;

  constructor(loginService: LoginServiceService, router: Router) {
    this.loginService = loginService;
    this.router = router;
  }

  ngOnInit(): void {
  }

  signup(nick, usern, pass, passc) {

    let new$: Observable<User> = this.loginService.checkUser(usern.value);

    new$.subscribe(user => {
      this.usr = user;

      //username exist
      if (user != null) {
        document.getElementById("userexist").style.display = "block";
        return;
      } else {
        document.getElementById("userexist").style.display = "none";

        //passwords don't match
        if (pass.value != passc.value) {
          document.getElementById("match").style.display = "block";
          return;
        } else {
          document.getElementById("match").style.display = "none";
        }
      }

      this.usr = new User(nick.value, usern.value, pass.value);

      this.loginService.createUser(this.usr).subscribe(user => {
        this.usr = user;
      }
      );
      this.router.navigate(['login'], { queryParams: { username: this.usr.userName } });
    })
  }
}
