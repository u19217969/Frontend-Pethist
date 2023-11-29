import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizesService } from 'src/app/core/services/authorizes.service';
import { Authorize } from 'src/app/shared/models/authorize';
import { Subscription, tap, map, catchError } from 'rxjs';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss'],
})
export class CambiarContrasenaComponent  implements OnInit {
  formPassword!: FormGroup;
  datosUsuario: Authorize = {};

  mensaje: string = '';
  svg: string = '';
  confirmacion: boolean = false;
  modalAccionesVisible: boolean = false;

  routerLink: string = '';

  private contraseniaSubscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authorizesService: AuthorizesService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      this.authorizesService.grabarToken(data['token'])
      console.log(data['token']);
      this.datosUsuario = this.authorizesService.obtenerUsuarioAutentificacion();
      console.log(this.datosUsuario);
    });
  }
  createForm() {
    this.formPassword = this.fb.group({
      contrasenia: [{ value: '', disabled: false }, [Validators.required]],
    });
  }
  async redireccionar(ruta: any) {
    try {
      await this.router.navigateByUrl(ruta, { replaceUrl: true });
    } catch (error) {}
  }
  async actualizarContrasenia() {
    console.log(this.formPassword.valid);
    if (this.formPassword.valid) {
      let body= {
        idUsuario:this.datosUsuario.idUsuario,
        contrasenia: this.formPassword.value.contrasenia,
      };
      this.contraseniaSubscription = this.usuarioService
        .actualizarContrasenia(body)
        .pipe(
          tap((response) => {
            // Código que se ejecuta cuando se recibe la respuesta del servicio
            if(response.success){
              this.routerLink = '/login';
              this.modalRespuesta(
                'assets/svg/circle-check-solid.svg',
                response.message
              );
            }else{
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
            console.log(error);
            throw error;
          })
        )
        .subscribe();
    }
  }
  modalRespuesta(svg: string, mensaje: string) {
    this.svg = svg;
    this.mensaje = mensaje;
    this.modalAccionesVisible = true;
  }
}