import { AfccQrReloadService } from './afcc-qr-reload.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../core/animations';
import { Subscription } from 'rxjs/Subscription';
import * as Rx from 'rxjs/Rx';
import { map, filter, mergeMap, mergeMapTo } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ManualDialogValueComponent } from './manual-value-dialog/manual-dialog-value.component';
import { ConfirmReloadDialogComponent } from './confirm-reload-dialog/confirm-reload-dialog.component';
import { ShareButtons } from '@ngx-share/core';
 
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'afcc-qr-reload',
  templateUrl: './afcc-qr-reload.component.html',
  styleUrls: ['./afcc-qr-reload.component.scss'],
  animations: fuseAnimations
})
export class AfccQrReloadComponent implements OnInit, OnDestroy {
  
  reloadingCard = false;
  cardId: String;
  qrReloadObj: any;
  shareUrl

  constructor(private afccQrReloadervice: AfccQrReloadService,
    private dialog: MatDialog,
    public share: ShareButtons) {    

  }
    

  ngOnInit() {
  }

  
  ngOnDestroy() {
  }

  afccReload(value){
    this.dialog
    .open(ConfirmReloadDialogComponent)
    .afterClosed()
    .pipe(
      filter(confirmed => confirmed),
      mergeMapTo(this.afccQrReloadervice.getSamData$(this.cardId, value).pipe(
        map(resp => {
          return {
            '1': this.intToHex((resp as any).id),
            '2': this.intToHex((resp as any).timestamp),
            '3': this.intToHex((resp as any).value),
            '4': this.intToHex((resp as any).tagid),
            '5': (resp as any).sign
          };
        }),
        map(a =>  window.btoa(unescape(encodeURIComponent(JSON.stringify(a)))))
      ))
    )
    .subscribe(result => {
      this.reloadingCard = true;
      this.qrReloadObj = JSON.stringify(result);
      this.shareUrl = 'https://share-qr.firebaseapp.com/qr/'+this.qrReloadObj.replace(/['"]+/g, '');
      console.log("llega resultado de api: ", result)
    })
    
    
  }

  finishReloadAction() {
    this.reloadingCard = false;
  }

  intToHex(num) {
    return this.afccQrReloadervice.bytesToHex(new Uint8Array(this.toBytesInt32(num)))
  }

  toBytesInt32 (num) {
    const arr = new ArrayBuffer(4); // an Int32 takes 4 bytes
    const view = new DataView(arr);
    view.setUint32(0, num, false); // byteOffset = 0; litteEndian = false
    return arr;
}

reloadAnotherValue(){
  this.dialog
      .open(ManualDialogValueComponent);
}

confirmReloadCard() {
  this.dialog
    .open(ConfirmReloadDialogComponent);
}

}
