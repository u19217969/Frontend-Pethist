import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, tap, map, catchError } from 'rxjs';
import { AuthorizesService } from 'src/app/core/services/authorizes.service';
import { MaestroService } from 'src/app/core/services/maestro.service';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Authorize } from 'src/app/shared/models/authorize';
import { NotificacionListRequest } from 'src/app/shared/models/notificacion';
import { ParametroMaestro } from 'src/app/shared/models/parametro-maestro';

@Component({
  selector: 'app-control-container',
  templateUrl: './control-container.component.html',
  styleUrls: ['./control-container.component.scss'],
})
export class ControlContainerComponent  implements OnInit {

  openUser:boolean=false;
  openNotification:boolean=false;
  datosUsuario: Authorize = {};
  flAdmin: boolean = false;
  listaNotificaciones:any[]=[];

  private notificacionSubscription: Subscription = new Subscription();
  constructor(
    private router:Router,
    private authorizesService:AuthorizesService,
    private permisoService: PermisoService,
    private maestroService: MaestroService,
    private notificacionService:NotificacionService
  ) { }

  ngOnInit() {
    this.cargarPametrosSistema();
  }

  openUserDetail(){
    this.openNotification=false;
    this.openUser=!this.openUser;
    // this.openUser=this.openUser=='hidden'?'absolute':'hidden';
  }

  openUserNotification(){
    this.openUser=false;
    this.openNotification=!this.openNotification;
  }

  cargarPametrosSistema() {
    this.validarTipoUsuario();
  }

  validarTipoUsuario() {
    this.datosUsuario = this.authorizesService.obtenerUsuarioAutentificacion();
    const id = ParametroMaestro.validarAdministrador;
    this.notificacionSubscription = this.maestroService
      .listarMaestro(id)
      .pipe(
        tap((response) => {
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          let dataMaestra = response.dataListModel[0].nombreMaestro
            .toString()
            .split(',');
          let dataUsuario = this.datosUsuario.nombreTipo!;
          if (dataMaestra.includes(dataUsuario)) {
            this.flAdmin = true;
          } else {
            this.flAdmin = false;
          }
          this.listarNotificaciones(1);
        }),
        map((response) => {
          // Código que transforma la respuesta del servicio
          //return response;
        }),
        catchError((error) => {
          // Código que maneja el error si se produce uno
          console.log(error, 'error');
          throw error;
        })
      )
      .subscribe();
  }

  listarNotificaciones(numeroPagina: number) {
    let idUsuario;
    if (this.flAdmin) {
      idUsuario = 0;
    } else {
      idUsuario = this.datosUsuario.idUsuario!;
    }
    let body: NotificacionListRequest = {
      numeroPagina: numeroPagina,
      numeroRegistros: 5,
      idUsuario: idUsuario,
      fechaInicio: new Date(),
      filtro: '',
    };
    this.notificacionSubscription = this.notificacionService
      .listarNotificacion(body)
      .pipe(
        tap((response) => {
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          if (response.records) {
            this.listaNotificaciones = response.dataListModel;
            console.log(this.listaNotificaciones);
            if(!this.flAdmin){
              this.listaNotificaciones = this.actualizarCampoEnLista("Usted");
            }
          }
        }),
        map((response) => {
          // Código que transforma la respuesta del servicio
          //return response;
        }),
        catchError((error) => {
          // Código que maneja el error si se produce uno
          console.log(error, 'error');
          throw error;
        })
      )
      .subscribe();
  }

  actualizarCampoEnLista(nombre:string) {
    const nuevaLista= this.listaNotificaciones.map((notitifacion) => {
      return {
        ...notitifacion,
        nombreCliente: nombre
      };
    });
    return nuevaLista;
  }

  async redireccionar(ruta:any) {
    this.openNotification=false;
    this.openUser=false;
    try {
      await this.router.navigateByUrl(ruta, { replaceUrl: false });
    } catch (error) {
    }
  }

  cerrarSesion(){
    this.authorizesService.cerrarSesion();
    this.permisoService.permisosNoConcedido();
  }

}
