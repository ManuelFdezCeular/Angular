import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FenomenoParanormal } from '../fenomeno-paranormal';

@Injectable({
  providedIn: 'root'
})
export class ListadoFenParService {
  
  url = "http://localhost/AJAX/ServidorProyectoIntegrado/MiServicio.php";

  constructor(private http:HttpClient) { }

  listarFenPar(){
    let objeto = JSON.stringify({
      accion: "FenomenosParanormales"
    })

    return this.http.post<FenomenoParanormal[]>(this.url, objeto);
  }
}
