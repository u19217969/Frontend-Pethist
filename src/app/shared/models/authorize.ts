export interface Authorize {
  idUsuario?: number;
  nombreTipo?: string;
  login?: string;
  correo?: string;
  idTipoUsuario?: number;
  nombre?: string;
}
export interface MantenimientoAccesoRequest {
  idUsuario?: number;
  idMenu?: number;
  ver?: boolean;
  registrar?: boolean;
  actualizar?: boolean;
  eliminar?: boolean;
  acceso?: boolean;
  procesar?:boolean;
  creaUsuario?: string;
  modificaUsuario?: string;
  usuarioAccesoHijo?:MantenimientoAccesoRequest[];
}
