import { AuthService } from './../../auth/auth.service';
import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { PageEvent, MatSelectChange, MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common/service/common.service';
import { NotificationService } from 'src/app/common/service/notification.service';
import { ApiService } from '../api.service';
import { LoadingFullScreenService } from 'src/app/common/service/loading-fullscreen.service';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-company-users',
  templateUrl: './company-users.component.html',
  styleUrls: ['./company-users.component.scss']
})
export class CompanyUsersComponent implements OnInit {

  pageConfigData: any;
  organisationData: any;
  @Output() page: EventEmitter<PageEvent>;
  @Output() selectionChange: EventEmitter<MatSelectChange>
  total: number;
  pageSize = 10;
  pageIndex = 0;
  user: any;
  profiles: any;
  statusList: any
  lastUpdatedCaseId: any;
  userGroupType = "";
  profileID: any;
  selectedDateRange = { startDate: moment(), endDate: moment() };
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  removable = true;
  fileUploadView = false
  filterList = {
    sortName: "Created Date",
    sortBy: "created",
    sortOrder: "DESC",
    limit: 10,
    offset: 0,
    filterColumns: [],
  };


  displayedColumns: string[] = ['select'];
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  constructor(public authService : AuthService,public router: Router, private route: ActivatedRoute, public commonService: CommonService, public notificationService: NotificationService, public apiService: ApiService, public loadingFullScreenService: LoadingFullScreenService) {
    this.pageConfigData = this.commonService.getPageConfig(this.route.snapshot.routeConfig.path);
    this.organisationData = this.commonService.getOrganisationData();
    this.route.queryParams.subscribe(params => {
      if (params.sort_by != undefined) {
        let data = _.cloneDeep(params)
        data.columns = this.commonService.getBase64Decrypt(data.columns)
        this.initFilterList(data)
      } else {
        this.filterList.limit = this.organisationData.pageSize;
        this.pageSize = this.organisationData.pageSize;
      }
    });
  }

  ngOnInit() {
    // this.user = this.commonService.getUserData()
    // this.userGroupType = this.commonService.getUserType();
    // this.profileID = this.commonService.getUserProfileID();
    this.setDisplayColumns()
  }

  ngAfterViewInit() {
    this.getCompanyUsers();
  }

  addNewCompany(){
    this.router.navigate(['/addcompany']); 
  }

  archiveCompany(){
 this.notificationService.handleNotification("Select Company for archive");
  }

  initFilterList(filterList) {
    this.filterList.sortBy = filterList.sort_by;
    this.filterList.sortOrder = filterList.sort_order;
    this.filterList.limit = filterList.limit;
    this.pageSize = parseInt(filterList.limit) - parseInt(filterList.offset);
    this.pageIndex = Math.ceil(parseInt(filterList.offset) / parseInt(filterList.limit))
    this.filterList.offset = filterList.offset;
    let columnObj = this.commonService.findObjByObj(this.pageConfigData.displayColumns, { "key": filterList.sort_by })
    this.filterList.sortName = columnObj['name']
    const columns = JSON.parse(filterList.columns)
    this.filterList.filterColumns = []
    this.lastUpdatedCaseId = filterList.id != "" ? filterList.id : ""
    if (columns.length) {
      for (let i = 0; i < columns.length; i++) {
        let column = _.cloneDeep(this.commonService.findObjByObj(this.pageConfigData.displayColumns, { "key": columns[i].key }))
        let tempObj = {
          "name": column['name'],
          "displayValue": this.getDisplayValue(column, columns[i].value),
          "value": columns[i].value,
          "type": column['searchBy'],
          "key": column['key'],
          "searchByVal": column['searchByVal']
        }
        if (column['searchBy'] == 'daterange') {
          tempObj['startDate'] = columns[i].startDate;
          tempObj['endDate'] = columns[i].endDate;
        }
        this.filterList.filterColumns.push(tempObj)
      }
    }
    console.log("TCL: DocumentListComponent -> initFilterList -> this.filterList", this.filterList)
  }

