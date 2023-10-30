import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  public permisosSource = new Subject<void>();
  public permisos$ = this.permisosSource.asObservable();

  permisosConcedido() {
    this.permisosSource.next();
  }
  permisosNoConcedido() {
    this.permisosSource.next();
  }

  constructor() { }
}
