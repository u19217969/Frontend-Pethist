import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizesService } from 'src/app/core/services/authorizes.service';
import { PermisoService } from 'src/app/core/services/permiso.service';
import { Authorize } from 'src/app/shared/models/authorize';
import { MenuListaPadre } from 'src/app/shared/models/menu';

@Component({
  selector: 'app-control-menu',
  templateUrl: './control-menu.component.html',
  styleUrls: ['./control-menu.component.scss'],
})
export class ControlMenuComponent  implements OnInit {

  @Output() closeSideNav = new EventEmitter();

  flagMostrarMenu: boolean=false;
  datosUsuario: Authorize = {};
  listaMenu: MenuListaPadre[] = [];

  constructor(
    private authorizesService:AuthorizesService,
    private permisoService: PermisoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarParametros();
  }

  onToggleClose() {
    this.closeSideNav.emit("close");
  }

  prueba(){
    this.flagMostrarMenu=!this.flagMostrarMenu;
  }

  cargarParametros(){
    this.datosUsuario = this.authorizesService.obtenerUsuarioAutentificacion();
    this.listaMenu = JSON.parse(this.authorizesService.obtenerMenu());
    // console.log(this.listaMenu)
  }

  mostrarHijo(index:number){
    this.deseleccionarMenu();
    this.listaMenu[index].seleccion=true;
  }

  cerrarSesion(){
    this.authorizesService.cerrarSesion();
    this.permisoService.permisosNoConcedido();
  }

  deseleccionarMenu(){
    this.listaMenu = this.listaMenu.map((menu) => {
      return {
        ...menu,
        seleccion: false
      };
    });
  }
  async redireccionar(ruta:any) {
    this.onToggleClose();
    try {
      await this.router.navigateByUrl(ruta, { replaceUrl: true });
    } catch (error) {
    }
  }

}
