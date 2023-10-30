export interface Notificacion {
}
export interface NotificacionListRequest {
  numeroPagina?: number;
  numeroRegistros?: number;
  idUsuario?: number;
  fechaInicio?: Date;
  filtro?: string;
}
export interface NotificacionListResponse{
  fechaSolicitud?: Date;
  nombreDoctor?:string;
  nombreCliente?: string;
  fechaCita?: Date;
  nombreMascota?: string;
  horaCita?: string;
  estado?: boolean;
  totalRegistros?: number;

}
