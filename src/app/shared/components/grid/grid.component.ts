import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { datat } from '../../models/datat';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() listaCabecera: Array<datat> = [];
  @Input() listaDetalle: Array<any> = [];
  @Output() sendView = new EventEmitter();
  @Output() sendEdit = new EventEmitter();
  @Output() sendDelete = new EventEmitter();
  @Output() sendPagination = new EventEmitter();
  @Output() sendAcceso = new EventEmitter();

  @Input() totalPage: Array<any> =[];
  @Input() totalCount: number =0;
  @Input() numeroTotalPage: number =0;
  @Input() currentPage: number =0;

  @Input() acceso: boolean =false;

  @Input() editar: boolean =true;

  constructor() {}

  ngOnInit() {

  }

  getvaluekey(obj: any, key_name: string) {
    return obj[key_name];
  }
  verRegistro(item:any){
    this.sendView.emit(item);
  }
  editarRegistro(item:any){
    this.sendEdit.emit(item);
  }
  eliminarRegistro(item:any){
    this.sendDelete.emit(item);
  }
  accesosRegistro(item:any){
    this.sendAcceso.emit(item);
  }
  siguientePaginado(numero:number){
    this.sendPagination.emit(numero);
  }

}
