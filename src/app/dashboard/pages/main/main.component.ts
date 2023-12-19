import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { GlucoStatsComponent } from '../../../components/gluco-stats/gluco-stats.component';
import { GlucoCardComponent } from '../../../components/gluco-card/gluco-card.component';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [
    CommonModule,
    GlucoCardComponent,
    GlucoStatsComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {

  ngOnInit(): void { }

}
