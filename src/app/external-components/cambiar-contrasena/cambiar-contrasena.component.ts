import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss'],
})
export class CambiarContrasenaComponent  implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}
  async redireccionar(ruta: any) {
    try {
      await this.router.navigateByUrl(ruta, { replaceUrl: true });
    } catch (error) {}
  }
}