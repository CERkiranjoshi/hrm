import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClientApp } from '../common/service/httpclient.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private router: Router, public http: HttpClient, public httpclientapp: HttpClientApp) { }

  getEmployeeDetails(query) {//?user_id=2&offset=0&limit=20&state=&sort_by=updated&sort_order=DESC&q=&allocated_to=
    return this.httpclientapp.get('assets/data/employee.json').pipe(
      map((res) => {
        return res;
      }
      )).pipe(catchError((error) => {
        return this.httpclientapp.handleError(error);
      }));
  }

  getCompanyLists(query) {//?user_id=2&offset=0&limit=20&state=&sort_by=updated&sort_order=DESC&q=&allocated_to=
    return this.httpclientapp.get('assets/data/company.json').pipe(
      map((res) => {
        return res;
      }
      )).pipe(catchError((error) => {
        return this.httpclientapp.handleError(error);
      }));
  }

  getCompanyUsers(query) {//?user_id=2&offset=0&limit=20&state=&sort_by=updated&sort_order=DESC&q=&allocated_to=
    return this.httpclientapp.get('assets/data/companyusers.json').pipe(
      map((res) => {
        return res;
      }
      )).pipe(catchError((error) => {
        return this.httpclientapp.handleError(error);
      }));
  }

  getHolidayLists(query) {//?user_id=2&offset=0&limit=20&state=&sort_by=updated&sort_order=DESC&q=&allocated_to=
    return this.httpclientapp.get('assets/data/holiday.json').pipe(
      map((res) => {
        return res;
      }
      )).pipe(catchError((error) => {
        return this.httpclientapp.handleError(error);
      }));
  }

  getLeaveDetails(query) {//?user_id=2&offset=0&limit=20&state=&sort_by=updated&sort_order=DESC&q=&allocated_to=
    return this.httpclientapp.get('assets/data/leaves.json').pipe(
      map((res) => {
        return res;
      }
      )).pipe(catchError((error) => {
        return this.httpclientapp.handleError(error);
      }));
  }
  

}
