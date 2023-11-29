import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResult } from 'src/app/shared/models/json-result';
import { NotificacionListRequest } from 'src/app/shared/models/notificacion';
import { environment } from 'src/environments/environment';

import axios from 'axios';
import { AuthorizesService } from './authorizes.service';
@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  urlServices: string = environment.urlServicesPH + 'api/control/notificacion/';

  constructor(
    private httpClient: HttpClient,
    private authorizesService: AuthorizesService
  ) {}
  listarNotificacion(
    notificacionListRequest: NotificacionListRequest
  ): Observable<JsonResult<any>> {
    const urlBackServicePH = `${this.urlServices}lista`;
    const httpParams = JSON.stringify(notificacionListRequest);
    let mheaders: HttpHeaders = new HttpHeaders();
    mheaders = mheaders.append('Content-Type', 'application/json');
    return this.httpClient.post<JsonResult<any>>(urlBackServicePH, httpParams, {
      headers: mheaders,
    });
  }

  //SSE
  Suscribcion(userId: any): any {
    const urlEndPoint = `http://localhost:9000/notificationSSE/subscribe?userID=${userId}`;
    const token = this.authorizesService.obtenerToken();
    return axios.get(urlEndPoint, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
}
