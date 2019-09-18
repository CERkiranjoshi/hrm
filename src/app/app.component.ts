import { CommonService } from './common/service/common.service';
import { slideInAnimation } from './animations';
import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AppComponent implements OnInit,OnDestroy {
  theme: string = 'orange';
  mobileQuery: MediaQueryList;
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,public router: Router, public commonService: CommonService, private overlayContainer: OverlayContainer) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
