import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Archivo } from '../archivo';

@Injectable({
  providedIn: 'root'
})
export class ListarArchivoService {

  url="http://localhost/AJAX/ServidorProyectoIntegrado/MiServicio.php";

  constructor(private http:HttpClient) { }

  listar(){
    let objeto = JSON.stringify({
      accion: "Archivos"
    })

    return this.http.post<Archivo[]>(this.url, objeto);
  }

}
