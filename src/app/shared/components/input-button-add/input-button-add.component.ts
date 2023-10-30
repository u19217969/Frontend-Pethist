import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button-add',
  templateUrl: './input-button-add.component.html',
  styleUrls: ['./input-button-add.component.scss'],
})
export class InputButtonAddComponent  implements OnInit {

  @Input() inputTitle: string = 'title';

  constructor() { }

  ngOnInit() {}

}
