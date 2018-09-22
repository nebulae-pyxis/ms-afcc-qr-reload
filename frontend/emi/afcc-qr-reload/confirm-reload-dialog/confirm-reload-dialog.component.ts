import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as Rx from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'confirm-reload-dialog',
  templateUrl: './confirm-reload-dialog.component.html',
  styleUrls: ['./confirm-reload-dialog.component.scss'],
})
export class ConfirmReloadDialogComponent implements OnInit, OnDestroy {

  constructor(private dialogRef: MatDialogRef<ConfirmReloadDialogComponent>) {}
    

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  confirmReload(isReloadAccepted){
    this.dialogRef.close(isReloadAccepted);
  }

}
