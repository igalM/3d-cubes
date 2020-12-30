import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SquaresService {

  constructor() { }

  getRandomRgb() {
    const num = Math.round(0xffffff * Math.random());
    const r = num >> 16;
    const g = num >> 8 & 255;
    const b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }

}
