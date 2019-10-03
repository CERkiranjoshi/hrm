import { CalendarComponent } from './pages/calendar/calendar.component';
import { NewsCreateComponent } from './pages/news-create/news-create.component';
import { EmployeeCreateComponent } from './pages/employee-create/employee-create.component';
import { HolidayComponent } from './pages/holiday/holiday.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { PoliciesComponent } from './pages/policies/policies.component';
import { FinancesComponent } from './pages/finances/finances.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewsComponent } from './pages/news/news.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './common/component/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { animation: 'login' } },
  { path: 'employees', component: HomeComponent,canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  { path: 'news', component: NewsComponent,canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard]},
  { path: 'finances', component: FinancesComponent,canActivate: [AuthGuard]},
  { path: 'policies', component: PoliciesComponent,canActivate: [AuthGuard]},
  { path: 'attendance', component: AttendanceComponent,canActivate: [AuthGuard]},
  { path: 'holiday', component: HolidayComponent,canActivate: [AuthGuard]},
  { path: 'addemployee', component: EmployeeCreateComponent,canActivate: [AuthGuard]},
  { path: 'addnews', component: NewsCreateComponent,canActivate: [AuthGuard]},
  { path: 'calendar', component: CalendarComponent,canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
