import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent  implements OnInit {

  @Input() inputTitle: string = 'title';
  @Input() inputValor: string = 'Seleccionar';
  @Input() options: any[] = [];
  @Input() inputId: string = '';
  @Input() inputRequired:boolean=false;
  @Input() inputMessageRequired: string = '';
  @Input() noEditable: boolean = false;
  
  @Output() send = new EventEmitter();

  openDetalle:boolean=false;
  messageRequired: string = '';

  constructor() { }

  ngOnInit() {}

  hideDetail(){
    this.openDetalle=!this.openDetalle;
  }

  select(option: any): void {
    this.openDetalle = false;
    this.inputValor = option.nombreMaestro;
    this.send.emit(option);
  }

  messageRequiredInput(event:any){
    this.messageRequired=this.inputMessageRequired;
  }

}
