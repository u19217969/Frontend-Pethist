import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JsonResult } from '../../shared/models/json-result';
import { LoginRequest } from '../../shared/models/login';
import { MenuRequest } from 'src/app/shared/models/menu';
import { AuthorizesService } from './authorizes.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  urlServices: string = environment.urlServicesPH;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private authorizesService: AuthorizesService
    ) {}
  iniciarSesion(login: LoginRequest) {
    const urlBackServicePH = `${this.urlServices}login/iniciarSesion`;
    return this.httpClient
      .post(urlBackServicePH, login, {
        observe: 'response',
      })
      .pipe(map((response:any)=>{
        const body= response.body;
        const headers=response.headers;
        const beareToken=headers.get('Authorization');
        const token=beareToken.replace('Bearer ','');

        this.authorizesService.grabarToken(token);

        return body;
      }));
  }
  listarMenu(menu: MenuRequest): Observable<JsonResult<any>> {
    const urlBackServicePH = `${this.urlServices}api/control/accesos/accesoUsuario`;
    const httpParams = JSON.stringify(menu);
    let mheaders: HttpHeaders = new HttpHeaders();
    mheaders = mheaders.append('Content-Type', 'application/json');
    return this.httpClient.post<JsonResult<any>>(
      urlBackServicePH,
      httpParams,
      { headers: mheaders }
    );
  }
}
