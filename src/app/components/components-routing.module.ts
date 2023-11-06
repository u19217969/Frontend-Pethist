import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlContainerComponent } from './control-container/control-container.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CitaComponent } from './cita/cita.component';
import { AuthenticationGuard } from '../core/guards/authentication.guard';
import { MascotaComponent } from './mascota/mascota.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RegistrarCitaComponent } from './registrar-cita/registrar-cita.component';
import { NotificacionComponent } from './notificacion/notificacion.component';



const routes: Routes = [
  {
    path: '',
    component: ControlContainerComponent,
    canActivate:[AuthenticationGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'mascotas', component: MascotaComponent },
      { path: 'usuarios', component: UsuarioComponent },
      { path: 'citas', component: CitaComponent },
      { path: 'registrar-citas', component: RegistrarCitaComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'notificacion', component: NotificacionComponent },
      // { path: 'personal', component: RegistroPersonalComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
