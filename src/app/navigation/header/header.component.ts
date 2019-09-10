import { CommonService } from './../../common/service/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserIdleService } from 'angular-user-idle';
import { NotificationService } from 'src/app/common/service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth = false;
  organisationData = {}
  user: any;
  url = ''

  constructor(private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService, public notificationService: NotificationService) {
    this.organisationData = this.commonService.getOrganisationData()
  }

  ngOnInit() {
    this.url = window.location.href;
    if (this.url.indexOf('/login') === -1 && this.authService.isAuth) {
      this.authService.setIdelWatcher();
    }
    if (this.authService.isAuth) {
      this.getUserDetails();
    }
  }


  getUserDetails() {
    const data = sessionStorage.getItem('user');
    if (data != null) {
      this.user = JSON.parse(data);
      this.authService.setUser(this.user);
    }
  }

  getUserData(key: string) {
    // let user = this.authService.getUser();
    // if (user != null && user[key] != undefined) {
    //   return user[key]
    // }
    return 'Admin'
  }


  signOut() {
    this.authService.signOut();
  }

  changePassword() {
    window.location.replace(window.location.origin + '/accounts/password_change/');
  }

}
