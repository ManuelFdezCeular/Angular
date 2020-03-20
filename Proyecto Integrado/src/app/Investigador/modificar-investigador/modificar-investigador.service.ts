import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Investigador } from '../investigador';

@Injectable({
  providedIn: 'root'
})
export class ModificarInvestigadorService {
  
  url = "http://localhost/AJAX/ServidorProyectoIntegrado/MiServicio.php";

  constructor(private http:HttpClient) { }

  modificar(investigador:Investigador){
    let objeto = JSON.stringify({
      accion: "ModificarInvestigador",
      investigador: investigador
    })

    return this.http.post<boolean>(this.url, objeto);
  }
}
