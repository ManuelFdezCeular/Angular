import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Investigador } from '../investigador';

@Injectable({
  providedIn: 'root'
})
export class ListarInvestigadorService {

  url="http://localhost/AJAX/ServidorProyectoIntegrado/MiServicio.php";

  constructor(private http:HttpClient) { }

  obtenerInvestigadores(){
    let objeto = JSON.stringify({
      accion: "Investigadores"
    })

    return this.http.post<Investigador[]>(this.url, objeto);
  }
}
