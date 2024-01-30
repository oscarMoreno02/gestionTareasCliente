import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, NgControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { SpinnerService } from '../services/spinner.service';
import { SliderModule } from 'primeng/slider';
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,SliderModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  providers:[SpinnerService]
})

export class SliderComponent implements OnInit, OnChanges {
  @Input() numero:number=0
  @Input() realizado:boolean=false
  @Output() numeroChange = new EventEmitter<number>();
  @Output() realizadoChange = new EventEmitter<boolean>();
  constructor(private slider:SpinnerService){

  }
  @Input() value: number = 0;
 formatLabel = (value: number): string => {
  // if (value >= 1000) {
  //   console.log( Math.round(value / 1000))
  //   this.numero=Math.round(value / 1000)
  //   this.numeroChange.emit(this.numero);
  //   this.slider.changeSliderValue(this.numero)
  //   return this.numero +'';
  // }
  // return `${this.numero}`;
  return ''

}
ngOnInit(): void {
  this.numeroChange.emit(this.numero);

}
ngOnChanges(changes: SimpleChanges): void {
  // if (changes['numero']) {
  //   console.log('llega')
  //   this.formatLabel(this.numero);
  // }
  
}
cambio(){
  this.numeroChange.emit(this.numero);
  if(this.numero==100){
    this.realizado=true
  }else{
    this.realizado=false
  }
  this.realizadoChange.emit(this.realizado)
}
}
