import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {

    const links = this.el.nativeElement.querySelectorAll('a[href^="#"]');
    for (const link of links) {
      link.addEventListener('click', (event:any) => {
        this.scrollToElement(event);
      });
    }

  }

  scrollToElement(event: Event) {

    event.preventDefault();

    const targetId = (event.target as HTMLAnchorElement).getAttribute('href')!.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}