import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

import { io, Socket } from 'socket.io-client';
import { MenubarComponent } from '../shared/menubar/menubar.component';
import { RippleModule } from 'primeng/ripple';
import { MainComponent } from './pages/main/main.component';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MenubarComponent,
    RippleModule,
    MainComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent implements OnInit {



  // private socket = Inject(Socket);
  // // signals: any[] = [];

  // _messages: WritableSignal<IMessage[]> = signal([]);

  // // messages = computed( () => this._messages() )
  // messages : Signal<IMessage[]> = computed(() => this._messages())



  constructor() {}

  ngOnInit() {
    // this.socket = io('http://localhost:3000', { path: '/socket' });

    // // this.socket.fromEvent(event);

    // this.socket.on('signal', (data: any) => {
    //   console.log('data :>> ', data);


    //   this._messages.update(messages => ([...[messages], ...[data]]));

    // });
    // this.listen('signal')
  }

  // listen(event: string): Observable<any> {
  //   return this.socket.fromEvent(event);
  // }

}


