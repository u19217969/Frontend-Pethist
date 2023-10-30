import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResult } from 'src/app/shared/models/json-result';
import { MascotaListRequest, MascotaRequest } from 'src/app/shared/models/mascota';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  urlServices: string = environment.urlServicesPH+"api/control/mascota/";
  constructor(
    private httpClient: HttpClient
  ) { }
  mantenimientoMascota(mascotaRequest: MascotaRequest): Observable<JsonResult<any>> {
    const urlBackServicePH = `${this.urlServices}mantenimiento`;
    const httpParams = JSON.stringify(mascotaRequest);
    let mheaders: HttpHeaders = new HttpHeaders();
    mheaders = mheaders.append('Content-Type', 'application/json');
    return this.httpClient.post<JsonResult<any>>(
      urlBackServicePH,
      httpParams,
      { headers: mheaders }
    );
  }
  listarMascota(mascotaRequest: MascotaListRequest): Observable<JsonResult<any>> {
    const urlBackServicePH = `${this.urlServices}lista`;
    const httpParams = JSON.stringify(mascotaRequest);
    let mheaders: HttpHeaders = new HttpHeaders();
    mheaders = mheaders.append('Content-Type', 'application/json');
    return this.httpClient.post<JsonResult<any>>(
      urlBackServicePH,
      httpParams,
      { headers: mheaders }
    );
  }
}
