import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Investigador } from '../investigador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescripcionInvestigadorService {

  url = environment.url;

  constructor(private http:HttpClient) { }

  obtenerInvestigador(id:number){
    let objeto = JSON.stringify({
      servicio: "Investigador",
      id: id
    })

    return this.http.post<Investigador>(this.url, objeto, environment.cabecera());
  }
}
