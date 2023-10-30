import { Injectable } from '@angular/core';
import { AuthorizesService } from '../services/authorizes.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(
    private autorizaService: AuthorizesService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let tk = this.autorizaService.obtenerToken();
    if(tk){
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + tk
        }
      });
    }
    return next.handle(req);
  }
}
