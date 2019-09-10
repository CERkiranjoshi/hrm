import { EncrDecrService } from './encrypt-decrypt.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CommonService {

    urlData: any;
    encryptKey = ""

    constructor(private EncrDecr: EncrDecrService) {
        let orgData = this.getOrganisationData();
        this.encryptKey = orgData.client;
    }

    encryptStringData(data) {
        return this.EncrDecr.set(this.encryptKey, data);
    }

    decryptStringData(data) {
        return this.EncrDecr.get(this.encryptKey, data);
    }

    setAESObjEncrypt(data) {
        return this.EncrDecr.setAESObjEncrypt(this.encryptKey, data);
    }

    getAESObjDecrypt(data) {
        return this.EncrDecr.getAESObjDecrypt(this.encryptKey, data);
    }

    setBase64Encrypt(data) {
        return window.btoa(data)
        // return data
    }

    getBase64Decrypt(data) {
        // return data
        return window.atob(data)
    }

    getOrganisationData() {
        let data = sessionStorage.getItem('organisation');
        let obj = JSON.parse(data);
        if (data != null && obj.client != undefined) {
            return obj;
        }
    }

    getPageConfig(page) {
        let data = sessionStorage.getItem('organisation');
        let obj = JSON.parse(data);
        let index = this.findIndexByKeyVal(obj.pages, "url", page)
        return obj.pages[index];
    }

    getUserData() {
        const data = sessionStorage.getItem('user');
        return JSON.parse(data);
    }

    getUserType() {
        const data = sessionStorage.getItem('user');
        let user = JSON.parse(data);
        return user.group_data.name.toLowerCase();
    }

    getUserProfileID() {
        const data = sessionStorage.getItem('user');
        let user = JSON.parse(data);
        return user.profiles[0].id
    }

    getDisplayValue(lists, key) {
        let findObj = {
            "key": key
        }
        let obj = this.findObjByObj(lists, findObj);
        if (obj != undefined) {
            return obj['value']
        } else {
            return false;
        }
    }

    toggleHeader(val) {
        var x = document.getElementById("header-main");
        x.style.display = val;
    }

    // dtring to date
    getFormatDate(object: any) {
        if (object != undefined && object != null && object != '') {
            return moment(new Date(object)).format('DD-MMM-YYYY');
        } else {
            return '-'
        }
    }

    getFormatDateObj(object: any) {
        if (object != undefined && object != null && object != '') {
            return moment(object).format('DD-MMM-YYYY');
        } else {
            return '-'
        }
    }

    //Date to Epoch;
    getDateToEpoch(object: any) {
        if (object != undefined && object != null && object != '') {
            let dt = (moment(object).millisecond(0).second(0).minute(0).hour(0)).valueOf();
            return dt / 1000;
            // return Math.round(object.getTime() / 1000.0); //Date to Epoch;
        } else {
            return '-'
        }
    }


    // below are standard function do not modify
    findIndexByObj(data, obj) {
        let index = _.findIndex(data, obj);
        return index;
    }

    findIndexByKeyVal(data, key: string, val) {
        let findObj = {}
        findObj[key] = val
        let index = _.findIndex(data, findObj);
        return index;
    }

    getIndexOfArr(data, val) {//pure array
        return data.indexOf(val);
    }

    getIndexOfArrAndRemove(data, val) {
        let index = data.indexOf(val);
        if (index > -1) {
            data.splice(index, 1);
        }
    }

    findObjByKeyVal(data, key: string, val) {
        let findObj = {}
        findObj[key] = val
        let obj = _.find(data, findObj);
        return obj;
    }

    findObjByObj(data, findObj) {
        let obj = _.find(data, findObj);
        return obj;
    }

    findIndexAndRemove(data, key, val) {
        let findObj = {}
        findObj[key] = val
        let index = _.findIndex(data, findObj);
        if (index > -1) {
            data.splice(index, 1);
        }
    }

    removeByIndex(data, index) {
        if (index > -1) {
            data.splice(index, 1);
        }
    }

    getDeepCloneObj(obj) {
        let newObj = _.cloneDeep(obj);
        return newObj
    }

    insertObj(arr, index, ...newItems) {
        return [
            // part of the array before the specified index
            ...arr.slice(0, index),
            // inserted items
            ...newItems,
            // part of the array after the specified index
            ...arr.slice(index)
        ]
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    duplicateVal(data = []) {
        return _.filter(data, (val, i, iteratee) => _.includes(iteratee, val, i + 1))
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

    filterObjectByKey(searchObj, searchVal) {
        const data = Object.keys(searchObj).filter(key => key.toLowerCase().indexOf(searchVal) > -1);
        var filteredObj = {}
        for (let i = 0; i < data.length; i++) {
            let key = data[i]
            filteredObj[key] = searchObj[key]
        }
        return filteredObj
    }

    setUrl(url) {
        this.urlData = {
            page: url.page,
            filterBy: url.filterBy,
            length: url.length,
            pageIndex: url.pageIndex,
            pageSize: url.pageSize,
            sortActive: url.sortActive,
            sortDirection: url.sortDirection,
            searchText: url.searchText
        }
        sessionStorage.setItem('filterParams', JSON.stringify(url));
    }

    getUrl() {
        let u;
        if (this.urlData) {
            u = this.urlData; // Set URL from Service Variable
        } else {
            u = JSON.parse(sessionStorage.getItem('filterParams')); // Set URL from Session Storage
        }
        if (u) {
            let url = {
                page: u.page,
                filterBy: u.filterBy,
                sortActive: u.sortActive,
                sortDirection: u.sortDirection,
                searchText: u.searchText,
                length: u.length,
                pageIndex: u.pageIndex,
                pageSize: u.pageSize,
            }
            return url
        } else {
            return null
        }
    }

    generateURL(user, filterList, id = "") {
        let url = ""
        if (id != "") {
            url = "id=" + id + "&"
        }
        url += "sort_by=" + escape(filterList.sortBy) + "&sort_order=" + escape(filterList.sortOrder) + "&limit=" + filterList.limit + "&offset=" + filterList.offset;
        let columns = []
        for (let i = 0; i < filterList.filterColumns.length; i++) {
            let column = filterList.filterColumns[i];
            let obj = {
                // "type": column.type,
                "key": column.key,
                "value": column.value
            }
            if (column.type == 'daterange') {
                delete obj['value']
                obj['startDate'] = column.startDate
                obj['endDate'] = column.endDate
            }
            columns.push(obj)
        }
        url = url + '&columns=' + this.setBase64Encrypt(JSON.stringify(columns));
        return url;
    }


    // const insert = (arr, index, ...newItems) => [
    //   // part of the array before the specified index
    //   ...arr.slice(0, index),
    //   // inserted items
    //   ...newItems,
    //   // part of the array after the specified index
    //   ...arr.slice(index)
    // ]
    // const result = insert(this.dataSource.data, rowIndex, obj);

}
