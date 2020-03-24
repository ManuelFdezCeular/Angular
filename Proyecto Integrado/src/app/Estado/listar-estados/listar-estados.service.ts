import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../estado';

@Injectable({
  providedIn: 'root'
})
export class ListarEstadosService {
  
  url="http://localhost/AJAX/ServidorProyectoIntegrado/MiServicio.php";

  constructor(private http:HttpClient) { }

  listarEstados(){
    let objeto = JSON.stringify({
      accion: "Estados"
    })

    return this.http.post<Estado[]>(this.url, objeto);
  }
}
