import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],

})
export class InputTextComponent implements OnInit {

  @Input() inputTitle: string = 'title';
  @Input() inputPlaceHolder: string = 'placeHolder';
  @Input() inputValor: string = '';
  @Input() inputType: string = 'text';
  @Input() disableInput: boolean = false;
  @Input() svgUrl: string = '';
  @Input() svgUrlAccion: string = '';
  @Input() inputId: string = '';
  @Input() inputRequired: boolean=false;
  @Input() inputMessageRequired: string = '';
  @Input() inputMinLength: number = 0;
  @Input() inputMaxLength: number = 0;
  @Input() numericOnly: boolean=false;
  @Input() textOnly: boolean=false;
  @Output() send = new EventEmitter();

  messageRequired: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  getData(){
    const input = document.getElementById(this.inputId) as HTMLInputElement;
    const valor = input.value;
    this.send.emit(valor);
  }

  changeTypeInput(){
    if (this.inputType=='text') {
      this.inputType='password'
    }else if(this.inputType=='password'){
      this.inputType='text';
    }
  }

  messageRequiredInput(event:any){
    this.messageRequired=this.inputMessageRequired;
  }

}
