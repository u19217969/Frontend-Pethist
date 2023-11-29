import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, tap, map, catchError } from 'rxjs';
import { AccesoService } from 'src/app/core/services/acceso.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent  implements OnInit {
  formRecuperarPassword!: FormGroup;
  mensaje: string = '';
  svg: string = '';
  confirmacion: boolean = false;
  modalAccionesVisible: boolean = false;
  private recoverSubscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private accesoService:AccesoService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.formRecuperarPassword = this.fb.group({
      correo: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
    });
  }

  async redireccionar(ruta:any) {
    try {
      await this.router.navigateByUrl(ruta, { replaceUrl: true });
    } catch (error) {
    }
  }

  async enviarCorreo() {
    if (this.formRecuperarPassword.valid) {
      let body= {
        correo: this.formRecuperarPassword.value.correo,
      };
      this.recoverSubscription = this.accesoService
        .recuperarContraseña(body)
        .pipe(
          tap((response) => {
            // Código que se ejecuta cuando se recibe la respuesta del servicio
            console.log(response);
            if(response.success){
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
    }else{
      if (this.formRecuperarPassword.get('correo')!.hasError('required')){
        this.modalRespuesta(
          'assets/svg/circle-info-solid.svg',
          'Debe ingresar un correo válido. '
        );
        return;
      }
      if (this.formRecuperarPassword.get('correo')!.hasError('email')){
        this.modalRespuesta(
          'assets/svg/circle-info-solid.svg',
          'Debe ingresar un correo válido. '
        );
        return;
      }

    }
  }
  modalRespuesta(svg: string, mensaje: string) {
    this.svg = svg;
    this.mensaje = mensaje;
    this.modalAccionesVisible = true;
  }
}