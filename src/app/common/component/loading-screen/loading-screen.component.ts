import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingFullScreenService } from '../../service/loading-fullscreen.service';
import { Subscription } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {


  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingFullScreenService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
