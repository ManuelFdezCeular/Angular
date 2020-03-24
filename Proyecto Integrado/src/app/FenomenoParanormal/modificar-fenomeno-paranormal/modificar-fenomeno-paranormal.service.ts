import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FenomenoParanormal } from '../fenomeno-paranormal';

@Injectable({
  providedIn: 'root'
})
export class ModificarFenomenoParanormalService {
 
  url="http://localhost/AJAX/ServidorProyectoIntegrado/MiServicio.php";

  constructor(private http:HttpClient) { }

  modificar(fenPar:FenomenoParanormal){
    let objeto = JSON.stringify({
      accion: 'ModificaFenPar',
      fenomenoParanormal: fenPar
    })
    console.log(objeto);

    return this.http.post<boolean>(this.url, objeto);
  }

  obtenerFenPar(id:number){
    let objeto = JSON.stringify({
      accion: 'FenomenoParanormal',
      id: id
    })

    return this.http.post<FenomenoParanormal>(this.url, objeto);
  }
}
