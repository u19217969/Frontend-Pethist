import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnlyText]',
})
export class OnlyTextDirective {
  @Input() appOnlyText: boolean = false;
  /*No tiene uso */
  @HostListener('input', ['$event']) oninput(event: KeyboardEvent) {
    if (this.appOnlyText) {
      const input = event.target as HTMLInputElement;
      const textValue = input.value.replace(
        /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ \-\'.]/g,
        ''
      );
      input.value = textValue;
    }
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.appOnlyText) {
      const allowedKeys = [
        'Backspace',
        'Delete',
        'ArrowLeft',
        'ArrowRight',
        'Tab',
      ];
      if (!allowedKeys.includes(event.key) && !this.isLetter(event.key)) {
        event.preventDefault();
      }
    }
  }
  private isLetter(key: string): boolean {
    // Utiliza una expresión regular para verificar si el carácter es una letra
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]$/.test(key);
  }
}
