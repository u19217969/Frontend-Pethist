import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Subscription, tap, map, catchError } from 'rxjs';
import { AuthorizesService } from 'src/app/core/services/authorizes.service';
import { CitaService } from 'src/app/core/services/cita.service';
import { MaestroService } from 'src/app/core/services/maestro.service';
import { Authorize } from 'src/app/shared/models/authorize';
import {
  CitaListRequest,
  CitaListResponse,
  CitaRequest,
} from 'src/app/shared/models/cita';
import { datat } from 'src/app/shared/models/datat';
import {
  ParametroMaestro,
  ParametroTabla,
} from 'src/app/shared/models/parametro-maestro';
import { Select } from 'src/app/shared/models/select';
import { TablaRequest } from 'src/app/shared/models/tabla';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss'],
})
export class CitaComponent implements OnInit {
  formCitaFiltros!: FormGroup;
  listaCliente: Select[] = [];
  listaMascota: Select[] = [];
  listaDoctor: Select[] = [];

  //tabla
  dataCabeceraMascota: Array<datat> = [
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
    { titulo: 'Estado', campo: 'estado', tipo: 'int', visible: true },
    { titulo: 'Acciones', campo: 'estado', tipo: 'button', visible: true },
  ];
  dataDetalleCita: Array<any> = [];
  datosUsuario: Authorize = {};
  flAdmin: boolean = false;

  numeroPagina = 1;
  numeroRegistros = 5;

  currentPage = 0;
  totalPages: number[] = [];
  numeroTotalPages: number = 0;
  totalCount: number = 0;

