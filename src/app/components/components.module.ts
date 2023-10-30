import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ControlContainerComponent } from './control-container/control-container.component';
import { ControlMenuComponent } from './control-menu/control-menu.component';
import { ControlNavComponent } from './control-nav/control-nav.component';
import { MaterialModule } from '../core/material/material.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { CitaComponent } from './cita/cita.component';
import { MascotaComponent } from './mascota/mascota.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RegistrarCitaComponent } from './registrar-cita/registrar-cita.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificacionComponent } from './notificacion/notificacion.component';

@NgModule({
  declarations: [
    ControlContainerComponent,
    ControlMenuComponent,
    ControlNavComponent,
    CitaComponent,
    MascotaComponent,
    UsuarioComponent,
    RegistrarCitaComponent,
    HomeComponent,
    ProfileComponent,
    NotificacionComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ComponentsRoutingModule,
    CoreModule,
    SharedModule,
  ],
  providers:[DatePipe]

})
export class ComponentsModule { }
