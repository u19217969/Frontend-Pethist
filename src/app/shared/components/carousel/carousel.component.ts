import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent{

  @Input() imageUrlUno: string = '';
  @Input() imageUrlDos: string = '';
  @Input() imageUrlTres: string = '';
  @Input() imageUrlCuatro: string = '';

  /*@ViewChild('carouselElement') carouselElement!: ElementRef;
  currentIndex: number = 0;
  intervalId: any;

  constructor() { }

  ngAfterViewInit() {
    // Obtén una referencia al elemento del carrusel
    const carousel = this.carouselElement.nativeElement;

    // Agrega un manejador de eventos al botón "Anterior"
    carousel.querySelector('[data-te-slide="prev"]').addEventListener('click', () => {
      this.showSlide(this.currentIndex - 1);
      this.resetInterval();
    });

    // Agrega un manejador de eventos al botón "Siguiente"
    carousel.querySelector('[data-te-slide="next"]').addEventListener('click', () => {
      this.showSlide(this.currentIndex + 1);
      this.resetInterval();
    });

    // Agrega un manejador de eventos a los indicadores
    const indicators = carousel.querySelectorAll('[data-te-slide-to]');
    indicators.forEach((indicator:any, index:any) => {
      indicator.addEventListener('click', () => {
        this.showSlide(index);
        this.resetInterval();
      });
    });

    this.startInterval();

  }

  startInterval() {
    this.intervalId = setInterval(() => {
      this.showSlide(this.currentIndex + 1);
    }, 8000);
  }

  resetInterval() {
    clearInterval(this.intervalId); // Detiene el intervalo actual
    this.startInterval(); // Inicia un nuevo intervalo
  }

  showSlide(index: number) {
    // Obtén una referencia al elemento del carrusel
    const carousel = this.carouselElement.nativeElement;

    // Oculta todas las diapositivas
    const slides = carousel.querySelectorAll('[data-te-carousel-item]');
    slides.forEach((slide:any) => {
      slide.classList.remove('block');
      slide.classList.add('hidden');
    });

    // Asegúrate de que el índice esté dentro de los límites
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }

    // Muestra la diapositiva actual
    slides[index].classList.remove('hidden');
    slides[index].classList.add('block');

    // Actualiza el índice actual
    this.currentIndex = index;
  }*/

}
