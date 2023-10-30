import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizesService } from 'src/app/core/services/authorizes.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Authorize } from 'src/app/shared/models/authorize';
import { Select } from 'src/app/shared/models/select';
import {
  UsuarioFindRequest,
  UsuarioListResponse,
  UsuarioRequest,
} from 'src/app/shared/models/usuario';
import { Subscription, tap, map, catchError } from 'rxjs';
import { ParametroMaestro } from 'src/app/shared/models/parametro-maestro';
import { MaestroService } from 'src/app/core/services/maestro.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  datosUsuario: Authorize = {};
  formMantenimientoUsuario!: FormGroup;
  usuarioMantenimiento: UsuarioListResponse = {};

  listaTipoDocumento: Select[] = [];

  modalAccionesVisible: boolean = false;
  mensaje: string = '';
  svg: string = '';
  confirmacion: boolean = false;

  private perfilSubscription: Subscription = new Subscription();
  constructor(
    private authorizesService: AuthorizesService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private maestroService: MaestroService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.cargarParametros();
  }

  createForm() {
    this.formMantenimientoUsuario = this.fb.group({
      idUsuario: [{ value: 0, disabled: false }],
      idTipoDocumento: [{ value: 0, disabled: false }, [Validators.required]],
      idTipoUsuario: [{ value: 0, disabled: false }],
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

  cargarParametros() {
    this.datosUsuario = this.authorizesService.obtenerUsuarioAutentificacion();
    this.mostrarTipoDocumento();
    this.obtenerDatosUsuario();
  }

  mostrarTipoDocumento() {
    const id = ParametroMaestro.tipoDocumento;
    this.perfilSubscription = this.maestroService
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

  // actualizarUsuario(){
  //   this.modalRespuesta(
  //     'assets/svg/circle-check-solid.svg',
  //     "Se actualizó datos correctamente."
  //   );
  // }

  modalRespuesta(svg: string, mensaje: string) {
    this.svg = svg;
    this.mensaje = mensaje;
    this.modalAccionesVisible = true;
  }
  obtenerDatosUsuario() {
    let body: UsuarioFindRequest = {
      idUsuario: this.datosUsuario.idUsuario,
    };
    this.perfilSubscription = this.usuarioService
      .buscarUsuario(body)
      .pipe(
        tap((response) => {
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          this.usuarioMantenimiento = response.dataModel;
          this.formMantenimientoUsuario.patchValue(this.usuarioMantenimiento);
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
  actualizarUsuario() {
    let body: UsuarioRequest = {
      idUsuario: this.formMantenimientoUsuario.get('idUsuario')!.value,
      idTipoDocumento:
        this.formMantenimientoUsuario.get('idTipoDocumento')!.value,
      idTipoUsuario: this.formMantenimientoUsuario.get('idTipoUsuario')!.value,
      nombreUsuario: this.formMantenimientoUsuario.get('nombreUsuario')!.value,
      login: this.formMantenimientoUsuario.get('login')!.value,
      nroDocumento: this.formMantenimientoUsuario.get('nroDocumento')!.value,
      clave: this.formMantenimientoUsuario.get('clave')!.value,
      correo: this.formMantenimientoUsuario.get('correo')!.value,
      estado: true,
      creaUsuario: this.datosUsuario.login,
      modificaUsuario: this.datosUsuario.login,
      flag: 2,
    };

    this.perfilSubscription = this.usuarioService
      .mantenimientoUsuario(body)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.modalRespuesta(
              'assets/svg/circle-check-solid.svg',
              response.dataModel.mensaje
            );
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
