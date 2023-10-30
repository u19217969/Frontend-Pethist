export interface Cita {
}
export interface CitaRequest {
  idCita?: number;
  idDoctor?: number;
  idMascota?: number;
  fechaCita?: Date;
  horaCita?: string;
  motivo?: string;
  observacion?: string;
  idEstadoCita?: number;
  estado?: boolean;
  creaUsuario?: string;
  modificaUsuario?: string;
  flag?: number;
}
export interface CitaListRequest {
  numeroPagina?: number;
  numeroRegistros?: number;
  fechaCita?: Date;
  idCliente?: number;
  idMascota?: number;
  filtro?: string;
}
export interface CitaListResponse {
  idCita?: number;
  fechaSolicitud?: Date;
  fechaCita?: string;
  idCliente?: number;
  nombreCliente?: string;
  idDoctor?: number;
  nombreDoctor?: string;
  idMascota?: number;
  nombreMascota?: string;
  horaCita?: string;
  motivo?: string;
  estado?: boolean;
  creaUsuario?: string;
  modificaUsuario?: string;
  flag?: number;
}
