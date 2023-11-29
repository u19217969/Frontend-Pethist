import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaService } from 'src/app/core/services/cita.service';
import { Subscription, tap, map, catchError } from 'rxjs';
import {
  HorarioFechaRequest,
  HorarioFechaResponse,
} from 'src/app/shared/models/horario';
import { Authorize } from 'src/app/shared/models/authorize';
import { AuthorizesService } from 'src/app/core/services/authorizes.service';
import { ParametroTabla } from 'src/app/shared/models/parametro-maestro';
import { MaestroService } from 'src/app/core/services/maestro.service';
import { TablaRequest } from 'src/app/shared/models/tabla';
import { Select } from 'src/app/shared/models/select';
import { CitaRequest } from 'src/app/shared/models/cita';
import { log } from 'console';

@Component({
  selector: 'app-registrar-cita',
  templateUrl: './registrar-cita.component.html',
  styleUrls: ['./registrar-cita.component.scss'],
})
export class RegistrarCitaComponent implements OnInit {
  formCitas!: FormGroup;
  fechaActual: string = '';
  datosUsuario: Authorize = {};

  listaVeterinario: Select[] = [];
  listaMascota: Select[] = [];

  modalAccionesVisible: boolean = false;
  mensaje: string = '';
  svg: string = '';
  fechaSeleccionado: any;
  confirmacion: boolean = false;
  redireccionar: string = '';

  private citaSubscription: Subscription = new Subscription();

  fechaA: any;
  fechaDelMes: any;

