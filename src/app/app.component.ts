import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './external-components/spinner/spinner.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule,SpinnerComponent,CommonModule],
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    initFlowbite();
  }
}
