import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BorrarArchivoService {
 
  url="http://localhost/AJAX/ServidorProyectoIntegrado/MiServicio.php";

  constructor(private http:HttpClient) { }

  borrar(id:number){
    let objeto = JSON.stringify({
      accion: "BorrarArchivo",
      id: id
    })

    return this.http.post<boolean>(this.url, objeto);
  }
}
