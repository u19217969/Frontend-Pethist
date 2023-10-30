import { Component, OnInit } from '@angular/core';
import { Authorize } from 'src/app/shared/models/authorize';
import { Subscription, tap, map, catchError } from 'rxjs';
import { AuthorizesService } from 'src/app/core/services/authorizes.service';
import { ParametroMaestro } from 'src/app/shared/models/parametro-maestro';
import { NotificacionService } from 'src/app/core/services/notificacion.service';
import { MaestroService } from 'src/app/core/services/maestro.service';
import { NotificacionListRequest } from 'src/app/shared/models/notificacion';
import { datat } from 'src/app/shared/models/datat';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss'],
})
export class NotificacionComponent  implements OnInit {

  formNotificacionFiltros!: FormGroup;
  datosUsuario: Authorize = {};
  flAdmin: boolean = false;

  numeroPagina = 1;
  numeroRegistros = 5;

  currentPage = 0;
  totalPages: number[] = [];
  numeroTotalPages: number = 0;
  totalCount: number = 0;

  dataCabecera: Array<datat> = [
    {
      titulo: 'Fecha solicitud',
      campo: 'fechaSolicitud',
      tipo: 'date',
      visible: true,
    },
    { titulo: 'Cliente', campo: 'nombreCliente', tipo: 'text', visible: true },
    { titulo: 'Doctor', campo: 'nombreDoctor', tipo: 'text', visible: true },
    { titulo: 'Mascota', campo: 'nombreMascota', tipo: 'text', visible: true },
    { titulo: 'Fecha cita', campo: 'fechaCita', tipo: 'date', visible: true },
    { titulo: 'Hora cita', campo: 'horaCita', tipo: 'text', visible: true },
    { titulo: 'Estado', campo: 'estado', tipo: 'boolean', visible: true },
    { titulo: 'Acciones', campo: '', tipo: 'button', visible: false },
  ];
  dataDetalle: Array<any> = [];

  private notificacionSubscription: Subscription = new Subscription();
  constructor(
    private authorizesService: AuthorizesService,
    private notificacionService: NotificacionService,
    private maestroService: MaestroService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.cargarPametrosSistema();
  }

  createForm() {
    this.formNotificacionFiltros = this.fb.group({
      filtro: [{ value: '', disabled: false }]
    });
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
      numeroRegistros: this.numeroRegistros,
      idUsuario: idUsuario,
      fechaInicio: new Date(),
      filtro: this.formNotificacionFiltros.value.filtro
    };
    this.notificacionSubscription = this.notificacionService
      .listarNotificacion(body)
      .pipe(
        tap((response) => {
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          if (response.records) {
            this.dataDetalle = response.dataListModel;
            this.totalPages = this.maestroService.generarNumeros(
              1,
              response.dataPaginado.totalPages
            );
            this.numeroTotalPages = response.dataPaginado.totalPages;
            this.currentPage = response.dataPaginado.currentPage;
            this.totalCount = response.dataPaginado.totalCount;
          } else {
            this.dataDetalle = [];
            this.totalPages = [1];
            this.numeroTotalPages = 1;
            this.currentPage = 1;
            this.totalCount = 0;
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

}
