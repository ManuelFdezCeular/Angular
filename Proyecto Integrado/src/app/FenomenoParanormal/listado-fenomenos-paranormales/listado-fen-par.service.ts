import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListadoFenParService {
  
  url = environment.urlAbierta;

  constructor(private http:HttpClient) { }

  listarFenPar(){
    let objeto = JSON.stringify({
      accion: "FenomenosParanormales"
    })

    return this.http.post<FenomenoParanormal[]>(this.url, objeto);
  }

  filtrarFenPar(lugar:string, provincia:string, comunidad:string){
    let objeto = JSON.stringify({
      accion: "FiltrarFenPar",
      lugar,
      provincia,
      comunidad
    })

    return this.http.post<FenomenoParanormal[]>(this.url, objeto);
  }
}
