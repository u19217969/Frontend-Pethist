import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorizesService } from '../services/authorizes.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService implements HttpInterceptor{

  constructor(
    private authorizesService: AuthorizesService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    //Obtener el token de autenticacion del servicio
    const authToken = this.authorizesService.obtenerToken();
    //Clone la solicitud y reemplace los encabezados originales
    //Los encabezados clonados, actualizados con la autorizacion
    const newRequest = req.clone({ body: {} });
    //Envia la solicitud clonada con encabezado al siguiente controlador
    return next.handle(newRequest);
  }
}
