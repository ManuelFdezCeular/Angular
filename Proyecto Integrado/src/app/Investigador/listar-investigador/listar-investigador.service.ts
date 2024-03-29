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
      servicio: "Investigadores"
    })

    return this.http.post<Investigador[]>(this.url, objeto, environment.cabecera());
  }

  filtrarInvestigador(nombre:string, residencia:string){
    let objeto = JSON.stringify({
      servicio: "Filtrar",
      nombre,
      residencia
    })
    
    return this.http.post<Investigador[]>(this.url, objeto, environment.cabecera());
  }
}
