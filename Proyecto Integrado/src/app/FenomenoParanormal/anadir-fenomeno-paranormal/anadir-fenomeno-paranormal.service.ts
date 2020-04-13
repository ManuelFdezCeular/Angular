import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnadirFenomenoParanormalService {
  
  url = environment.url;

  constructor(private http:HttpClient) { }

  anadirFenPar(fenPar:FenomenoParanormal){
    let objeto = JSON.stringify({
      accion: "AnadirFenPar",
      fenomenoParanormal: fenPar
    })

    return this.http.post<boolean>(this.url, objeto, environment.cabecera());
  }
}
