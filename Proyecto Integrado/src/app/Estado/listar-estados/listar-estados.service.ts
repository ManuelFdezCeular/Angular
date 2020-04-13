import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../estado';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListarEstadosService {
  
  url = environment.url;

  constructor(private http:HttpClient) { }

  listarEstados(){
    let objeto = JSON.stringify({
      accion: "Estados"
    })

    return this.http.post<Estado[]>(this.url, objeto, environment.cabecera());
  }
}
