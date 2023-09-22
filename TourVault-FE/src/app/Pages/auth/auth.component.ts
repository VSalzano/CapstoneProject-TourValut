import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  @ViewChild('backgroundElement') backgroundElement!: ElementRef;

  backgroundImages: string[] = [
    'https://images.pexels.com/photos/14745535/pexels-photo-14745535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/14745535/pexels-photo-14745535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/12530475/pexels-photo-12530475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  currentIndex = 0;
  constructor() {
    this.changeBackground();
  }

  ngOnInit() {}

  changeBackground() {
    setTimeout(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.backgroundImages.length;
      const nextImage = this.backgroundImages[this.currentIndex];
      this.backgroundElement.nativeElement.style.backgroundImage = `url(${nextImage})`;
      this.changeBackground(); // Chiama la funzione ricorsivamente
    }, 3000);
  }
}
