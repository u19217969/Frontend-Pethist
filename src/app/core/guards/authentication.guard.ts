import { inject } from '@angular/core';
import { AuthorizesService } from '../services/authorizes.service';
import { CanActivateFn } from '@angular/router';

export const AuthenticationGuard:CanActivateFn = () => {
  const authorizesService = inject(AuthorizesService);
    let tk = authorizesService.obtenerToken();
    if (!tk) {
      authorizesService.cerrarSesion();
    }

    return true;
}
