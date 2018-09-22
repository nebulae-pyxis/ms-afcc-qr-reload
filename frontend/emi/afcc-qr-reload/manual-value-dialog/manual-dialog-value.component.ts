import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as Rx from 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'manual-dialog-value',
  templateUrl: './manual-dialog-value.component.html',
  styleUrls: ['./manual-dialog-value.component.scss'],
})
export class ManualDialogValueComponent implements OnInit, OnDestroy {
  
  amount: Number;

  constructor() {}
    

  ngOnInit() {
  }

  
  ngOnDestroy() {
  }

}
