import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BorrarInvestigadorService {

  url = "http://localhost/AJAX/ServidorProyectoIntegrado/MiServicio.php";

  constructor(private http:HttpClient) { }

  borrarInvestigador(id:number){
    let objeto = JSON.stringify({
      accion: "BorrarInvestigador",
      id: id
    })

    return this.http.post<boolean>(this.url, objeto);
  }
}
