import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-glucometro',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './glucometro.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GlucometroComponent implements OnInit {

  ngOnInit(): void { }

}
