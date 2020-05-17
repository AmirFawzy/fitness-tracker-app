import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-stop-training',
  template: `
    <h2 mat-dialog-title>Are you sure?</h2>
    <mat-dialog-content>
      <p>You already got {{ progresData.progress }}%</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Yes</button>
      <button mat-button [mat-dialog-close]="false">No</button>
    </mat-dialog-actions>
  `
})
export class StopTrainingComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public progresData: any) { }

  ngOnInit() {
  }

}
