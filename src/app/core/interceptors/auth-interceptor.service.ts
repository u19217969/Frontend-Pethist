import { Injectable } from '@angular/core';
import { AuthorizesService } from '../services/authorizes.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators'
import { SpinnerService } from '../services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(
    private authorizesService: AuthorizesService,
    private spinnerService:SpinnerService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401) {
          this.authorizesService.cerrarSesion();
        } else {
          const mensaje = err.statusText;
          alert(mensaje);
        }
        return throwError(() => new Error(err.message));
      }),
      finalize(()=> this.spinnerService.hide())
    );
  }
}
