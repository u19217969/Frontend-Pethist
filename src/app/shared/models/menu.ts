export interface Menu {
}
export interface MenuRequest {
  idUsuario?: number;
}
export interface MenuListaPadre {
  idMenu?: number;
  nombre?: string;
  icono?: string;
  orden?: number;
  acceso?: boolean;
  seleccion?:boolean;
  usuarioAccesoHijo?:MenuListaHijo[];
}
export interface MenuListaHijo {
  idMenuHijo?: number;
  nombre?: string;
  icono?: string;
  url?: string;
  orden?: number;
  ver?: boolean;
  registrar?: boolean;
  actualizar?: boolean;
  eliminar?: boolean;
  acceso?: boolean;
}