  getDisplayValue(column, value) {
    if (column.searchBy == 'text') {
      return value;
    } else if (column.searchBy == "dropdown") {
      const dropdownLists = this.pageConfigData[column.searchByVal];
      return this.commonService.getDisplayValue(dropdownLists, value)
    }

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  setDisplayColumns() {
    for (let i = 0; i < this.pageConfigData.displayColumns.length; i++) {
      this.displayedColumns.push(this.pageConfigData.displayColumns[i].key)
    }
  }

  applyFilter() {
    this.filterList.offset = 0;
    this.filterList.limit = this.pageSize;
    this.pageIndex = 0;
    this.getCompanyUsers();
  }

  getCompanyUsers() {
    const query = this.commonService.generateURL(this.user, this.filterList);
    this.loadingFullScreenService.startLoading();
    this.apiService.getCompanyUsers(query)
      .subscribe(
        (response: any) => {
          this.dataSource = new MatTableDataSource(response.data);
          this.total = response.data.length;
          this.selection.clear();
          history.replaceState({}, this.pageConfigData.name, "/#/" + this.pageConfigData.url + "?" + query);
          this.loadingFullScreenService.stopLoading();
        },
        (error) => {
          // console.log(error.message)
          this.loadingFullScreenService.stopLoading();
          this.notificationService.handleNotification(error.message);
        }
      );
  }

  getSelectedDocuments() {
    var temp = [];
    for (let i = 0; i < this.selection.selected.length; i++) {
      temp.push(this.selection.selected[i].id);
    }
    return temp;
  }


  changeSort(column, sortOrder) {
    this.filterList.sortBy = column.key;
    this.filterList.sortOrder = sortOrder;
    this.filterList.sortName = column.name;
    this.getCompanyUsers();
  };

  filterData(column, displayValue, actualValue = "") {
    let val = displayValue.trim();
    let obj = {
      "name": column.name,
      "displayValue": val,
      "value": actualValue,
      "type": column.searchBy, //text/daterange/dropdown
      "key": column.key,
      "searchByVal": column.searchByVal
    }
    if (column.searchBy == 'daterange') {
      obj['startDate'] = this.selectedDateRange.startDate.format('DD MMM YYYY')
      obj['endDate'] = this.selectedDateRange.endDate.format('DD MMM YYYY')
    }
    let findObj = {
      "name": column.name,
      "key": column.key,
    }
    let index = this.commonService.findIndexByObj(this.filterList.filterColumns, findObj);
    this.commonService.removeByIndex(this.filterList.filterColumns, index);
    if (val != "") {
      this.filterList.filterColumns.push(obj);
    }
    console.log("filterColumns", this.filterList.filterColumns)
    this.applyFilter()
    // this.levelOneTrigger.closeMenu()
    // let el: HTMLElement = this.myDiv.nativeElement;
    // el.click();
  };

  setSelectedDropdownFilterClass(column, data) {
    let findObj = {
      "name": column.name,
      "key": column.key,
    }
    let obj = this.commonService.findObjByObj(this.filterList.filterColumns, findObj);
    if (obj == undefined || data == undefined) {
      return
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].value == obj['displayValue']) {
        data[i].selected = true;
      } else {
        data[i].selected = false;
      }
    }
  }

  pageChanged(data) {
    this.filterList.offset = data.pageIndex * data.pageSize;
    this.filterList.limit = (data.pageIndex + 1) * data.pageSize;
    this.pageSize = data.pageSize;
    this.pageIndex = data.pageIndex;
    this.getCompanyUsers();
  };

  removeFilter(index) {
    let obj = this.filterList.filterColumns[index]
    this.commonService.removeByIndex(this.filterList.filterColumns, index);
    if (obj.type != "dropdown") {
      return
    }
    const data = this.pageConfigData[obj.searchByVal]
    for (let i = 0; i < data.length; i++) {
      data[i].selected = false;
    }
    this.applyFilter()
  }

  removeAllFilter() {
    this.filterList.filterColumns = [];
    this.applyFilter()
  }

  browseDocument() {
    if (this.fileUploadView == false) {
      this.fileUploadView = true;
    } else {
      this.fileUploadView = false;
    }
  }

  getStatusViewValue(value) {
    let obj = this.commonService.findObjByKeyVal(this.pageConfigData.departmentFilterLists, "key", value)
    return obj.value;
  }

}

