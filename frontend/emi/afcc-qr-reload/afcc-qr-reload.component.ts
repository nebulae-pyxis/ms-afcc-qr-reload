import { AfccQrReloadService } from './afcc-qr-reload.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fuseAnimations } from '../../../core/animations';
import { Subscription } from 'rxjs/Subscription';
import * as Rx from 'rxjs/Rx';
import { map } from 'rxjs/operators';

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

  constructor(private afccQrReloadervice: AfccQrReloadService  ) {    

  }
    

  ngOnInit() {
  }

  
  ngOnDestroy() {
  }

  afccReload(value){
    this.afccQrReloadervice.getSamData$(this.cardId, value).pipe(
      map(resp => {
        console.log('llega timestamp: ', resp.timestamp)
        return {
          '1': this.intToHex(resp.id),
          '2': this.intToHex(resp.timestamp),
          '3': this.intToHex(resp.value),
          '4': this.intToHex(resp.tagId),
          '5': resp.sign
        }
      })
    ).subscribe(result => {
      this.qrReloadObj = JSON.stringify(result);
      console.log("llega resultado de api: ", result)
    })
    this.reloadingCard = true;
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

}
