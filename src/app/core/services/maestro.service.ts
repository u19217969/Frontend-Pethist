import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResult } from 'src/app/shared/models/json-result';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TablaRequest } from 'src/app/shared/models/tabla';

@Injectable({
  providedIn: 'root',
})
export class MaestroService {
  urlServices: string = environment.urlServicesPH + 'api/control/maestros/';
  constructor(private httpClient: HttpClient) {}

  listarMaestro(parametro: number): Observable<JsonResult<any>> {
    const urlBackServicePH = `${this.urlServices}` + parametro;
    let mheaders: HttpHeaders = new HttpHeaders();
    mheaders = mheaders.append('Content-Type', 'application/json');
    return this.httpClient.get<JsonResult<any>>(urlBackServicePH, {
      headers: mheaders,
    });
  }
  listarTabla(tabla: TablaRequest): Observable<JsonResult<any>> {
    const urlBackServicePH = `${this.urlServices}tabla`;
    const httpParams = JSON.stringify(tabla);
    let mheaders: HttpHeaders = new HttpHeaders();
    mheaders = mheaders.append('Content-Type', 'application/json');
    return this.httpClient.post<JsonResult<any>>(urlBackServicePH, httpParams, {
      headers: mheaders,
    });
  }
  generarNumeros(numeroInicio: number, numeroTotal: number): number[] {
    if (numeroInicio > numeroTotal) {
      return [];
    } else {
      return [
        numeroInicio,
        ...this.generarNumeros(numeroInicio + 1, numeroTotal),
      ];
    }
  }
  validarHora(fechaActual: Date, hora: string):boolean {
    // Obtener la hora actual
    const horaActual = fechaActual.getHours();
    const minutosActual = fechaActual.getMinutes();

    // Convertir la hora objetivo a valores numéricos
    const [horaObjetivo, minutosObjetivo] = hora
      .split(':')
      .map(Number);

    // Validar si la hora actual es mayor o igual a la hora objetivo
    if (
      horaActual > horaObjetivo ||
      (horaActual === horaObjetivo && minutosActual >= minutosObjetivo)
    ) {
      return false;
    } else {
      return true;
    }
  }
}
