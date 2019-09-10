import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

  @Input() title: string;
  @Input() routeLink: string;
  @Input() showBackButton: boolean = false;
  @Input() callBack: boolean = false;
  @Output() callBackFunc = new EventEmitter();


  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  backToPrevious() {
    if (this.callBack === false) {
      this.router.navigate([this.routeLink]);
    }
    else {
      this.callBackFunc.emit();
    }
  }
}
