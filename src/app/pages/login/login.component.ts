import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginRequest } from 'src/app/shared/dto/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequest: LoginRequest = {
    username: '',
    password: ''
  }

  loginError: boolean = false;

  constructor(private auth: AuthService, private router: Router, private fb: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLoginClicked(){
    this.spinner.show();

    this.loginRequest = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }

    if(this.loginRequest.username != 'user@aemenersol.com' && this.loginRequest.password != 'Test@123'){
      this.loginError = true;
      this.spinner.hide();
    }else {
      this.auth.login(this.loginRequest).then(
        res => {
          this.spinner.hide();
          this.router.navigate(['dashboard']);
        }, 
        err => {
          this.spinner.hide();
          console.log("FAILED: Login -> ", err);
          this.loginError = true;
        }
      );
    }

  }

}
