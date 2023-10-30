import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent  implements OnInit {

  @Input() inputTitle: string = 'title';
  @Input() inputId: string = '';
  @Input() inputValor: string = '';
  @Output() send = new EventEmitter();
  @Input() noEditable: boolean = false;

  constructor() { }

  ngOnInit() {}

  enviarFecha(event: any): void {
    this.send.emit(event.target.value);
  }

}