  modalAccionesVisible: boolean = false;
  redireccionarMascota: string = '';
  mensaje: string = '';
  svg: string = '';
  confirmacion: boolean = false;
  tipoModal: number = 1;
  modalCitaVisible: boolean = false;
  citaMantenimiento: CitaListResponse = {
    fechaCita: '',
  };
  permisos: any;
  private citaSubscription: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authorizesService: AuthorizesService,
    private maestroService: MaestroService,
    private citaService: CitaService
  ) {
    this.createForm();
  }
  ngOnInit() {
    this.cargarPametrosSistema();
    this.mostrarMascota();
  }

  createForm() {
    this.formCitaFiltros = this.fb.group({
      filtro: [{ value: '', disabled: false }],
      fechaCita: [{ value: '', disabled: false }],
      idCliente: [{ value: 0, disabled: false }],
      idMascota: [{ value: 0, disabled: false }],
    });
  }

  cargarPametrosSistema() {
    this.validarTipoUsuario();
  }

  validarTipoUsuario() {
    this.datosUsuario = this.authorizesService.obtenerUsuarioAutentificacion();
    const permisoPagina = JSON.parse(this.authorizesService.obtenerMenu());
    this.permisos = permisoPagina[1].usuarioAccesoHijo[0];
    const id = ParametroMaestro.validarAdministrador;
    this.citaSubscription = this.maestroService
      .listarMaestro(id)
      .pipe(
        tap((response) => {
          // console.log(response);
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          let dataMaestra = response.dataListModel[0].nombreMaestro
            .toString()
            .split(',');

          let dataUsuario = this.datosUsuario.nombreTipo!;
          //console.log('Nombre de tipo: ' + dataUsuario);
          if (dataMaestra.includes(dataUsuario)) {
            this.flAdmin = true;
          } else {
            this.flAdmin = false;
          }

          this.mostrarClientes();
          this.listarCita(1);
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

  mostrarClientes() {
    const id = ParametroTabla.usuarios;
    let body: TablaRequest = {
      tabla: id,
      id: this.flAdmin ? 0 : this.datosUsuario.idUsuario,
    };
    this.citaSubscription = this.maestroService
      .listarTabla(body)
      .pipe(
        tap((response) => {
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          this.listaCliente = response.dataListModel;
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

  mostrarMascota() {
    const id = ParametroTabla.mascotaxUsuario;
    let body: TablaRequest = {
      tabla: id,
      id: this.datosUsuario.idUsuario,
    };
    this.citaSubscription = this.maestroService
      .listarTabla(body)
      .pipe(
        tap((response) => {
          console.log(response)
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          this.listaMascota = response.dataListModel;
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

  listarCita(numeroPagina: number) {
    let idCliente;
    if (this.formCitaFiltros.value.idCliente == 0 && this.flAdmin) {
      idCliente = 0;
    } else if (this.formCitaFiltros.value.idCliente > 0 && this.flAdmin) {
      idCliente = this.formCitaFiltros.value.idCliente;
    } else {
      idCliente = this.datosUsuario.idUsuario!;
    }

    let body: CitaListRequest = {
      numeroPagina: numeroPagina,
      numeroRegistros: this.numeroRegistros,
      fechaCita: this.formCitaFiltros.value.fechaCita,
      idCliente: idCliente,
      idMascota: this.formCitaFiltros.value.idMascota,
      filtro: this.formCitaFiltros.value.filtro,
    };
    this.citaSubscription = this.citaService
      .listarCita(body)
      .pipe(
        tap((response) => {
           console.log(response)
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          if (response.records) {
            this.dataDetalleCita = response.dataListModel;
            this.totalPages = this.maestroService.generarNumeros(
              1,
              response.dataPaginado.totalPages
            );
            this.numeroTotalPages = response.dataPaginado.totalPages;
            this.currentPage = response.dataPaginado.currentPage;
            this.totalCount = response.dataPaginado.totalCount;
          } else {
            this.dataDetalleCita = [];
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
  verCita(item: any) {
    this.tipoModal = 4;
    this.citaMantenimiento = item;
    this.modalCitaVisible = true;
    console.log(item);
  }
  confirmacionCita(item: any) {
    console.log(item, 'confirmacion');
    this.tipoModal = 3;
    this.confirmacion = true;
    this.citaMantenimiento = item;
    console.log('data: ' + this.datosUsuario.nombreTipo);
    this.modalRespuesta(
      'assets/svg/circle-info-solid.svg',
      '¿Está seguro de cancelar la cita de  “' + item.nombreMascota + '”?'
    );
  }
  eliminarCita(event: any) {
    if (event) {
      this.confirmacion = false;
      this.preCita();
    } else {
      this.modalAccionesVisible = false;
    }
  }

  citaCulminada(item: any) {
    console.log(item, 'culminar cita');
    this.citaMantenimiento = item;
    let body: CitaRequest = {
      idCita: this.citaMantenimiento.idCita,
      idDoctor: this.citaMantenimiento.idDoctor,
      idMascota: this.citaMantenimiento.idMascota,
      fechaCita: new Date(),
      horaCita: this.citaMantenimiento.horaCita,
      motivo: this.citaMantenimiento.motivo,
      observacion: '',
      idEstadoCita: 1,
      estado: 3,
      creaUsuario: this.datosUsuario.login,
      modificaUsuario: this.datosUsuario.login,
      flag: this.tipoModal,
      idUser: (this.flAdmin?  this.citaMantenimiento.idCliente:this.datosUsuario.idUsuario)
    };

    this.citaSubscription = this.citaService
      .mantenimientoCita(body)
      .pipe(
        tap((response) => {
          this.confirmacion = false;
          if (response.success) {
            this.modalRespuesta(
              'assets/svg/circle-check-solid.svg',
              response.dataModel.mensaje
            );
            this.modalCitaVisible = false;
            this.listarCita(this.currentPage);
          } else {
            this.modalRespuesta(
              'assets/svg/circle-xmark-solid.svg',
              response.message
            );
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

  modalRespuesta(svg: string, mensaje: string) {
    this.svg = svg;
    this.mensaje = mensaje;
    this.modalAccionesVisible = true;
  }

  async redireccionar(ruta: any) {
    // console.log(this.totalCount)
    if (this.listaMascota.length == 0) {
      this.redireccionarMascota = '/control/mascotas';
      this.modalRespuesta(
        'assets/svg/circle-info-solid.svg',
        'No puede reservar cita si no tiene al menos una mascota registrada.'
      );
      return;
    }
    try {
      await this.router.navigateByUrl(ruta, { replaceUrl: true });
    } catch (error) {
      console.log(error);
    }
  }

  preCita() {
    let body: CitaRequest = {
      idCita: this.citaMantenimiento.idCita,
      idDoctor: this.citaMantenimiento.idDoctor,
      idMascota: this.citaMantenimiento.idMascota,
      fechaCita: new Date(),
      horaCita: this.citaMantenimiento.horaCita,
      motivo: this.citaMantenimiento.motivo,
      observacion: '',
      idEstadoCita: 1,
      estado: this.datosUsuario.nombreTipo == 'Cliente' ? 1 : 2,
      creaUsuario: this.datosUsuario.login,
      modificaUsuario: this.datosUsuario.login,
      flag: this.tipoModal,
      idUser: (this.flAdmin?  this.citaMantenimiento.idCliente:this.datosUsuario.idUsuario)
    };

    this.citaSubscription = this.citaService
      .mantenimientoCita(body)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.modalRespuesta(
              'assets/svg/circle-check-solid.svg',
              response.dataModel.mensaje
            );
            this.modalCitaVisible = false;
            this.listarCita(this.currentPage);
          } else {
            this.modalRespuesta(
              'assets/svg/circle-xmark-solid.svg',
              response.message
            );
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
