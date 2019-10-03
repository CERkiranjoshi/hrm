import { CommonService } from './common/service/common.service';
import { MAT_DATE_LOCALE_PROVIDER } from '@angular/material/core';
import { NotificationService } from './common/service/notification.service';
import { BrowserModule } from '@angular/platform-browser';
import { UserIdleModule } from 'angular-user-idle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { PageNotFoundComponent } from './common/component/page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { HttpClientApp } from './common/service/httpclient.service';
import { AuthService } from './auth/auth.service';
import { MaterialFileUploadComponent } from '../app/common/component/material-file-upload/material-file-upload.component';
import { EncrDecrService } from './common/service/encrypt-decrypt.service';
import { LoadingScreenComponent } from './common/component/loading-screen/loading-screen.component';
import { LoadingFullScreenService } from './common/service/loading-fullscreen.service';
import { FileUploadHttpInterceptor } from './common/http-interceptors/fileupload-interceptors';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { CustomDateAdapter } from './common/service/custom-date-adapter';
import { TitleComponent } from './common/component/title/title.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { EditableColumnPipe } from './common/pipe/editable-column.pipe';
import { SortDataComponent } from './common/component/sort-data/sort-data.component';
import { ConfirmationPopupComponent } from './common/component/confirmation-popup/confirmation-popup.component';
import { organisationConfigLoad } from './app.initializer';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material';
import { DocumentFullscreenViewerComponent } from './common/component/document-fullscreen-viewer/document-fullscreen-viewer.component';
import { GeneralPopupComponent } from './common/component/general-popup/general-popup.component';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewsComponent } from './pages/news/news.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FinancesComponent } from './pages/finances/finances.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { HolidayComponent } from './pages/holiday/holiday.component';
import { EmployeeCreateComponent } from './pages/employee-create/employee-create.component';
import { NewsCreateComponent } from './pages/news-create/news-create.component';
import { CalendarComponent } from './pages/calendar/calendar.component';


const globalRippleConfig: RippleGlobalOptions = {
  disabled: false
};


const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidenavListComponent,
    PageNotFoundComponent,
    MaterialFileUploadComponent,
    LoadingScreenComponent,
    TitleComponent,
    FooterComponent,
    EditableColumnPipe,
    SortDataComponent,
    ConfirmationPopupComponent,
    DocumentFullscreenViewerComponent,
    GeneralPopupComponent,
    HomeComponent,
    DashboardComponent,
    NewsComponent,
    ProfileComponent,
    FinancesComponent,
    PoliciesComponent,
    AttendanceComponent,
    HolidayComponent,
    EmployeeCreateComponent,
    NewsCreateComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrf',
      headerName: 'X-XSRF-TOKEN',
    }),
    NgxDaterangepickerMd.forRoot(),
    UserIdleModule.forRoot({ idle: 1 * 60 * 60, timeout: 5, ping: 60 }) //1 Hours
  ],
  entryComponents: [SortDataComponent, ConfirmationPopupComponent, GeneralPopupComponent],
  providers: [HttpClientApp, {
    provide: APP_INITIALIZER,
    useFactory: organisationConfigLoad,
    deps: [
      HttpClientApp
    ],
    multi: true
    }
    , { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig }, AuthService, NotificationService, EncrDecrService, CommonService, LoadingFullScreenService,
    { provide: HTTP_INTERCEPTORS, useClass: FileUploadHttpInterceptor, multi: true },
    MAT_DATE_LOCALE_PROVIDER,
    { provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, disableClose: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
