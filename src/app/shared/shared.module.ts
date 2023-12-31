import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './components/input-text/input-text.component';
import { CardComponent } from './components/card/card.component';
import { InputButtonComponent } from './components/input-button/input-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { InputDateComponent } from './components/input-date/input-date.component';
import { InputButtonFilterComponent } from './components/input-button-filter/input-button-filter.component';
import { InputButtonAddComponent } from './components/input-button-add/input-button-add.component';
import { ModalComponent } from './components/modal/modal.component';
import { InputButtonModalComponent } from './components/input-button-modal/input-button-modal.component';
import { GridComponent } from './components/grid/grid.component';
import { ModalActionsComponent } from './components/modal-actions/modal-actions.component';
import { InputCheckComponent } from './components/input-check/input-check.component';
import { OnlyNumberDirective } from './directives/only-number/only-number.directive';
import { CarouselComponent } from './components/carousel/carousel.component';

@NgModule({
  declarations: [
    InputTextComponent,
    CardComponent,
    InputButtonComponent,
    InputDateComponent,
    InputSelectComponent,
    InputButtonFilterComponent,
    InputButtonAddComponent,
    ModalComponent,
    InputButtonModalComponent,
    GridComponent,
    ModalActionsComponent,
    InputCheckComponent,
    CarouselComponent,
    OnlyNumberDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    InputTextComponent,
    CardComponent,
    InputButtonComponent,
    InputDateComponent,
    InputSelectComponent,
    InputButtonFilterComponent,
    InputButtonAddComponent,
    ModalComponent,
    InputButtonModalComponent,
    GridComponent,
    ModalActionsComponent,
    InputCheckComponent,
    CarouselComponent
  ]
})
export class SharedModule { }
