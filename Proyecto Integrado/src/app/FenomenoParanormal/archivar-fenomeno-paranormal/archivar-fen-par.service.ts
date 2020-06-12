import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Archivo } from 'src/app/Archivo/archivo';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchivaFenParService {

  url = environment.url;

  constructor(private http:HttpClient) { }

  archivar(archivo:Archivo){
    let objeto = JSON.stringify({
      servicio: "ArchivarFenPar",
      archivo: archivo
    })

    return this.http.post<boolean>(this.url, objeto, environment.cabecera());
  }

  borrar(id:number){
    let objeto = JSON.stringify({
      servicio: "BorrarFenPar",
      id: id
    })
    
    return this.http.post<boolean>(this.url, objeto, environment.cabecera());
  }

  obtenerFenPar(id:number){
    let objeto = JSON.stringify({
      servicio: 'FenomenoParanormal',
      id: id
    })

    return this.http.post<FenomenoParanormal>(this.url, objeto, environment.cabecera());
  }
}
