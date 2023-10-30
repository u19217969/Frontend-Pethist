import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MantenimientoAccesoRequest } from 'src/app/shared/models/authorize';
import { CitaListRequest, CitaRequest } from 'src/app/shared/models/cita';
import { HorarioFechaRequest } from 'src/app/shared/models/horario';
import { JsonResult } from 'src/app/shared/models/json-result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  urlServices: string = environment.urlServicesPH+"api/control/cita/";
  constructor(
    private httpClient: HttpClient
  ) { }
  horarioFecha(accesoRequest: HorarioFechaRequest): Observable<JsonResult<any>> {
    const urlBackServicePH = `${this.urlServices}horarioFecha`;
    const httpParams = JSON.stringify(accesoRequest);
    let mheaders: HttpHeaders = new HttpHeaders();
    mheaders = mheaders.append('Content-Type', 'application/json');
    return this.httpClient.post<JsonResult<any>>(
      urlBackServicePH,
      httpParams,
      { headers: mheaders }
    );
  }
  mantenimientoCita(citaRequest: CitaRequest): Observable<JsonResult<any>> {
    const urlBackServicePH = `${this.urlServices}mantenimiento`;
    const httpParams = JSON.stringify(citaRequest);
    let mheaders: HttpHeaders = new HttpHeaders();
    mheaders = mheaders.append('Content-Type', 'application/json');
    return this.httpClient.post<JsonResult<any>>(
      urlBackServicePH,
      httpParams,
      { headers: mheaders }
    );
  }
  listarCita(mascotaRequest: CitaListRequest): Observable<JsonResult<any>> {
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
