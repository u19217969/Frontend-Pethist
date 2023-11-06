import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select } from 'src/app/shared/models/select';
import { Subscription, tap, map, catchError } from 'rxjs';
import { ParametroMaestro } from 'src/app/shared/models/parametro-maestro';
import { MaestroService } from 'src/app/core/services/maestro.service';
import { UsuarioRequest } from 'src/app/shared/models/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizesService } from 'src/app/core/services/authorizes.service';
import { Authorize } from 'src/app/shared/models/authorize';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss'],
})
export class RegistrarUsuarioComponent implements OnInit {
  listaTipoDocumento: Select[] = [];
  formMantenimientoUsuario!: FormGroup;
  datosUsuario: Authorize = {};

  modalAccionesVisible: boolean = false;
  mensaje: string = '';
  svg: string = '';
  confirmacion: boolean = false;
  routerLink: string = '';
  flNroDocumento: boolean = true;
  lengthNroDocumento: number = 0;

  private usuarioSubscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private maestroService: MaestroService,
    private fb: FormBuilder,
    private authorizesService: AuthorizesService,
    private usuarioService: UsuarioService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.cargarPametrosSistema();
    this.datosUsuario = this.authorizesService.obtenerUsuarioAutentificacion();
  }

  createForm() {
    this.formMantenimientoUsuario = this.fb.group({
      idUsuario: [{ value: 0, disabled: false }],
      idTipoDocumento: [{ value: '', disabled: false }, [Validators.required]],
      idTipoUsuario: [{ value: 0, disabled: false }],
      nombreUsuario: [{ value: '', disabled: false }, [Validators.required,Validators.minLength(5),Validators.maxLength(255)]],
      login: [{ value: '', disabled: false }],
      nroDocumento: [{ value: '', disabled: false }, [Validators.required]],
      clave: [{ value: '', disabled: false }, [Validators.required,Validators.minLength(8),Validators.maxLength(25)]],
      correo: [{ value: '', disabled: false }, [Validators.required,Validators.email,Validators.maxLength(50)]],
      estado: [{ value: 0, disabled: false }],
      creaUsuario: [{ value: '', disabled: false }],
      modificaUsuario: [{ value: '', disabled: false }],
      flag: [{ value: 0, disabled: false }],
    });
  }

  cargarPametrosSistema() {
    this.mostrarTipoDocumento();
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

  agregarUsuario() {
    let body: UsuarioRequest = {
      idUsuario: this.formMantenimientoUsuario.get('idUsuario')!.value,
      idTipoDocumento:
        this.formMantenimientoUsuario.get('idTipoDocumento')!.value,
      idTipoUsuario: this.formMantenimientoUsuario.get('idTipoUsuario')!.value,
      nombreUsuario: this.formMantenimientoUsuario.get('nombreUsuario')!.value,
      //login: this.formMantenimientoUsuario.get('login')!.value,
      nroDocumento: this.formMantenimientoUsuario.get('nroDocumento')!.value,
      clave: this.formMantenimientoUsuario.get('clave')!.value,
      correo: this.formMantenimientoUsuario.get('correo')!.value,
      estado: true,
      creaUsuario: this.datosUsuario.login,
      modificaUsuario: this.datosUsuario.login,
      flag: 1,
    };
    this.usuarioSubscription = this.usuarioService
      .mantenimientoUsuario(body)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.routerLink = '/login';
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

  modalRespuesta(svg: string, mensaje: string) {
    this.svg = svg;
    this.mensaje = mensaje;
    this.modalAccionesVisible = true;
  }

  async redireccionar(ruta: any) {
    try {
      await this.router.navigateByUrl(ruta, { replaceUrl: true });
    } catch (error) {}
  }
  changeTipoDocumento(event: any) {
    this.formMantenimientoUsuario
      .get('idTipoDocumento')
      ?.setValue(event.idMaestro);
    this.flNroDocumento = false;
    console.log(event);
    if (event.nombreMaestro == 'DNI') {
      this.lengthNroDocumento = 8;
      this.formMantenimientoUsuario
        .get('nroDocumento')!
        .setValidators([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ]);
    }
    if (event.nombreMaestro == 'CE') {
      this.lengthNroDocumento = 11;
      this.formMantenimientoUsuario
        .get('nroDocumento')!
        .setValidators([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]);
    }
  }
}
