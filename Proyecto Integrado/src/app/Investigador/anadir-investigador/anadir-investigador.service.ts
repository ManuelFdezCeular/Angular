import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Investigador } from '../investigador';

@Injectable({
  providedIn: 'root'
})
export class AnadirInvestigadorService {

  url="http://localhost/AJAX/ServidorProyectoIntegrado/MiServicio.php";

  constructor(private http:HttpClient) { }

  anadir(investigador:Investigador){
    let objeto = JSON.stringify({
      accion: "AnadirInvestigador",
      investigador: investigador
    })
    console.log("investigador en servicio: ", objeto);
    return this.http.post<boolean>(this.url, objeto);
  }
}
