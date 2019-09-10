import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_DATE_LOCALE_PROVIDER } from '@angular/material/core';
import { Inject, Injectable, Optional } from '@angular/core';
import * as _moment from 'moment';
// import { default as _rollupMoment } from 'moment';
const moment =  _moment;

@Injectable()
export class CustomDateAdapter extends MomentDateAdapter {

    constructor(@Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
        super(dateLocale);
    }

    parse(value, parseFormat) {
        //   console.log(parseFormat)
        if (value && typeof value == 'string') {
            return moment(value, parseFormat, this.locale, true);
        }
        return value ? moment(value).locale(this.locale) : null;
    }
}