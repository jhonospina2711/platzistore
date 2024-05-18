import { CommonModule } from '@angular/common';
import { Component, Input, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({required: true}) duration = 0;
  @Input({required: true}) message = '';
  counter = signal(0);
  counterRef: number | undefined;

  constructor() {
    // No se deberia correr ningun componente que sea asyncrono
    // before render
    // solo se correo una vez
    console.log('constructor');
    console.log('-' .repeat(10));
  }

  ngOnChanges(changes: SimpleChanges){
    //before and diring
    console.log('ngOnChanges');
    console.log('-' .repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    if (duration && duration.currentValue != duration.previousValue) {
      this.doSomething();
    }
  }

  ngOnInit(){
    // after render
    // Solo corre una vez
    // Esta funcion se utiliza par actividades asincronas
    console.log('ngOnInit');
    console.log('-' .repeat(10));
    console.log('duration =>', this.duration);
    console.log('message =>', this.message);
    this.counterRef = window.setInterval(() => {
      console.log('run interval');
      this.counter.update(statePrev => statePrev + 1);
    }, 1000)
  }

  ngAfterViewInit() {
    //After render
    //Valida si los hijos del componente ya fueron reenderizados
    console.log('ngAfterViewInit');
    console.log('-' .repeat(10));
  }

  ngOnDestroy(){
    //El componente se destruye
    console.log('ngOnDestroy');
    console.log('-' .repeat(10));
    window.clearInterval(this.counterRef);
  }

  doSomething() {
    console.log('Change duration');
    //Puedo correr logica asincrona
  }

}
