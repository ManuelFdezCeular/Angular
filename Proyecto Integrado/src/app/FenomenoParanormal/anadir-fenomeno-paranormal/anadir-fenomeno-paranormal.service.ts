import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FenomenoParanormal } from '../fenomeno-paranormal';

@Injectable({
  providedIn: 'root'
})
export class AnadirFenomenoParanormalService {
  
  url="http://localhost/AJAX/ServidorProyectoIntegrado/MiServicio.php";

  constructor(private http:HttpClient) { }

  anadirFenPar(fenPar:FenomenoParanormal){
    let objeto = JSON.stringify({
      accion: "AnadirFenPar",
      fenomenoParanormal: fenPar
    })

    return this.http.post<boolean>(this.url, objeto);
  }
}
