import { AuthService } from './../../auth/auth.service';
import { LoadingFullScreenService } from 'src/app/common/service/loading-fullscreen.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/common/service/notification.service';

@Component({
  selector: 'app-policy-lists',
  templateUrl: './policy-lists.component.html',
  styleUrls: ['./policy-lists.component.scss']
})
export class PolicyListsComponent implements OnInit {

  messages = [
    {
      name: 'Jayesh',
      subject : "Employment leave policy",
      updated: new Date('1/1/16'),
      content:"Maximum 12 days of casual leave can be availed by an employee in a year. Employee joining during the course of year will be entitled for casual leave on pro-rata basis. Casual leave can be taken for minimum half day and maximum 4 days. Leave for more than 4 days can be taken as Earned leave",
      src:"https://lh3.googleusercontent.com/-Q9ROVxZP0yw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rd2wAD3gF4mREXPm_5Ty4NM6XEemw/s48-c/photo.jpg"
    },
    {
      name: 'Kiran',
      subject : "	Day Out at La Shimmer Resort, next week",
      updated: new Date('1/17/16'),
      content:" A day out at La Shimmer Resort, Mumbai is going to become the experience of a lifetime as you experience the beauty of this bountiful land near the Dhavagi Hills. A perfect getaway for the guests, the place is easily accessible from Mumbai and nearby regions.",
      src:"https://lh3.googleusercontent.com/-Q9ROVxZP0yw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rd2wAD3gF4mREXPm_5Ty4NM6XEemw/s48-c/photo.jpg"
    },
    {
      name: 'Prateek',
      subject : "Kindly submit your invesment documents before JAN 2020",
      updated: new Date('1/28/16'),
      content:"Investment declaration has to be done in the beginning of a financial year",
      src:"https://lh3.googleusercontent.com/-Q9ROVxZP0yw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rd2wAD3gF4mREXPm_5Ty4NM6XEemw/s48-c/photo.jpg"
    },{
      name: 'Jayesh',
      subject : "Employment leave policy",
      updated: new Date('1/1/16'),
      content:"Maximum 12 days of casual leave can be availed by an employee in a year. Employee joining during the course of year will be entitled for casual leave on pro-rata basis. Casual leave can be taken for minimum half day and maximum 4 days. Leave for more than 4 days can be taken as Earned leave",
      src:"https://lh3.googleusercontent.com/-Q9ROVxZP0yw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rd2wAD3gF4mREXPm_5Ty4NM6XEemw/s48-c/photo.jpg"
    },
    {
      name: 'Kiran',
      subject : "	Day Out at La Shimmer Resort, next week",
      updated: new Date('1/17/16'),
      content:" A day out at La Shimmer Resort, Mumbai is going to become the experience of a lifetime as you experience the beauty of this bountiful land near the Dhavagi Hills. A perfect getaway for the guests, the place is easily accessible from Mumbai and nearby regions.",
      src:"https://lh3.googleusercontent.com/-Q9ROVxZP0yw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rd2wAD3gF4mREXPm_5Ty4NM6XEemw/s48-c/photo.jpg"
    },
    {
      name: 'Prateek',
      subject : "Kindly submit your invesment documents before JAN 2020",
      updated: new Date('1/28/16'),
      content:"Investment declaration has to be done in the beginning of a financial year",
      src:"https://lh3.googleusercontent.com/-Q9ROVxZP0yw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rd2wAD3gF4mREXPm_5Ty4NM6XEemw/s48-c/photo.jpg"
    }
  ];
  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/19'),
    },
    {
      name: 'ITR File Details',
      updated: new Date('1/18/19'),
    },
    {
      name: 'HR policy',
      updated: new Date('1/18/19'),
    },
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/19'),
    },
    {
      name: 'ITR File Details',
      updated: new Date('1/18/19'),
    },
    {
      name: 'HR policy',
      updated: new Date('1/18/19'),
    }
  ];

  constructor(private router: Router, public loadingFullScreenService: LoadingFullScreenService, public notificationService: NotificationService, private authService: AuthService) { }

  ngOnInit() {
    this.loadingFullScreenService.stopLoading();
  }

}
