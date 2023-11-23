import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap, map, catchError } from 'rxjs';
import { AuthorizesService } from 'src/app/core/services/authorizes.service';
import { MaestroService } from 'src/app/core/services/maestro.service';
import { MascotaService } from 'src/app/core/services/mascota.service';
import { Authorize } from 'src/app/shared/models/authorize';
import { datat } from 'src/app/shared/models/datat';
import {
  MascotaListRequest,
  MascotaListResponse,
  MascotaRequest,
} from 'src/app/shared/models/mascota';
import {
  ParametroMaestro,
  ParametroTabla,
} from 'src/app/shared/models/parametro-maestro';
import { Select } from 'src/app/shared/models/select';
import { TablaRequest } from 'src/app/shared/models/tabla';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.scss'],
})
export class MascotaComponent implements OnInit {
  formMascotaFiltros!: FormGroup;
  formMantenimientoMascota!: FormGroup;
  listaGenero: Select[] = [];
  listaTipo: Select[] = [];
  listaCliente: Select[] = [];
  datosUsuario: Authorize = {};
  flAdmin: boolean = false;
  listaClientes: any[] = [];
  mascotaInsert: MascotaRequest = {};
  mascotaMantenimiento: MascotaListResponse = {};

  dataCabeceraMascota: Array<datat> = [
    { titulo: 'Genero', campo: 'nombreGenero', tipo: 'text', visible: true },
    { titulo: 'Tipo', campo: 'nombreTipo', tipo: 'text', visible: true },
    { titulo: 'Nombre', campo: 'nombreMascota', tipo: 'text', visible: true },
    {titulo: 'Fecha Nacimiento',campo: 'fechaNacimiento', tipo: 'date',visible: true },
    { titulo: 'Color', campo: 'colorMascota', tipo: 'text', visible: true },
    { titulo: 'Dueño', campo: 'nombreUsuario', tipo: 'text', visible: true },
    { titulo: 'Estado', campo: 'estado', tipo: 'int', visible: true },
    { titulo: 'Acciones', campo: 'estado', tipo: 'button', visible: true },
  ];
  dataDetalleMascota: Array<any> = [];

  modalAgregarMascotaVisible: boolean = false;

  numeroPagina = 1;
  numeroRegistros = 5;

  currentPage = 0;
  totalPages: number[] = [];
  numeroTotalPages: number = 0;
  totalCount: number = 0;

  modalAccionesVisible: boolean = false;
  mensaje: string = '';
  svg: string = '';
  confirmacion: boolean = false;
  tipoModal: number = 1;

  permisos:any;

