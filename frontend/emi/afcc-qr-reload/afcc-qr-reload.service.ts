import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
import { GatewayService } from '../../../api/gateway.service';
import { CypherAesService } from '@nebulae/angular-ble';
import {
  getSamData
} from './gql/afccQrReload';
import * as aes from 'aes-js';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';


@Injectable()
export class AfccQrReloadService {


  constructor(private gateway: GatewayService,
    private cypherAesService:CypherAesService,
    private http: HttpClient) {

  }

  getSamData$(cardId, value) {
    return this.gateway.apollo
      .watchQuery<any>({
        query: getSamData,
        fetchPolicy: "network-only",
        variables: {
          cardId,
          value
        },
      })
      .valueChanges.map(
        resp => resp.data.getSamData
      );

  }

  bytesToHex(bytes) {
    return this.cypherAesService.bytesTohex(bytes);
  }
}
