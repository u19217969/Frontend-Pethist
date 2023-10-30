import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-button',
  templateUrl: './input-button.component.html',
  styleUrls: ['./input-button.component.scss'],
})
export class InputButtonComponent  implements OnInit {

  @Input() inputTitle: string = 'title';
  @Input() svgUrl: string = '';

  constructor() { }

  ngOnInit() {}

}
