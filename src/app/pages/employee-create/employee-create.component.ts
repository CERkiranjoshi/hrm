
import { AuthService } from './../../auth/auth.service';
import { CommonService } from './../../common/service/common.service';
import { NotificationService } from './../../common/service/notification.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { phoneNumberValidator } from 'src/app/common/validators/phone-validator';
import { LoadingFullScreenService } from 'src/app/common/service/loading-fullscreen.service';
import { inOutXYAnimation } from 'src/app/animations';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
  providers: [
    CommonService
  ],
  animations: [inOutXYAnimation]
})
export class EmployeeCreateComponent implements OnInit {
  policyDetails: FormGroup;
  claimantDetails: FormGroup;
  claimCreateForm: FormGroup;
  public dropdownValues = {
    state: {},
    gender: {},
    insurer: [],
    policy_type: {}
  };
  public caseDetails = {
    member_id: "",
    claimant_amount: "",
    claimant_dod: "",
    flag: 0
  }
  user: any
  displayPage = 'customer';

  public customerDetails = {};

  maxDate = new Date();

  insurerList: string[];
  filteredOptions: Observable<string[]>;

  constructor(private router: Router, public authService: AuthService, public commonService: CommonService, public notificationService: NotificationService, public loadingFullScreenService: LoadingFullScreenService, public apiService: ApiService) {
  }


  ngOnInit() {
    this.user = this.authService.getUser();
    this.policyDetails = this.createPolicyFormGroup();
    // this.policyFormControlValueChanged();
    this.fetchDropdownValues();
  }

  setFilteredOptions() {
    this.filteredOptions = this.policyDetails.get('insurer').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    let list = this.dropdownValues.insurer.filter(option => option['name'].toLowerCase().indexOf(filterValue) > -1);
    list.push({ // Push Others as last option always
      id: 0,
      name: 'Others',
    });
    return list
  }

  // policyFormControlValueChanged() {
  //   const corporate_name = this.policyDetails.get('corporate_name');
  //   const emp_id = this.policyDetails.get('emp_id');
  //   this.policyDetails.get('policy_type').valueChanges.subscribe(
  //     (mode: string) => {
  //       if (mode == "CORPORATE") {
  //         corporate_name.setValidators([Validators.required]);
  //         emp_id.setValidators([Validators.required]);
  //       } else {
  //         corporate_name.clearValidators();
  //         emp_id.clearValidators();
  //       }
  //       corporate_name.updateValueAndValidity();
  //       emp_id.updateValueAndValidity();
  //     });
  // }

