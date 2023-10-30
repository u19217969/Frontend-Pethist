export interface Mascota {
}
export interface MascotaRequest {
  idMascota?: number;
  idGeneroMascota?: number;
  idTipoMascota?: number;
  nombreMascota?: string;
  fechaNacimiento?: Date;
  colorMascota?: string;
  idUsuario?: number;
  estado?: boolean;
  creaUsuario?: string;
  modificaUsuario?: string;
  flag?: number;
}
export interface MascotaListRequest {
  numeroPagina?: number;
  numeroRegistros?: number;
  idGenero?: number;
  idTipo?: number;
  fechaNacimiento?: Date;
  idCliente?: number;
  filtro?: string;
}
export interface MascotaListResponse{
  idMascota?: number;
  idGeneroMascota?: number;
  nombreGenero?: string;
  idTipoMascota?: number;
  nombreTipo?: string;
  nombreMascota?: string;
  fechaNacimiento?: Date;
  colorMascota?: string;
  idUsuario?: number;
  nombreUsuario?:string;
  estado?: boolean;
  creaUsuario?: string;
  modificaUsuario?: string;
  flag?: number;
}
