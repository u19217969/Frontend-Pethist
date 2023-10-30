export interface UsuarioRequest {
  idUsuario?: number;
  idTipoDocumento?: number;
  idTipoUsuario?: number;
  nombreUsuario?: string;
  login?: string;
  nroDocumento?: string;
  clave?: string;
  correo?: number;
  estado?: boolean;
  creaUsuario?: string;
  modificaUsuario?: string;
  flag?: number;
}
export interface UsuarioListRequest {
  numeroPagina?: number;
  numeroRegistros?: number;
  idTipoDocumento?: number;
  nroDocumento?: string;
  idTipoUsuario?: number;
  filtro?: string;
}
export interface UsuarioListResponse{
  idUsuario?: number;
  idTipoDocumento?: number;
  nombreTipoDocumento?: string;
  idTipoUsuario?: number;
  nombreTipoUsuario?: string;
  nombreUsuario?: string;
  login?: string;
  nroDocumento?: string;
  correo?: string;
  clave?:string;
  estado?: boolean;
}
export interface UsuarioFindRequest {
  idUsuario?: number;
}
