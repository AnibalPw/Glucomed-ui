import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, type OnInit, WritableSignal, computed } from '@angular/core';
import { SSistemaService } from '../../../services/sSistema.service';
import { IGlucosa } from '../../../interfaces/sistema.interfaces';

@Component({
  selector: 'app-gluco-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gluco-card.component.html',
  styleUrl: './gluco-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlucoCardComponent implements OnInit {

  private sSistema = inject(SSistemaService)


  _contadorMes: WritableSignal<number> = signal(0)
  _contadorDia: WritableSignal<number> = signal(0)

  _ultimaPrueba: WritableSignal<IGlucosa> = signal({});

  _nivelG: string = '';

  ngOnInit(): void {

    this.cargarPruebaMes();
    this.cargarPruebaDia();
    this.getUltimaPrueba();
  }

  cargarPruebaMes(){

    this.sSistema.getListaMes().subscribe({
      next: (res) =>{
        this._contadorMes.update( () => res.result.length )
        console.log('res mes:>> ', res);
      }
    })

  }

  cargarPruebaDia(){
    this.sSistema.getListaDia().subscribe({
      next: (res) =>{
        this._contadorDia.update( () => res.result.length )
        console.log('res dia:>> ', res);
      }
    })
  }


  getUltimaPrueba(){


    this.sSistema.getUltimaPrueba().subscribe({
      next: (result) => {

        const { dia, hora, glucosa, nivelGlucosa } = result.result

        this._ultimaPrueba.update((data) =>{
          data.dia = dia,
          data.hora = hora,
          data.glucosa = glucosa

          return { ...data }
        })

        this.validarNivelGlucosa();

      }
    })

  }

  validarNivelGlucosa() {
    switch (this._ultimaPrueba().glucosa !== 0) {
      case (this._ultimaPrueba().glucosa! <= 80): {
        this._nivelG = 'baja'
      }
        break;
      case (this._ultimaPrueba().glucosa! >= 80 && this._ultimaPrueba().glucosa! <= 120): {
        this._nivelG = 'en rango'
      }
        break;
      case (this._ultimaPrueba().glucosa! >= 120): {
        this._nivelG = 'alta'
      }
        break;
      default: {
        this._nivelG = 'baja'
      }
        break;
    }
  }

}
