import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResult } from 'src/app/shared/models/json-result';
import { NotificacionListRequest } from 'src/app/shared/models/notificacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  urlServices: string = environment.urlServicesPH + 'api/control/notificacion/';

  constructor(private httpClient: HttpClient) {}
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
}
