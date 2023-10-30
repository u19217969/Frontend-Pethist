import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {

  @Input() visible: boolean = false;
  @Input() closeIconVisible: boolean = true;
  @Input() size: string = '';
  @Input() title: string = '';
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
