import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Investigador } from '../investigador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListarInvestigadorService {

  url = environment.url;

  constructor(private http:HttpClient) { }

  obtenerInvestigadores(){
    let objeto = JSON.stringify({
      accion: "Investigadores"
    })

    return this.http.post<Investigador[]>(this.url, objeto, environment.cabecera());
  }

  filtrarInvestigador(nombre:string, residencia:string){
    let objeto = JSON.stringify({
      accion: "Filtrar",
      nombre,
      residencia
    })
    console.log("objeto:", objeto);
    return this.http.post<Investigador[]>(this.url, objeto, environment.cabecera());
  }
}
