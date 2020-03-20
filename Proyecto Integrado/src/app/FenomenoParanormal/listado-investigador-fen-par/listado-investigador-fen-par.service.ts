import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FenomenoParanormal } from '../fenomeno-paranormal';

@Injectable({
  providedIn: 'root'
})
export class ListadoInvestigadorFenParService {

  url="http://localhost/AJAX/ServidorProyectoIntegrado/MiServicio.php";

  constructor(private http:HttpClient) { }

  listarFenParInvestigador(id:number){
    let objeto = JSON.stringify({
      accion: "FenParInvestigador",
      id: id
    })

    return this.http.post<FenomenoParanormal[]>(this.url, objeto);
  }
}
