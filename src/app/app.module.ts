import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ExternalComponentsModule } from './external-components/external-components.module';
import { BrowserModule } from '@angular/platform-browser'; './app.component';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ExternalComponentsModule,
    BrowserModule,
  ],
  providers: [AsyncPipe],
})
export class AppModule { }
