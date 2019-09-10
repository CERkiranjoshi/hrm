import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class FileUploadHttpInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('/integrations/upload-document') === -1) {
      return next.handle(request);
    }
    // console.log(request.url.indexOf('/integrations/upload-document'));
    let changedRequest = request;
    const headerSettings: { [name: string]: string | string[]; } = {};

    for (const key of request.headers.keys()) {
      headerSettings[key] = request.headers.getAll(key);
    }
    // headerSettings['Content-Type'] = undefined;
    const newHeader = new HttpHeaders(headerSettings);
    // console.log(newHeader)
    // newHeader.delete('Content-Type')
    changedRequest = request.clone({
      headers: newHeader
    });
    return next.handle(changedRequest);
  }
}
