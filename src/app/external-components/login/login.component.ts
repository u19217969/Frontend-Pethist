import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { LoginRequest } from 'src/app/shared/models/login';
import { Subscription, tap, map, catchError } from 'rxjs';
import { AuthorizesService } from 'src/app/core/services/authorizes.service';
import { MenuRequest } from 'src/app/shared/models/menu';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Authorize } from 'src/app/shared/models/authorize';
import { Router } from '@angular/router';
// import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // standalone: true,
  // imports: [IonicModule]
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  datosUsuario: Authorize = {};
  mensaje: string = '';
  svg: string = '';
  confirmacion: boolean = false;
  modalAccionesVisible: boolean = false;

  private loginSubscription: Subscription = new Subscription();
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authorizesService: AuthorizesService,
    private permisoService: PermisoService,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.formLogin = this.fb.group({
      email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
      password: [{ value: '', disabled: false }, [Validators.required]],
    });
  }

  async ingresar() {
    if (this.formLogin.valid) {
      let body: LoginRequest = {
        email: this.formLogin.value.email,
        password: this.formLogin.value.password,
      };
      this.loginSubscription = this.loginService
        .iniciarSesion(body)
        .pipe(
          tap((response) => {
            // Código que se ejecuta cuando se recibe la respuesta del servicio
            this.datosUsuario =
              this.authorizesService.obtenerUsuarioAutentificacion();
            this.mostrarListaMenu(this.datosUsuario.idUsuario!);
          }),
          map((response) => {
            // Código que transforma la respuesta del servicio
            //return response;
          }),
          catchError((error) => {
            // Código que maneja el error si se produce uno
            this.modalRespuesta(
              'assets/svg/circle-xmark-solid.svg',
              'Correo o contraseña incorrecta. '
            );
            throw error;
          })
        )
        .subscribe();
    }else{
      if (this.formLogin.get('email')!.hasError('required')){
        this.modalRespuesta(
          'assets/svg/circle-info-solid.svg',
          'Debe ingresar un correo válido. '
        );
        return;
      }
      if (this.formLogin.get('email')!.hasError('email')){
        this.modalRespuesta(
          'assets/svg/circle-info-solid.svg',
          'Debe ingresar un correo válido. '
        );
        return;
      }
      if (this.formLogin.get('password')!.hasError('required')) {
        this.modalRespuesta(
          'assets/svg/circle-info-solid.svg',
          'Por favor, ingrese su contraseña.'
        );
        return;
      }

    }
  }
  async mostrarListaMenu(idUsuario: number) {
    if (this.formLogin.valid) {
      let body: MenuRequest = {
        idUsuario: idUsuario,
      };
      this.loginSubscription = this.loginService
        .listarMenu(body)
        .pipe(
          tap((response) => {
            console.log(response)
            // Código que se ejecuta cuando se recibe la respuesta del servicio
            if (response.success) {
              this.authorizesService.grabarMenu(
                JSON.stringify(response.dataListModel)
              );
              this.authorizesService.redireccionarHome();
              this.permisoService.permisosConcedido();
            } else {
              alert(response.message);
            }
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
  }
  async redireccionar(ruta:any) {
    try {
      await this.router.navigateByUrl(ruta, { replaceUrl: true });
    } catch (error) {
    }
  }
  modalRespuesta(svg: string, mensaje: string) {
    this.svg = svg;
    this.mensaje = mensaje;
    this.modalAccionesVisible = true;
  }



  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      //this.createForm();
      this.ingresar();
    }
  }

 
}
