import { CommonModule } from '@angular/common';

import { ChangeDetectionStrategy, Component, Inject, signal, type OnInit, WritableSignal, Signal, computed, inject } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';

import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import Swal from 'sweetalert2'
import { Socket, io } from 'socket.io-client';
import { Observable, map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SSistemaService } from '../../../services/sSistema.service';
import { IGlucosa } from '../../../interfaces/sistema.interfaces';



interface IMessage {
  payload: number
}

@Component({
  selector: 'app-gluco-stats',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    ChartModule,
    ButtonModule,
    DialogModule,
    FormsModule,
  ],
  animations: [
    trigger('growDown', [
      state('void', style({ transform: 'translate(-50%, -50%) scale(0)' })),
      transition(':enter', animate('0.5s ease-out')),
    ]),
  ],
  templateUrl: './gluco-stats.component.html',
  styleUrl: './gluco-stats.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlucoStatsComponent implements OnInit {


  private socket = Inject(Socket);

  private sSistema = inject(SSistemaService);

  analizando = false;
  pulso = false;
  connectionEstablished = false;
  checkboxChecked = false;
  animateSvg = false;
  visible: boolean = false;
  data: any;
  // signals: any[] = [];





  _messages: WritableSignal<IMessage> = signal({
    payload: 0
  });

  _nivelGlucosa: string = '';

  _ultimaPrueba: WritableSignal<IGlucosa> = signal({});
  // _glucosaData:WritableSignal<IGlucosa[]> = signal([])

  // glucosaDataC = computed( () => [...this._glucosaData()] );
  // messages = computed( () => this._messages() )
  // messages: Signal<string> = computed(() => this._messages().payload)



  ngOnInit() {

    this.getUltimaPrueba();

    this.cargarGrafico()

  }


  toggleConnection(event: any): void {


    if (event.target.checked) {
      // Establecer conexión al presionar el botón

      this.analizando = true;
      this.pulso = true;
      this.checkboxChecked = true;


      this.animateSvg = true;


      // Establecer conexión al presionar el botón
      this.socket = io('http://localhost:3000', { path: '/socket' });

      this.socket.on('signal', (data: any) => {
        console.log('data :>> ', data);


        this._messages.update(value => {
          value.payload = data.payload
          return { ...value }
        })

        console.log('this._messages().payload :>> ', this._messages().payload);

        this.validarNivelGlucosa()


        if (!this.connectionEstablished && this._messages().payload !== 0) {
          this.socket.disconnect();
          this.connectionEstablished = true;
          this.analizando = true;
          this.pulso = false;
          this.checkboxChecked = false;
        }

      });

    } else {

      this.socket.disconnect();
      this.animateSvg = false;
      this.connectionEstablished = false;
      this.pulso = false;
      this.checkboxChecked = false;
    }
  }



  showDialog() {
    this.visible = true;
  }

  hiddenDialog() {

    if (this.connectionEstablished && this._messages().payload !== 0) {
      this.socket.disconnect();
      this.analizando = false;
      this.animateSvg = false;
      this.connectionEstablished = true;
      this.checkboxChecked = false;
      this.pulso = false;

      this._messages.update(value => {
        value.payload = 0
        return { ...value }
      })

    }
  }

  validarNivelGlucosa() {
    switch (this._messages().payload !== 0) {
      case (this._messages().payload <= 80): {
        this._nivelGlucosa = 'Glucosa baja'
      }
        break;
      case (this._messages().payload >= 80 && this._messages().payload <= 120): {
        this._nivelGlucosa = 'Glucosa en rango'
      }
        break;
      case (this._messages().payload >= 120): {
        this._nivelGlucosa = 'Glucosa alta'
      }
        break;
      default: {
        this._nivelGlucosa = 'Glucosa baja'
      }
        break;
    }
  }

  getUltimaPrueba(){


    this.sSistema.getUltimaPrueba().subscribe({
      next: (result) => {

        const { dia, hora, glucosa } = result.result

        this._ultimaPrueba.update((data) =>{
          data.dia = dia,
          data.hora = hora,
          data.glucosa = glucosa

          return { ...data }
        })

        this.cargarGrafico();
      }
    })

  }

  cargarGrafico(){

    this.sSistema.getListaPrueba().pipe(
      map(result => {
        // Aquí realizas la transformación que necesites
        return result.result.map((entry:any) => ({
          label: entry.hora,
          data: [entry.glucosa]
        }));
      })
    ).subscribe(transformedData => {
      // Aquí puedes utilizar los datos transformados
      console.log('Transformed Data:', transformedData);
      this.data = {
        labels: transformedData.map((entry:any) => entry.label),
        datasets: [
          {
            label: 'Nivel de Glucosa',
            data: transformedData.map((entry:any) => entry.data[0]),
            backgroundColor: 'rgba(75,192,192,0.4)', // Puedes ajustar esto según tus preferencias
            borderColor: 'rgba(75,192,192,1)', // Puedes ajustar esto según tus preferencias
            borderWidth: 1
          }
        ]
      };

    });



  }

  guardar() {


    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const horaActual = fechaActual.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    console.log('horaActual :>> ', horaActual);
    const objPrueba: IGlucosa = {
      idUsuario: '1',
      glucosa: this._messages().payload,
      nivelGlucosa: this._nivelGlucosa,
      dia: fechaFormateada,
      hora: horaActual
    }

    this.sSistema.guardarPrueba(objPrueba, '1').subscribe({
      next: (result) => {

        if (result.ok) {


          const Toast = Swal.mixin({
            toast: true,
            html: result.msg,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;

              this.hiddenDialog();
              this.visible = false;
              this.cargarGrafico();
            }
          });
          Toast.fire({
            icon: "success",
            title: "¡Guadado!"
          });


        }
        else {
          const Toast = Swal.mixin({
            toast: true,
            html: 'No fue posible actulizar la información de crédito',
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;

              this.hiddenDialog();
              this.visible = false;
              this.cargarGrafico();

            }
          });
          Toast.fire({
            icon: "error",
            title: "¡Error!"
          });

        }

      }
    })

  }


}
