import { HttpClientApp } from './../../service/httpclient.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient, HttpResponse, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Subscription, of, throwError } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { EncrDecrService } from '../../service/encrypt-decrypt.service';
import * as CryptoJS from 'crypto-js';
import { NotificationService } from '../../service/notification.service';


@Component({
  selector: 'app-material-file-upload',
  templateUrl: './material-file-upload.component.html',
  styleUrls: ['./material-file-upload.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MaterialFileUploadComponent implements OnInit {

  /** Link text */
  @Input() text = 'Browse Document';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'file';
  /** Target URL for file uploading. Overriding at onit level */
  @Input() target = 'https://file.io';

  /** File extension that accepted, same as 'accept' of <input type="file" />. By the default, it's set to 'image/*'. */
  @Input() accept = '.pdf, .png, .jpeg, .jpg, .bmp, .tif, .zip, .tiff';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter<string>();

  @Output() refreshListOnClose = new EventEmitter<string>();

  @Input() defaultBrowseOpen = false

  // @Input() agreement_id: any;

  files: Array<FileUploadModel> = [];

  fileIndex = 0;

  user: any;

  buttonRemoveDisabled = true;

  constructor(private _http: HttpClient, public notificationService: NotificationService, public httpclientapp: HttpClientApp, private EncrDecr: EncrDecrService) { }

  ngOnInit() {
    this.target = 'api/packages/'
    const data = sessionStorage.getItem('user');
    this.user = JSON.parse(data);
    if (this.defaultBrowseOpen) {
      this.onClick();
    }
    // var encrypted = this.EncrDecr.set('123456$#@$^@1ERF', 'password@123456');
    // var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', encrypted);
    // console.log('Encrypted :' + encrypted);
    // console.log('Encrypted :' + decrypted);
  }

  onClick() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.onchange = () => {
      // console.log(fileUpload.files);
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        const fileExt = file.name.split('.').pop();
        this.files.push({
          data: file,
          fileExt: fileExt,
          state: 'in',
          success_message: '',
          success: false,
          error: false,
          error_message: '',
          inProgress: false,
          progress: 0,
          canRetry: false,
          canCancel: true
        });
      }
      this.uploadFirstFile();
    };
    fileUpload.click();
  }

  private uploadFirstFile() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.value = '';
    // as all file upload need to be upload one by one not together for duplicate content
    if (this.files.length > 0) {
      this.generateSHA1Hashcode(this.files[this.fileIndex]);
    }
    // this.files.forEach(file => {
    //   if (!file.inProgress) {
    //     this.generateSHA1Hashcode(file);
    //   }
    // });
  }

  generateSHA1Hashcode(fileValue) {
    // const file = fileValue.data
    var hashcode;
    var reader = new FileReader(); //define a Reader
    reader.onload = (f) => {
      var file_result = reader.result; // this == reader, get the loaded file "result"
      var file_wordArr = CryptoJS.lib.WordArray.create(file_result); //convert blob to WordArray
      // console.log(file_wordArr)
      var sha1_hash = CryptoJS.SHA1(file_wordArr); //calculate SHA1 hash
      hashcode = sha1_hash.toString();
      // console.log('hash code : ', hashcode);
      this.uploadFile(fileValue, hashcode);
    }
    reader.readAsArrayBuffer(fileValue.data);
  }

  cancelFile(file: FileUploadModel) {
    if (file) {
      if (file.sub) {
        file.sub.unsubscribe();
      }
      if (this.files.length == 1) {
        this.removeAll();
      } else {
        this.removeFileFromArray(file);
      }
    }
  }

  retryFile(file: FileUploadModel) {
    this.generateSHA1Hashcode(file);
    file.canRetry = false;
  }

  private uploadFile(file: FileUploadModel, hashcode) {
    const url = this.target;
    const fd = new FormData();
    fd.append('user_id', this.user.id);
    fd.append('profile_id', this.user.profiles[0].id);
    fd.append('reportFile', file.data);
    // fd.append('file_hash', hashcode);
    // console.log(file)
    const req = new HttpRequest('POST', url, fd, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      }),
      reportProgress: true
    });

    file.inProgress = true;
    file.sub = this._http.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      tap(message => { }),
      last(),
      catchError((error: HttpErrorResponse) => {
        // console.log(error)
        file.inProgress = false;
        file.canRetry = false;//no option for retry
        file.error = true;
        file.error_message = "Failed to upload file" + file.data.name;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe(
      (event: any) => {
        // console.log(event.body)
        if (typeof (event) === 'object') {
          if (event.body.error_message != undefined) { // Status Code 422 for error while uploading file (Upload Failed)
            file.error = true;
            file.error_message = event.body.error_message;
          } else if (event.status === 200) { // Status Code 201 for succesfully uploaded file
            file.success = true;
            file.success_message = "File " + file.data.name + " uploaded successfully!";
          }
          this.complete.emit(event.body);
        }
        this.uploadNext();
      }
    );
  }

  public uploadNext() {
    this.fileIndex++;
    if (this.fileIndex < this.files.length) {
      this.generateSHA1Hashcode(this.files[this.fileIndex]);
      this.buttonRemoveDisabled = true;
    } else {
      this.buttonRemoveDisabled = false;
    }
  }

  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
      this.fileIndex--;
    }
    if (this.files.length == 0) {
      this.buttonRemoveDisabled = true;
    }
  }

  public removeAll() {
    this.files = [];
    this.fileIndex = 0;
    this.buttonRemoveDisabled = true;
    this.refreshListOnClose.emit();
  }

}

export class FileUploadModel {
  data: File;
  success: boolean;
  error: boolean;
  error_message: string;
  success_message: string;
  fileExt: string;
  state: string;
  inProgress: boolean;
  progress: number;
  canRetry: boolean;
  canCancel: boolean;
  sub?: Subscription;
}
