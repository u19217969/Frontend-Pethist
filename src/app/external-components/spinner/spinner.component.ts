
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class SpinnerComponent  implements OnInit {

  isLoading$=this.spinnerService.isLoading$;

  constructor(
    private spinnerService:SpinnerService
  ) { }

  ngOnInit() {}

}
