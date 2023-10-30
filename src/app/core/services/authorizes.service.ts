import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Authorize } from 'src/app/shared/models/authorize';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizesService {
  nombreToken: string = 'tk';
  nombreMenu: string = 'menu';
  urlServices: string = environment.urlServicesPH;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  redireccionarLogin(){
    this.router.navigate(['/'],{ replaceUrl: true });
  }
  redireccionarHome() {
    this.router.navigate(['/control/home'], { replaceUrl: true });
  }
  grabarToken(token: string) {
    localStorage.setItem(this.nombreToken, token);
  }
  grabarMenu(listaMenu: string) {
    localStorage.setItem(this.nombreMenu, listaMenu);
  }
  obtenerToken(): string {
    return localStorage.getItem(this.nombreToken)!;
  }
  obtenerMenu(): string {
    return localStorage.getItem(this.nombreMenu)!;
  }
  cerrarSesion() {
    localStorage.removeItem(this.nombreToken);
    localStorage.clear();
    this.router.navigate(['/login'],{ replaceUrl: true });
  }
  obtenerUsuarioAutentificacion(): Authorize {
    let modelAuth: Authorize={};
    let tk: string = this.obtenerToken();
    if(tk){
      const helper = new JwtHelperService();
      const descodedToken = helper.decodeToken(tk);

      modelAuth = {
        idUsuario: descodedToken.idUsuario,
        nombreTipo: descodedToken.nombreTipo,
        login: descodedToken.login,
        correo: descodedToken.correo,
        idTipoUsuario: descodedToken.idTipoUsuario,
        nombre: descodedToken.nombre,

      }
    }
    return modelAuth;
  }
}
