import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Investigador } from '../investigador';

@Injectable({
  providedIn: 'root'
})
export class DescripcionInvestigadorService {

  url = "http://localhost/AJAX/ServidorProyectoIntegrado/MiServicio.php";

  constructor(private http:HttpClient) { }

  obtenerInvestigador(id:number){
    let objeto = JSON.stringify({
      accion: "Investigador",
      id: id
    })

    return this.http.post<Investigador>(this.url, objeto);
  }
}
