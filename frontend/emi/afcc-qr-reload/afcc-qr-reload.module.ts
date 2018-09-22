import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { DatePipe } from '@angular/common';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

import { AfccQrReloadService } from './afcc-qr-reload.service';
import { AfccQrReloadComponent } from './afcc-qr-reload.component';
import { QRCodeModule } from 'angularx-qrcode';
import { AngularBleModule } from '@nebulae/angular-ble';

const routes: Routes = [
  {
    path: '',
    component: AfccQrReloadComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    AngularBleModule.forRoot({
      enableTracing: false
    }),
    FuseWidgetModule,
    QRCodeModule
  ],
  declarations: [
    AfccQrReloadComponent    
  ],
  providers: [ AfccQrReloadService, DatePipe]
})

export class AfccQrReloadModule {}