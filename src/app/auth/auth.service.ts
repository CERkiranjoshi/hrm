import { NotificationService } from './../common/service/notification.service';
import { UserIdleService } from 'angular-user-idle';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClientApp } from '../common/service/httpclient.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable()
export class AuthService {
  user: any;
  public redirectUrl: string;
  authChange = new Subject<boolean>();
  constructor(public notificationService: NotificationService, private router: Router, private userIdle: UserIdleService, public http: HttpClient, public httpclientapp: HttpClientApp) { }

  isAuth() {
    let authorization = sessionStorage.getItem('user');
    if (authorization != null) {
      return true;
    } else {
      return false;
    }
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  setUser(data: any) {
    this.user = data;
  }

  getUser() {
    let data = sessionStorage.getItem('user');
    let obj = JSON.parse(data);
    if (data != null) {
      this.user = obj;
      return this.user;
    }
  }

  getUserType(){
    let data = sessionStorage.getItem('user');
    let obj = JSON.parse(data);
    if (data != null) {
      return obj.type;
    }else{
      return false;
    }
  }

  getUserDetails() {
    return this.httpclientapp.get('api/me/').pipe(
      map((res) => {
        return res;
      }
      )).pipe(catchError((error) => {
        return this.httpclientapp.handleError(error);
      }));
  }


  signinUser(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(this.httpclientapp.organisationData.url + 'api/api-token-auth/', data).pipe(
      map((res) => {
        return res;
      }
      )).pipe(catchError((error) => {
        return this.httpclientapp.handleError(error);
      }));
  }

  signOut() {
    sessionStorage.clear();
    this.stop();
    this.stopWatching();
    window.location.replace(window.location.origin+'/logout/');
  }

  setIdelWatcher() {
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe(count => {
      // console.log(count)
    });
    this.userIdle.onTimeout().subscribe(() => {
      console.log('Session Time is up!');
      this.backtoLogin();
    });
  }

  backtoLogin() {
    this.notificationService.handleNotification('Session expired, Please Re-login.');
    this.signOut();
  }

  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }
}
