import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenubarComponent {

  private route = Inject(Router);
  public items: MenuItem[] | undefined;


  constructor() {

    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-fw pi-home',
        routerLink: '/dashboard'
      },
      {
        label: 'Medir glucosa',
        icon: 'pi pi-fw pi-heart-fill',
        routerLink: 'medidor-glucosa'
        // command: () => {
        //   this.redireccionar(2);
        // }

      },
      {
        label: 'Calendario de mediciones',
        icon: 'pi pi-fw pi-calendar',
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-fw pi-power-off'
      }
    ]
  }

  // redireccionar(opcion: number){

  //   console.log('opcion :>> ', opcion);

  //   switch (opcion) {
  //     case 1: return this.route.navigate(['']);
  //     case 2: return this.route.navigate(['/dashboard/medidor-glucosa']);;

  //     default: return '';
  //   }
  // }


}
