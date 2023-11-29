import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MantenimientoAccesoRequest } from 'src/app/shared/models/authorize';
import { JsonResult } from 'src/app/shared/models/json-result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  urlServices: string = environment.urlServicesPH+"api/control/accesos/";
  constructor(
    private httpClient: HttpClient
  ) { }

  mantenimientoAcceso(accesoRequest: MantenimientoAccesoRequest[]): Observable<JsonResult<any>> {
    const urlBackServicePH = `${this.urlServices}mantenimiento`;
    const httpParams = JSON.stringify(accesoRequest);
    let mheaders: HttpHeaders = new HttpHeaders();
    mheaders = mheaders.append('Content-Type', 'application/json');
    return this.httpClient.post<JsonResult<any>>(
      urlBackServicePH,
      httpParams,
      { headers: mheaders }
    );
  }

  recuperarContraseña(request: {}): Observable<JsonResult<any>> {
    const urlBackServicePH = `${this.urlServices}recuperarContrasenia`;
    const httpParams = JSON.stringify(request);
    let mheaders: HttpHeaders = new HttpHeaders();
    mheaders = mheaders.append('Content-Type', 'application/json');
    return this.httpClient.post<JsonResult<any>>(
      urlBackServicePH,
      httpParams,
      { headers: mheaders }
    );
  }
}


