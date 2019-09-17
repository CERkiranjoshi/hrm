import { LoadingFullScreenService } from 'src/app/common/service/loading-fullscreen.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
// import { phoneNumberValidator } from '../../common/validators/phone-validator';
import { ErrorStateMatcher } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from 'src/app/common/service/notification.service';
// https://stackblitz.com/angular/mdqxxdanxpg?file=app%2Finput-error-state-matcher-example.html

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(private router: Router, public loadingFullScreenService: LoadingFullScreenService, public notificationService: NotificationService, private authService: AuthService) { }


  ngOnInit() {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      })
    });
  }

  get username() {
    return this.loginForm.get('username');
  }
  // mobile: new FormControl('', {
  //   validators: [Validators.required, phoneNumberValidator]
  // }),
  // get mobile() {
  //   return this.loginForm.get('mobile');
  // }
  get password() {
    return this.loginForm.get('password');
  }

  signinUser() {
    this.loadingFullScreenService.startLoading();
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if(username=='admin' && password=='password'){
      this.router.navigate(['/dashboard']);
    }else{
      this.loadingFullScreenService.stopLoading();
      this.notificationService.handleNotification('Username & password is incorrect');
    }
    return;
    this.authService.signinUser(username, password)
      .subscribe(
        (response: any) => {
          sessionStorage.setItem('authorization', 'Token ' + response.token);

          if (this.authService.redirectUrl) {
            this.router.navigate([this.authService.redirectUrl]);
            this.authService.redirectUrl = null;
          } else {
            this.router.navigate(['/home']);
          }
          this.loadingFullScreenService.stopLoading();
          // const authorization = 'Basic ' + btoa(username + ':' + password);
          // sessionStorage.setItem('authorization', authorization);
          // this.getUserDetails();
        },
        (error) => {
          // console.log(error)
          if (error.status && error.error.non_field_errors != undefined) {
            this.notificationService.handleNotification(error.error.non_field_errors[0]);
          } else {
            this.notificationService.handleNotification('Something went wrong');
          }
          this.loadingFullScreenService.stopLoading();
        }
      );
  }
  getUserDetails() {
    this.authService.getUserDetails()
      .subscribe(
        (response: any) => {
          this.loadingFullScreenService.stopLoading();
          this.authService.setUser(response);
          sessionStorage.setItem('user', JSON.stringify(response));
          this.authService.setIdelWatcher();
        },
        (error) => {
          this.loadingFullScreenService.stopLoading();
          this.notificationService.handleNotification(error.message);
        }
      );
  }
  matcher = new MyErrorStateMatcher();
}