  createPolicyFormGroup() {
    return new FormGroup({
      insurer: new FormControl('', {
        validators: [Validators.required]
      }),
      policy_type: new FormControl('', {
        validators: [Validators.required]
      }),
      corporate_name: new FormControl('', {
        validators: []
      }),
      emp_id: new FormControl('', {
        validators: []
      }),
      policy_number: new FormControl('', {
        validators: [Validators.required]
      }),
      policy_uhid: new FormControl('', {
        validators: [Validators.required]
      }),
      claimant_name: new FormControl('', {
        validators: [Validators.required]
      }),
      claimant_phone: new FormControl('', {
        validators: [Validators.required, phoneNumberValidator]
      }),
      claimant_age: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[0-9]+\d*$')]
      }),
      claimant_email: new FormControl('', {//https://angular-templates.io/tutorials/about/angular-forms-and-validations '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
        validators: [Validators.required, Validators.pattern('^([\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,6})?$')]
      }),
      claimant_address: new FormControl('', {
        validators: [Validators.required]
      }),
      claimant_pincode: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(6),
        Validators.minLength(6)]
      }),
      claimant_state: new FormControl('', {
        validators: [Validators.required]
      }),
      claimant_city: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(3)]
      }),
      claimant_gender: new FormControl('', {
        validators: [Validators.required]
      }),
      claimant_doa: new FormControl('', {
        validators: [Validators.required]
      }),
      claimant_lot: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  backToEmployeelist(event){
    this.router.navigate(['employees']);
  }

  fetchDropdownValues() {
    // this.loadingFullScreenService.startLoading();
    // this.apiService.fetchClaimCreateDropdownValues()
    //   .subscribe(
    //     (response: any) => {
    //       this.dropdownValues = response;
    //       this.dropdownValues.policy_type = this.apiService.getPolicyTypes();
    //       this.setFilteredOptions();
    //       this.loadingFullScreenService.stopLoading();
    //     },
    //     (error) => {
    //       // console.log('Failed to fetch dropdown values');
    //       this.loadingFullScreenService.stopLoading();
    //       this.notificationService.handleNotification('Failed to fetch dropdown values');
    //     }
    //   );
  }

  saveCustomerDetails() {
    let doa = new Date(this.claimantDetails.value.claimant_doa);
    this.customerDetails = { ...this.policyDetails.value, ...this.claimantDetails.value, claimant_doa: this.commonService.getFormatDateObj(doa) };
    this.displayPage = 'create-claim';
    this.claimCreateForm.controls['phone_no'].setValue(this.claimantDetails.value.claimant_phone);
    // this.claimCreateForm.controls['claimant_dod'].markAsPristine();
    console.log(this.claimantDetails)
    // this.claimCreateForm.controls['claimant_dod'].updateValueAndValidity();
  }

  saveCaseDetails(claim) {
    const data = { ...this.customerDetails, ...claim };
    // this.apiService.saveCaseDetails(data)
    //   .subscribe(
    //     (response: any) => {
    //       if (response.success) {
    //         this.notificationService.handleNotification('Details added successfully!', 'close', 'success-snackbar');
    //         let i3_case_id = response.data.i3_case_id;
    //         this.router.navigate(['claim-upload-document/', i3_case_id]);
    //       } else {
    //         this.errorBinding(response.errors)
    //       }
    //     },
    //     (error) => {
    //       this.notificationService.handleNotification(error.message);
    //     }
    //   );
  }

  errorBinding(data: any) {
    if (data.error_code == 'VALIDATION_ERROR') {
      this.displayPage = 'customer';
      const errors = data.error_message;
      const claimantDetailsKeys = Object.keys(this.claimantDetails.controls);
      const policyDetailsKeys = Object.keys(this.policyDetails.controls);
      for (let field in errors) {
        let claimIndex = claimantDetailsKeys.indexOf(field);
        let policyIndex = policyDetailsKeys.indexOf(field);
        if (claimIndex >= 0) {
          this.claimantDetails.controls[field].markAsTouched();
          this.claimantDetails.controls[field].setErrors({ 'required': true });
        }
        if (policyIndex >= 0) {
          this.policyDetails.controls[field].markAsTouched();
          this.policyDetails.controls[field].setErrors({ 'required': true });
        }
      }
    }
  }

  create_UUID() {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }


  formatDetails() {
    let dod: Date;
    let dodtime = new Date(this.claimCreateForm.value.claimant_dod).getTime();
    let doatime = new Date(this.claimantDetails.value.claimant_doa).getTime();
    if (dodtime < doatime) {
      this.notificationService.handleNotification('Date of discharge should be greater than date of admission.');
      return false;
    } else {
      dod = new Date(this.claimCreateForm.value.claimant_dod);
      let uuid = this.create_UUID();
      this.caseDetails.member_id = uuid;
      this.caseDetails.claimant_amount = this.claimCreateForm.value.claimant_amount
      this.caseDetails.claimant_dod = this.commonService.getFormatDateObj(dod);
      this.caseDetails.flag = 0;
      this.saveCaseDetails(this.caseDetails);
    }

  }

  backToCustomerDeclaration(event: Event) {
    this.displayPage = 'customer';
    // https://stackblitz.com/edit/angular-qfl1t7-mx991y?file=app%2Fdatepicker-formats-example.html
    // this.claimantDetails.controls['claimant_doa'].markAsUntouched();
    // this.claimantDetails.controls['claimant_doa'].updateValueAndValidity();
    // this.claimantDetails.controls['claimant_doa'].markAsPristine();
  }

}

