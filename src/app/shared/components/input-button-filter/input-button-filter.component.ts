import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-button-filter',
  templateUrl: './input-button-filter.component.html',
  styleUrls: ['./input-button-filter.component.scss'],
})
export class InputButtonFilterComponent  implements OnInit {
  @Input() inputTitle: string = '';
  constructor() { }

  ngOnInit() {}

}
