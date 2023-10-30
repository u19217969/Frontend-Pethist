import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-check',
  templateUrl: './input-check.component.html',
  styleUrls: ['./input-check.component.scss'],
})
export class InputCheckComponent  implements OnInit {
  @Input() check: boolean = false;
  @Input() title: string = '';
  @Input() size: string = '';
  @Output() send = new EventEmitter();
  constructor() { }

  ngOnInit() {}

  onCheckboxChange(event:any){
    this.send.emit(event.target.checked);
  }

}
