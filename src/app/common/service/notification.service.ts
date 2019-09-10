import { Injectable, NgZone } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Injectable()
export class NotificationService {

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(public snackBar: MatSnackBar, private zone: NgZone) {
    }

    handleNotification(message: string, action: string = 'X', className: string = 'error-snackbar') {
        this.zone.run(() => {
            this.snackBar.open(message, action, {
                duration: 3000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
                panelClass: [className]
            });
        });
    }
}