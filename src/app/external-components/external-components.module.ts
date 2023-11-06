import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExternalComponentsRoutingModule } from './external-components-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { HttpClient } from '@angular/common/http';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';
// import { SpinnerComponent } from './spinner/spinner.component';
@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    RecoverPasswordComponent,
    RegistrarUsuarioComponent,
    CambiarContrasenaComponent
    // SpinnerComponent
  ],
  imports: [
    CommonModule,
    ExternalComponentsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule,
    FormsModule
  ],
  providers:[
    HttpClient,
  ]
})
export class ExternalComponentsModule { }