  private mascotaSubscription: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private maestroService: MaestroService,
    private mascotaService: MascotaService,
    private authorizesService: AuthorizesService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.cargarPametrosSistema();
  }

  createForm() {
    this.formMascotaFiltros = this.fb.group({
      filtro: [{ value: '', disabled: false }],
      genero: [{ value: 0, disabled: false }],
      tipo: [{ value: 0, disabled: false }],
      fechaNacimiento: [{ value: '', disabled: false }],
      cliente: [{ value: '', disabled: false }],
    });
    this.formMantenimientoMascota = this.fb.group({
      idMascota: [{ value: 0, disabled: false }],
      idGeneroMascota: [{ value: '', disabled: false }, [Validators.required]],
      idTipoMascota: [{ value: '', disabled: false }, [Validators.required]],
      nombreMascota: [{ value: '', disabled: false }, [Validators.required]],
      fechaNacimiento: [{ value: '', disabled: false }, [Validators.required]],
      colorMascota: [{ value: '', disabled: false }, [Validators.required]],
      idUsuario: [{ value: 0, disabled: false }],
      estado: [{ value: 4, disabled: false }],
      creaUsuario: [{ value: '', disabled: false }],
      modificaUsuario: [{ value: '', disabled: false }],
      flag: [{ value: 0, disabled: false }],
    });
  }

  cargarPametrosSistema() {
    this.validarTipoUsuario();
    this.mostrarGeneroMascota();
    this.mostrarTipoMascota();
  }

  mostrarGeneroMascota() {
    const id = ParametroMaestro.generoMascota;
    this.mascotaSubscription = this.maestroService
      .listarMaestro(id)
      .pipe(
        tap((response) => {
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          this.listaGenero = response.dataListModel;
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
  mostrarTipoMascota() {
    const id = ParametroMaestro.tipoMascota;
    this.mascotaSubscription = this.maestroService
      .listarMaestro(id)
      .pipe(
        tap((response) => {
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          this.listaTipo = response.dataListModel;
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

  validarTipoUsuario() {
    this.datosUsuario = this.authorizesService.obtenerUsuarioAutentificacion();
    const permisoPagina = JSON.parse(this.authorizesService.obtenerMenu());
    this.permisos = permisoPagina[2].usuarioAccesoHijo[0];
    const id = ParametroMaestro.validarAdministrador;
    this.mascotaSubscription = this.maestroService
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
          this.mostrarClientes();
          this.listarMascota(1);
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
    this.mascotaSubscription = this.maestroService
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

  obtenerDatosCombo(tipo: number, event: any) {
    console.log(event);
    switch (tipo) {
      case 1:
        //Genero
        this.formMascotaFiltros.get('genero')?.setValue(event.idMaestro);
        break;
      case 2:
        //Tipo
        this.formMascotaFiltros.get('tipo')?.setValue(event.idMaestro);
        break;
      case 3:
        //Cliente
        this.formMascotaFiltros.get('cliente')?.setValue(event.idMaestro);
        break;
      case 4:
        //GeneroModal
        this.formMantenimientoMascota
          .get('idGeneroMascota')
          ?.setValue(event.idMaestro);
        break;
      case 5:
        //TipoModal
        this.formMantenimientoMascota
          .get('idTipoMascota')
          ?.setValue(event.idMaestro);
        break;
      case 6:
        //ClienteModal
        this.formMantenimientoMascota
          .get('idUsuario')
          ?.setValue(event.idMaestro);
        break;
      default:
        break;
    }
  }

  listarMascota(numeroPagina: number) {
  //  console.log(this.flAdmin);
    let idCliente;
    if (this.formMascotaFiltros.value.cliente == 0 && this.flAdmin) {
      idCliente = 0;
    } else if (this.formMascotaFiltros.value.cliente > 0 && this.flAdmin) {
      idCliente = this.formMascotaFiltros.value.cliente;
    } else {
      idCliente = this.datosUsuario.idUsuario!;
    }
    let body: MascotaListRequest = {
      numeroPagina: numeroPagina,
      numeroRegistros: this.numeroRegistros,
      idGenero: this.formMascotaFiltros.value.genero,
      idTipo: this.formMascotaFiltros.value.tipo,
      fechaNacimiento: this.formMascotaFiltros.value.fechaNacimiento,
      // idCliente: this.flAdmin ? 0 : this.datosUsuario.idUsuario,
      idCliente: idCliente,
      filtro: this.formMascotaFiltros.value.filtro,
    };
    this.mascotaSubscription = this.mascotaService
      .listarMascota(body)
      .pipe(
        tap((response) => {
         // console.log(response)
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          if (response.records) {
            this.dataDetalleMascota = response.dataListModel;
            this.totalPages = this.maestroService.generarNumeros(
              1,
              response.dataPaginado.totalPages
            );
            this.numeroTotalPages = response.dataPaginado.totalPages;
            this.currentPage = response.dataPaginado.currentPage;
            this.totalCount = response.dataPaginado.totalCount;
          }else{
            this.dataDetalleMascota = [];
            this.totalPages = [1]
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
  mostrarAgregarMascota() {
    this.tipoModal = 1;
    this.limpiarModal();
    this.modalAgregarMascotaVisible = true;
  }
  preAgregarMascota() {
    this.mascotaInsert = {
      idMascota: this.formMantenimientoMascota.get('idMascota')!.value,
      idGeneroMascota:
        this.formMantenimientoMascota.get('idGeneroMascota')!.value,
      idTipoMascota: this.formMantenimientoMascota.get('idTipoMascota')!.value,
      nombreMascota: this.formMantenimientoMascota.get('nombreMascota')!.value,
      fechaNacimiento:
        this.formMantenimientoMascota.get('fechaNacimiento')!.value,
      colorMascota: this.formMantenimientoMascota.get('colorMascota')!.value,
      idUsuario: this.flAdmin
        ? this.formMantenimientoMascota.get('idUsuario')!.value
        : this.datosUsuario.idUsuario,
      estado: 4,
      creaUsuario: this.datosUsuario.login,
      modificaUsuario: this.datosUsuario.login,
      flag: this.tipoModal,
    };
    this.agregarMascota(this.mascotaInsert);
  }
  agregarMascota(mascotaRequest: MascotaRequest) {
    this.mascotaSubscription = this.mascotaService
      .mantenimientoMascota(mascotaRequest)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.modalRespuesta(
              'assets/svg/circle-check-solid.svg',
              response.dataModel.mensaje
            );
            this.modalAgregarMascotaVisible = false;
            this.listarMascota(this.currentPage);
            this.limpiarModal();
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
  verMascota(item: any) {
    this.tipoModal = 4;
    this.mascotaMantenimiento = item;
    this.formMantenimientoMascota.patchValue(item);
    this.modalAgregarMascotaVisible = true;
  }
  editarMascota(item: any) {
    this.tipoModal = 2;
    this.mascotaMantenimiento = item;
    this.formMantenimientoMascota.patchValue(item);
    this.modalAgregarMascotaVisible = true;
  }
  confirmacionMascota(item: any) {
    this.tipoModal = 3;
    this.confirmacion = true;
    this.mascotaMantenimiento = item;
    this.formMantenimientoMascota.patchValue(item);
    this.modalRespuesta(
      'assets/svg/circle-info-solid.svg',
      '¿Está seguro de eliminar la mascota “' + item.nombreMascota + '”?'
    );
    console.log(item, 'eliminar');
  }
  eliminarMascota(event: any) {
    if (event) {
      this.confirmacion = false;
      this.preAgregarMascota();
    } else {
      this.modalAccionesVisible = false;
    }
  }

  modalRespuesta(svg: string, mensaje: string) {
    this.svg = svg;
    this.mensaje = mensaje;
    this.modalAccionesVisible = true;
  }

  limpiarModal() {
    this.mascotaMantenimiento = {
      idMascota: 0,
      idGeneroMascota: 0,
      nombreGenero: 'Seleccionar',
      idTipoMascota: 0,
      nombreTipo: 'Seleccionar',
      nombreMascota: '',
      idUsuario: 0,
      nombreUsuario: 'Seleccionar',
      colorMascota: '',
      //estado: 4,
    };
 
    this.formMantenimientoMascota.reset();
    this.formMantenimientoMascota.markAsUntouched();
  }

}
