export interface Horario {
}
export interface HorarioFechaRequest {
  fechaInicio?: Date;
  idUsuario?: number;
}
export interface HorarioFechaResponse {
  fecha?: Date;
  dia?: string;
  nombreDia?: string;
  horario?:HorarioHoraResponse[];
}
export interface HorarioHoraResponse {
  hora?: string;
  disponibilidad?: boolean;
  miCita?: boolean;
  seleccion?:boolean;
}


