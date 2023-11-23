import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, tap, map, catchError } from 'rxjs';
import { AccesoService } from 'src/app/core/services/acceso.service';
import { AuthorizesService } from 'src/app/core/services/authorizes.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MaestroService } from 'src/app/core/services/maestro.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import {
  Authorize,
  MantenimientoAccesoRequest,
} from 'src/app/shared/models/authorize';
import { datat } from 'src/app/shared/models/datat';
import {
  MenuListaHijo,
  MenuListaPadre,
  MenuRequest,
} from 'src/app/shared/models/menu';

import {
  ParametroMaestro,
  ParametroTabla,
} from 'src/app/shared/models/parametro-maestro';
import { Select } from 'src/app/shared/models/select';
import { TablaRequest } from 'src/app/shared/models/tabla';
import {
  UsuarioListRequest,
  UsuarioListResponse,
  UsuarioRequest,
} from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  formUsuariosFiltros!: FormGroup;
  formMantenimientoUsuario!: FormGroup;

  datosUsuario: Authorize = {};
  usuarioInsert: UsuarioRequest = {};
  usuarioMantenimiento: UsuarioListResponse = {};

  listaTipoDocumento: Select[] = [];
  listaTipoUsuario: Select[] = [];

  modalUsuarioVisible: boolean = false;
  modalAccesoVisible: boolean = false;

  numeroPagina = 1;
  numeroRegistros = 5;

  dataCabeceraUsuario: Array<datat> = [
    {
      titulo: 'Nombre completo',
      campo: 'nombreUsuario',
      tipo: 'text',
      visible: true,
    },
    {
      titulo: 'Tipo documento',
      campo: 'nombreTipoDocumento',
      tipo: 'text',
      visible: true,
    },
    {
      titulo: 'Nro documento',
      campo: 'nroDocumento',
      tipo: 'text',
      visible: true,
    },
    {
      titulo: 'Tipo usuario',
      campo: 'nombreTipoUsuario',
      tipo: 'text',
      visible: true,
    },
    { titulo: 'Correo', campo: 'correo', tipo: 'text', visible: true },
    { titulo: 'Estado', campo: 'estado', tipo: 'int', visible: true },
    { titulo: 'Acciones', campo: 'estado', tipo: 'button', visible: true },
  ];
  dataDetalleUsuario: Array<any> = [];

  currentPage = 0;
  totalPages: number[] = [];
  numeroTotalPages: number = 0;
  totalCount: number = 0;

  modalAccionesVisible: boolean = false;
  mensaje: string = '';
  svg: string = '';
  confirmacion: boolean = false;
  tipoModal: number = 1;

  //permisos del usuario
  permisos: any;
  //informacion del usuario

  listMenuAcceso: MenuListaPadre[] = [];
  seleccionMenuHijo: MenuListaHijo[] = [];
  mantenimientoAcceso: MantenimientoAccesoRequest[] = [];

  idUsuarioSeleccionado: number = 0;

  private usuarioSubscription: Subscription = new Subscription();
  constructor(
    private maestroService: MaestroService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private authorizesService: AuthorizesService,
    private loginService: LoginService,
    private accesoService: AccesoService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.cargarPametrosSistema();
    this.listarUsuario(1);
  }

  createForm() {
    this.formUsuariosFiltros = this.fb.group({
      idTipoDocumento: [{ value: 0, disabled: false }],
      nroDocumento: [{ value: '', disabled: false }],
      idTipoUsuario: [{ value: 0, disabled: false }],
      filtro: [{ value: '', disabled: false }],
    });
    this.formMantenimientoUsuario = this.fb.group({
      idUsuario: [{ value: 0, disabled: false }],
      idTipoDocumento: [{ value: 0, disabled: false }, [Validators.required]],
      idTipoUsuario: [{ value: 0, disabled: false }, [Validators.required]],
      nombreUsuario: [{ value: '', disabled: false }, [Validators.required]],
      login: [{ value: '', disabled: false }, [Validators.required]],
      nroDocumento: [{ value: '', disabled: false }, [Validators.required]],
      clave: [{ value: '', disabled: false }],
      correo: [{ value: '', disabled: false }, [Validators.required]],
      estado: [{ value: 0, disabled: false }],
      creaUsuario: [{ value: '', disabled: false }],
      modificaUsuario: [{ value: '', disabled: false }],
      flag: [{ value: 0, disabled: false }],
    });
  }

  cargarPametrosSistema() {
    this.mostrarTipoDocumento();
    this.mostrarTipoUsuario();
    this.datosUsuario = this.authorizesService.obtenerUsuarioAutentificacion();
    const permisoPagina = JSON.parse(this.authorizesService.obtenerMenu());
    this.permisos = permisoPagina[3].usuarioAccesoHijo[0];
  }
  mostrarTipoDocumento() {
    const id = ParametroMaestro.tipoDocumento;
    this.usuarioSubscription = this.maestroService
      .listarMaestro(id)
      .pipe(
        tap((response) => {
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          this.listaTipoDocumento = response.dataListModel;
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
  mostrarTipoUsuario() {
    const id = ParametroTabla.tipoUsuario;
    let body: TablaRequest = {
      tabla: id,
      id: 0,
    };
    this.usuarioSubscription = this.maestroService
      .listarTabla(body)
      .pipe(
        tap((response) => {
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          this.listaTipoUsuario = response.dataListModel;
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
  listarUsuario(numeroPagina: number) {
    let body: UsuarioListRequest = {
      numeroPagina: numeroPagina,
      numeroRegistros: this.numeroRegistros,
      idTipoDocumento: this.formUsuariosFiltros.value.idTipoDocumento,
      nroDocumento: this.formUsuariosFiltros.value.nroDocumento,
      idTipoUsuario: this.formUsuariosFiltros.value.idTipoUsuario,
      filtro: this.formUsuariosFiltros.value.filtro,
      idUsuarioLogueado:this.datosUsuario.idUsuario
    };
    this.usuarioSubscription = this.usuarioService
      .listarUsuario(body)
      .pipe(
        tap((response) => {
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          if (response.records) {
            this.dataDetalleUsuario = response.dataListModel;
            this.totalPages = this.maestroService.generarNumeros(
              1,
              response.dataPaginado.totalPages
            );
            this.numeroTotalPages = response.dataPaginado.totalPages;
            this.currentPage = response.dataPaginado.currentPage;
            this.totalCount = response.dataPaginado.totalCount;
          } else {
            this.dataDetalleUsuario = [];
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
  mostrarAgregarUsuario() {
    this.tipoModal = 1;
    this.limpiarModal();
    this.modalUsuarioVisible = true;
  }
  preAgregarUsuario() {
    this.usuarioInsert = {
      idUsuario: this.formMantenimientoUsuario.get('idUsuario')!.value,
      idTipoDocumento:
        this.formMantenimientoUsuario.get('idTipoDocumento')!.value,
      idTipoUsuario: this.formMantenimientoUsuario.get('idTipoUsuario')!.value,
      nombreUsuario: this.formMantenimientoUsuario.get('nombreUsuario')!.value,
   //   login: this.formMantenimientoUsuario.get('login')!.value,
      nroDocumento: this.formMantenimientoUsuario.get('nroDocumento')!.value,
      clave: this.formMantenimientoUsuario.get('clave')!.value,
      correo: this.formMantenimientoUsuario.get('correo')!.value,
      estado: 4,
      creaUsuario: this.datosUsuario.login,
      modificaUsuario: this.datosUsuario.login,
      flag: this.tipoModal,
    };
    this.agregarUsuario(this.usuarioInsert);
  }
  agregarUsuario(usuarioRequest: UsuarioRequest) {
    this.usuarioSubscription = this.usuarioService
      .mantenimientoUsuario(usuarioRequest)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.modalRespuesta(
              'assets/svg/circle-check-solid.svg',
              response.dataModel.mensaje
            );
            this.modalUsuarioVisible = false;
            this.listarUsuario(this.currentPage);
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
  verUsuario(item: any) {
    this.tipoModal = 4;
    this.usuarioMantenimiento = item;
    this.formMantenimientoUsuario.patchValue(item);
    this.modalUsuarioVisible = true;
  }
  editarUsuario(item: any) {
    this.tipoModal = 2;
    this.usuarioMantenimiento = item;
    this.formMantenimientoUsuario.patchValue(item);
    this.formMantenimientoUsuario.patchValue({
      clave: '',
    });
    this.modalUsuarioVisible = true;
  }
  confirmacionUsuario(item: any) {
    this.tipoModal = 3;
    this.confirmacion = true;
    this.usuarioMantenimiento = item;
    this.formMantenimientoUsuario.patchValue(item);
    this.formMantenimientoUsuario.patchValue({
      clave: '',
    });
    this.modalRespuesta(
      'assets/svg/circle-info-solid.svg',
      '¿Está seguro de eliminar el usuario “' + item.nombreUsuario + '”?'
    );
  }
  eliminarUsuario(event: any) {
    if (event) {
      this.confirmacion = false;
      this.preAgregarUsuario();
    } else {
      this.modalAccionesVisible = false;
    }
  }

  accesoUsuario(item: any) {
    this.modalAccesoVisible = true;
    this.seleccionMenuHijo = [];
    this.mostrarListaMenu(item.idUsuario, item.idTipoUsuario);
  }
  modalRespuesta(svg: string, mensaje: string) {
    this.svg = svg;
    this.mensaje = mensaje;
    this.modalAccionesVisible = true;
  }
  limpiarModal() {
    this.usuarioMantenimiento = {
      idUsuario: 0,
      idTipoDocumento: 0,
      nombreTipoDocumento: 'Seleccionar',
      idTipoUsuario: 0,
      nombreTipoUsuario: 'Seleccionar',
      nombreUsuario: '',
      //login: '',
      nroDocumento: '',
      correo: '',
      estado: false,
    };
    this.formMantenimientoUsuario.reset();
    this.formMantenimientoUsuario.markAsUntouched();
  }
  mostrarListaMenu(idUsuario: number, idTipoUsuario:number) {
    this.idUsuarioSeleccionado = idUsuario;
    let body: MenuRequest = {
      idUsuario: idUsuario,
    };
    this.usuarioSubscription = this.loginService
      .listarMenu(body)
      .pipe(
        tap((response) => {
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          this.listMenuAcceso = response.dataListModel;
          this.listMenuAcceso.splice(idTipoUsuario !=2? 4:3);
          console.log(this.listMenuAcceso)
        }),
        map((response) => {
          // Código que transforma la respuesta del servicio
        }),
        catchError((error) => {
          // Código que maneja el error si se produce uno
          console.log(error, 'error');
          throw error;
        })
      )
      .subscribe();
  }
  obtenerMenuHijo(listaHijo: MenuListaHijo[]) {
    this.seleccionMenuHijo = listaHijo;
  }
  registrarAcceso() {
    this.listMenuAcceso.forEach((e) => {
      this.mantenimientoAcceso.push({
        idUsuario: this.idUsuarioSeleccionado,
        idMenu: e.idMenu,
        ver: false,
        registrar: false,
        actualizar: false,
        eliminar: false,
        procesar:false,
        acceso: e.acceso,
        creaUsuario: this.datosUsuario.login,
        modificaUsuario: this.datosUsuario.login,
        usuarioAccesoHijo: e.usuarioAccesoHijo,
      });
    });

    this.usuarioSubscription = this.accesoService
      .mantenimientoAcceso(this.mantenimientoAcceso)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.modalRespuesta(
              'assets/svg/circle-check-solid.svg',
              response.dataModel.mensaje
            );
            this.modalAccesoVisible = false;
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
