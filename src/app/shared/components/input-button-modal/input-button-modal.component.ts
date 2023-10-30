import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button-modal',
  templateUrl: './input-button-modal.component.html',
  styleUrls: ['./input-button-modal.component.scss'],
})
export class InputButtonModalComponent  implements OnInit {

  @Input() inputTitle: string = 'title';
  @Input() type: string = 'blue';
  @Input() typeColorText: string = 'blue';

  constructor() { }

  ngOnInit() {}

}
