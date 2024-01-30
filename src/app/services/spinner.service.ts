import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private sliderValue = new BehaviorSubject(0);
  currentSliderValue = this.sliderValue.asObservable();

  constructor() { }

  changeSliderValue(value: number) {
    this.sliderValue.next(value);
  }
}
