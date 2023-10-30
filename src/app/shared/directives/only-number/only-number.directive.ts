import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyNumber]',
})
export class OnlyNumberDirective {
  @Input() appOnlyNumber: boolean = false;

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    if (this.appOnlyNumber) {
      const input = event.target as HTMLInputElement;
      const numericValue = input.value.replace(/\D/g, '');
      input.value = numericValue;
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    if (this.appOnlyNumber) {
      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
      if (!allowedKeys.includes(event.key) && isNaN(Number(event.key))) {
        event.preventDefault();
      }
    }
  }
}
