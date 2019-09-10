// import { Config } from './config.service';
import { Injectable, OnInit } from '@angular/core';
// import {Http, HttpHeaders, Response} from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

// import 'rxjs/Rx';
// import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { InitialStylingValuesIndex } from '@angular/core/src/render3/interfaces/styling';
import { NEXT } from '@angular/core/src/render3/interfaces/view';
// import { catchError } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class HttpClientApp implements OnInit {

  public organisationData: any;

  public organisationConfig = {
    itemsPerPage: 20
  }

  constructor(private http: HttpClient) {
    // this.organisationData.url = "http://localhost:8000/"
  }

  ngOnInit() {
  }

  createAuthorizationHeader(headers: HttpHeaders) {
    // const authorization = sessionStorage.getItem('authorization');
    // httpOptions.headers =
    //   httpOptions.headers.set('Authorization', authorization);

  }

  get(url) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, httpOptions);
  }

  getJSON(url) {
    return this.http.get(url);
  }

  post(url, data) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data);
  }

  upload(url, data) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, httpOptions);
  }

  put(url, data) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    // headers.set('Content-Type', undefined)
    return this.http.put(url, data);
  }

  delete(url) {
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, httpOptions);
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      return throwError(error);
    } else {
      error.message = 'Internal server error'
    }
    return throwError(error.message || error);
  }
}
