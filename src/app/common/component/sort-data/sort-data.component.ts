import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as _ from 'lodash';

@Component({
  selector: 'app-sort-data',
  templateUrl: './sort-data.component.html',
  styleUrls: ['./sort-data.component.scss']
})
export class SortDataComponent implements OnInit {

  indexCol: any

  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<SortDataComponent>) {
    let rowIndex = _.findIndex(this.data, {
      'name': 'index'
    });
    this.indexCol = _.find(this.data, {
      'name': 'index'
    });
    this.data.splice(rowIndex, 1);
  }

  ngOnInit() {
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  saveData() {
    this.data.unshift(this.indexCol);
    this.dialogRef.close(this.data);
  }

  cancel(){
    this.dialogRef.close();
  }

}
