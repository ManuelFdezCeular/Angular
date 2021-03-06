import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModificarFenomenoParanormalService {
 
  url = environment.url;
  constructor(private http:HttpClient) { }

  modificar(fenPar:FenomenoParanormal){
    let objeto = JSON.stringify({
      servicio: 'ModificaFenPar',
      fenomenoParanormal: fenPar
    })

    return this.http.post<any>(this.url, objeto);
  }

  obtenerFenPar(id:number){
    let objeto = JSON.stringify({
      servicio: 'FenomenoParanormal',
      id: id
    })

    return this.http.post<FenomenoParanormal>(this.url, objeto, environment.cabecera());
  }
}
