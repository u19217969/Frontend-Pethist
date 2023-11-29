import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { CambiarContrasenaComponent } from './cambiar-contrasena/cambiar-contrasena.component';

const routes: Routes = [
 // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'', component:HomeComponent, pathMatch: 'full'},
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "recover-password", component: RecoverPasswordComponent },
  { path: "registrar-usuario", component: RegistrarUsuarioComponent },
  { path: "cambiar-clave", component: CambiarContrasenaComponent },
  { path: "cambiar-clave/:token", component: CambiarContrasenaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternalComponentsRoutingModule { }
