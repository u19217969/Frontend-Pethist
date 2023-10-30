import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResult } from 'src/app/shared/models/json-result';
import { UsuarioFindRequest, UsuarioListRequest, UsuarioRequest } from 'src/app/shared/models/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlServices: string = environment.urlServicesPH+"api/control/usuario/";
  constructor(
    private httpClient: HttpClient
  ) { }

  mantenimientoUsuario(usuarioRequest: UsuarioRequest): Observable<JsonResult<any>> {
    const urlBackServicePH = `${this.urlServices}mantenimiento`;
    const httpParams = JSON.stringify(usuarioRequest);
    let mheaders: HttpHeaders = new HttpHeaders();
    mheaders = mheaders.append('Content-Type', 'application/json');
    return this.httpClient.post<JsonResult<any>>(
      urlBackServicePH,
      httpParams,
      { headers: mheaders }
    );
  }

  listarUsuario(usuarioRequest: UsuarioListRequest): Observable<JsonResult<any>> {
    const urlBackServicePH = `${this.urlServices}lista`;
    const httpParams = JSON.stringify(usuarioRequest);
    let mheaders: HttpHeaders = new HttpHeaders();
    mheaders = mheaders.append('Content-Type', 'application/json');
    return this.httpClient.post<JsonResult<any>>(
      urlBackServicePH,
      httpParams,
      { headers: mheaders }
    );
  }
  buscarUsuario(usuarioFindRequest: UsuarioFindRequest): Observable<JsonResult<any>> {
    const urlBackServicePH = `${this.urlServices}buscar`;
    const httpParams = JSON.stringify(usuarioFindRequest);
    let mheaders: HttpHeaders = new HttpHeaders();
    mheaders = mheaders.append('Content-Type', 'application/json');
    return this.httpClient.post<JsonResult<any>>(
      urlBackServicePH,
      httpParams,
      { headers: mheaders }
    );
  }
}
