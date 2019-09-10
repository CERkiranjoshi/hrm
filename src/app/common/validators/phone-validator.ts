import { AbstractControl } from '@angular/forms';
export function phoneNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    const valid = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/.test(control.value);
    return valid ? null : { invalidNumber: { valid: false, value: control.value } };
}