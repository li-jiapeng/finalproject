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

  wrong(id, input) {
    document.getElementById(id).style.display = "block";
    document.getElementById(input).style.borderColor = "#D93025";
    document.getElementById(input).style.borderWidth = "medium";
  }

  correct(id, input) {
    document.getElementById(id).style.display = "none";
    document.getElementById(input).style.borderColor = "#DADCE0";
    document.getElementById(input).style.borderWidth = "thin";
  }

  signup(nick, usern, pass, passc) {

    //empty nickName
    if (nick.value === "") {
      this.wrong("noNick", "nick");
      return;
    } else {
      this.correct("noNick", "nick");
    }

    //empty userName
    if (usern.value === "") {
      this.wrong("noUser", "user");
      return;
    } else {
      this.correct("noUser", "user");
    }

    let new$: Observable<User> = this.loginService.checkUser(usern.value);

    new$.subscribe(user => {
      this.usr = user;
      console.log(user);
      //username exist
      if (user != null) {
        this.wrong("userexist","user");
        return;
      } else {
        this.correct("userexist","user");
        //empty password
        if (pass.value === "") {
          this.wrong("noPass", "pass");
          return;
        } else {
          this.correct("noPass", "pass");
        }

        //passwords don't match
        if (pass.value != passc.value){
          this.wrong("length", "pass");
          this.wrong("length", "pass_c");
          return;
        } else {
          this.correct("length", "pass");
          this.correct("length", "pass_c");
        }
      }
      //password length
      if (pass.value.length < 8) {
        this.wrong("length", "pass");
        this.wrong("length", "pass_c");
        return;
      } else {
        this.correct("length", "pass");
        this.correct("length", "pass_c");
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