  fechaFija: any;
  listaHorario: HorarioFechaResponse[] = [];
  indexPadre: number = 0;
  indexHijo: number = 0;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private citaService: CitaService,
    private authorizesService: AuthorizesService,
    private maestroService: MaestroService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formCitas = this.fb.group({
      idDoctor: [{ value: 0, disabled: false }],
      idMascota: [{ value: '', disabled: false }, [Validators.required]],
      horaCita: [{ value: '', disabled: false }, [Validators.required]],
      motivo: [{ value: '', disabled: false }, [Validators.required]],
    });
    this.datosUsuario = this.authorizesService.obtenerUsuarioAutentificacion();
    this.obtenerFechaActual(null, '', 0, 0);
    this.cargarPametrosSistema();
  }

  cont: number = 0;
  cambiarMes(sit: boolean): void {
    this.fechaA = new Date();
    if (sit) {
      this.cont++;
      //Obtener la fecha del mes siguiente
      let primerDiaMesSiguiente = new Date(
        this.fechaA.getFullYear(),
        this.fechaA.getMonth() + this.cont,
        1
      );
      this.setFechaDelMes(
        primerDiaMesSiguiente.getFullYear(),
        primerDiaMesSiguiente.getMonth()
      );
    } else {
      this.setFechaDelMes(
        this.fechaA.getFullYear(),
        this.fechaA.getMonth()
      );
    }
  }
  backMonth(): void {
    this.cont--;
    //Obtener la fecha del mes siguiente
    let datenow = new Date();
    let primerDiaMesSiguiente = new Date(
      this.fechaA.getFullYear(),
      this.fechaA.getMonth() + this.cont,
      1
    );
    console.log(primerDiaMesSiguiente + ' ' + datenow);
    if (
      primerDiaMesSiguiente.getFullYear() == datenow.getFullYear() &&
      primerDiaMesSiguiente.getMonth() == datenow.getMonth()
    ) {
      this.setFechaDelMes(
        primerDiaMesSiguiente.getFullYear(),
        primerDiaMesSiguiente.getMonth()
      );
    } else if (primerDiaMesSiguiente < datenow) {
      this.cont++;
    } else {
      this.setFechaDelMes(
        primerDiaMesSiguiente.getFullYear(),
        primerDiaMesSiguiente.getMonth()
      );
    }
  }
  setFechaDelMes(year: any, month: any) {
    this.fechaDelMes = new Date(year, month, 1);
    this.obtenerHorario();
  }

  obtenerHorario() {
    let body: HorarioFechaRequest = {
      fechaInicio: this.fechaDelMes,
      idUsuario: this.datosUsuario.idUsuario,
    };

    console.log(JSON.stringify(body));
    this.citaSubscription = this.citaService
      .horarioFecha(body)
      .pipe(
        tap((response) => {
          //console.log(response)
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          if (response.success && response.records) {
            this.listaHorario = response.dataListModel;
          }
        }),
        map((response) => {
          // Código que transforma la respuesta del servicio
          //return response;
        }),
        catchError((error) => {
          // Código que maneja el error si se produce uno
          console.log(error, 'error');
          throw error;
        })
      )
      .subscribe();
  }
  obtenerFechaActual(
    fecha: any,
    hora: string,
    indexPadre: number,
    indexHijo: number
  ) {
    const fechaActual2 = new Date();
    fechaActual2.setHours(0, 0, 0, 0);
    if (fecha == null) {
      /* this.fechaActual = this.datePipe.transform(fechaActual2, 'yyyy-MM-dd')!;
      this.formCitas.patchValue({
        fechaCita: this.fechaActual,
      });*/

      //this.obtenerHorario();
      this.cambiarMes(false);
    } else {
      const [year, month, day] = fecha.split('-').map(Number);
      const parsearFecha = new Date(year, month - 1, day);
      if (parsearFecha < fechaActual2) {
        this.modalRespuesta(
          'assets/svg/circle-info-solid.svg',
          'La fecha es anterior a la fecha actual.'
        );
      } else if (parsearFecha > fechaActual2) {
        this.fechaFija = fecha;
        this.formCitas.patchValue({
          horaCita: hora,
        });
        this.listaHorario[this.indexPadre].horario![this.indexHijo].seleccion =
          false;
        this.listaHorario[indexPadre].horario![indexHijo].seleccion = true;
        this.indexPadre = indexPadre;
        this.indexHijo = indexHijo;
      } else {
        if (this.maestroService.validarHora(new Date(), hora)) {
          this.fechaFija = fecha;
          this.formCitas.patchValue({
            horaCita: hora,
          });
          this.listaHorario[this.indexPadre].horario![
            this.indexHijo
          ].seleccion = false;
          this.listaHorario[indexPadre].horario![indexHijo].seleccion = true;
          this.indexPadre = indexPadre;
          this.indexHijo = indexHijo;
        } else {
          this.modalRespuesta(
            'assets/svg/circle-info-solid.svg',
            'Por favor, seleccione una hora posterior a la hora actual.'
          );
        }
      }
    }
  }
  /*consultarFecha(fecha: Date) {
    this.formCitas.patchValue({
      fechaCita: this.datePipe.transform(fecha, 'yyyy-MM-dd')!,
      horaCita: '',
    });
    //this.obtenerHorario();
  }*/
  cargarPametrosSistema() {
    this.mostrarVeterinario();
    this.mostrarMascota();
  }
  mostrarVeterinario() {
    const id = ParametroTabla.veterinario;
    let body: TablaRequest = {
      tabla: id,
      id: 0,
    };
    this.citaSubscription = this.maestroService
      .listarTabla(body)
      .pipe(
        tap((response) => {
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          this.listaVeterinario = response.dataListModel;
        }),
        map((response) => {
          // Código que transforma la respuesta del servicio
          //return response;
        }),
        catchError((error) => {
          // Código que maneja el error si se produce uno
          console.log(error, 'error');
          throw error;
        })
      )
      .subscribe();
  }
  mostrarMascota() {
    const id = ParametroTabla.mascotaxUsuario;
    let body: TablaRequest = {
      tabla: id,
      id: this.datosUsuario.idUsuario,
    };
    this.citaSubscription = this.maestroService
      .listarTabla(body)
      .pipe(
        tap((response) => {
          // Código que se ejecuta cuando se recibe la respuesta del servicio
          this.listaMascota = response.dataListModel;
        }),
        map((response) => {
          // Código que transforma la respuesta del servicio
          //return response;
        }),
        catchError((error) => {
          // Código que maneja el error si se produce uno
          console.log(error, 'error');
          throw error;
        })
      )
      .subscribe();
  }
  registrarCita() {
    let body: CitaRequest = {
      idCita: 0,
      idDoctor: this.formCitas.value.idDoctor,
      idMascota: this.formCitas.value.idMascota,
      fechaCita: this.fechaFija,

      horaCita: this.formCitas.value.horaCita,
      motivo: this.formCitas.value.motivo,
      observacion: '',
      idEstadoCita: 1,
      estado: 0,
      creaUsuario: this.datosUsuario.login,
      modificaUsuario: this.datosUsuario.login,
      flag: 1,
      idUser: this.datosUsuario.idUsuario,
    };
    this.citaSubscription = this.citaService
      .mantenimientoCita(body)
      .pipe(
        tap((response) => {
          if (response.success) {
            this.redireccionar = '/control/citas';
            this.modalRespuesta(
              'assets/svg/circle-check-solid.svg',
              response.dataModel.mensaje
            );
          } else {
            this.modalRespuesta(
              'assets/svg/circle-xmark-solid.svg',
              response.message
            );
          }
        }),
        map((response) => {
          // Código que transforma la respuesta del servicio
          //return response;
        }),
        catchError((error) => {
          // Código que maneja el error si se produce uno
          console.log(error, 'error');
          throw error;
        })
      )
      .subscribe();
  }
  modalRespuesta(svg: string, mensaje: string) {
    this.svg = svg;
    this.mensaje = mensaje;
    this.modalAccionesVisible = true;
  }
}
