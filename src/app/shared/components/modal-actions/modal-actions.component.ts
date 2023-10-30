import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-actions',
  templateUrl: './modal-actions.component.html',
  styleUrls: ['./modal-actions.component.scss'],
})
export class ModalActionsComponent  implements OnInit {

  @Input() visible: boolean = false;
  @Input() closeIconVisible: boolean = true;
  @Input() size: string = '';
  @Input() title: string = '';
  @Input() svgUrl: string = '';
  @Input() descripcion: string = '';
  @Input() confirmacion: boolean = false;
  @Input() redireccionar: string = '';
  @Output() close = new EventEmitter();

  constructor(
    private router:Router
  ) { }

  ngOnInit() {}

  eliminar(){
    this.close.emit(true);
  }
  cerrarModal(){
    if (this.redireccionar=='') {
      this.close.emit();
    }else{
      this.router.navigateByUrl(this.redireccionar);
    }
  }

}
