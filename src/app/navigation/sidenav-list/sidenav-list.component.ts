import { CommonService } from './../../common/service/common.service';
import { AuthService } from './../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationService } from 'src/app/common/service/notification.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  organisationData:any
  isAuth = false;
  @Output() closeSidenav = new EventEmitter();


  constructor(private route: ActivatedRoute, public authService: AuthService, public commonService: CommonService, public notificationService: NotificationService) {
    this.organisationData = this.commonService.getOrganisationData()
  }


  ngOnInit() {
  }

  onToggleSidenav(){
    this.closeSidenav.emit();
  }


}
