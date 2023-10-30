import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { AuthorizesService } from './services/authorizes.service';
import { PermisoService } from './services/permiso.service';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { MaestroService } from './services/maestro.service';
import { MascotaService } from './services/mascota.service';
import { UsuarioService } from './services/usuario.service';
import { AccesoService } from './services/acceso.service';
import { CitaService } from './services/cita.service';
import { NotificacionService } from './services/notificacion.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    LoginService,
    AuthorizesService,
    PermisoService,
    MaestroService,
    MascotaService,
    UsuarioService,
    AccesoService,
    CitaService,
    NotificacionService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  exports: [
    HttpClientModule,
  ],
})
export class CoreModule { }
