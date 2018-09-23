import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { DatePipe } from '@angular/common';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

import { AfccQrReloadService } from './afcc-qr-reload.service';
import { AfccQrReloadComponent } from './afcc-qr-reload.component';
import { QRCodeModule } from 'angularx-qrcode';
import { AngularBleModule } from '@nebulae/angular-ble';
import { ManualDialogValueComponent } from './manual-value-dialog/manual-dialog-value.component';
import { ConfirmReloadDialogComponent } from './confirm-reload-dialog/confirm-reload-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { NumberOnlyDirective } from './tools/number-only-directive';

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
    ShareButtonsModule.forRoot(),
    HttpClientModule,
    AngularBleModule.forRoot({
      enableTracing: false
    }),
    FuseWidgetModule,
    QRCodeModule
  ],
  declarations: [
    AfccQrReloadComponent,
    ManualDialogValueComponent,
    ConfirmReloadDialogComponent,
    NumberOnlyDirective
  ],
  entryComponents: [
    ManualDialogValueComponent,
    ConfirmReloadDialogComponent
  ],
  providers: [ AfccQrReloadService, DatePipe]
})

export class AfccQrReloadModule {}