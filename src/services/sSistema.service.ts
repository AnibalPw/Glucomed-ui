import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environments/environment';
import { Observable, map, tap } from 'rxjs';
import { IGlucosa, Respuesta } from '../interfaces/sistema.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SSistemaService {

  private http = inject( HttpClient );

  private baseUrl: string = environment.baseUrl;


  constructor() { }

  getListaPrueba(): Observable<Respuesta>{

    return this.http.get<IGlucosa[]>(`${ this.baseUrl }glucosa` )
    .pipe(
      map( response => response ),
      tap( console.log ),
    );
  }

  getListaMes(): Observable<Respuesta>{

    return this.http.get<IGlucosa[]>(`${ this.baseUrl }glucosa/listaMes` )
    .pipe(
      map( response => response ),
      tap( console.log ),
    );
  }

  getListaDia(): Observable<Respuesta>{

    return this.http.get<IGlucosa[]>(`${ this.baseUrl }glucosa/listaDia` )
    .pipe(
      map( response => response ),
      tap( console.log ),
    );
  }

  getUltimaPrueba(): Observable<Respuesta>{

    return this.http.get<IGlucosa>(`${ this.baseUrl }glucosa/ultimaPrueba` )
    .pipe(
      map( response => response ),
      tap( console.log ),
    );
  }


  guardarPrueba(objGlucosa: IGlucosa, pToken: string): Observable<Respuesta>{

    return this.http.post<Respuesta>(`${ this.baseUrl }glucosa`, objGlucosa )
    .pipe(
      map( response => response ),
      tap( console.log ),
    );


    // var httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json',
    //   'Authorization': 'Bearer '+  pToken})
    // };
    // const url=`${this.baseUrl}C_Solicitud/SolicitudCancelacion`;
    // return this.http.post<Respuesta>(url, objCancelacion, httpOptions);


  }

}
