import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estadocivil } from '../modelos/estadocivil';

@Injectable({
  providedIn: 'root'
})
export class EstadocivilService {
  
  private urlAccion:string = "http://localhost/Servicios/servicios.php";

  constructor(private http:HttpClient) { }

  listarEstadoCivil(){
    let estCiv = JSON.stringify({
      accion: 9
    })

    return this.http.post<Estadocivil[]>(this.urlAccion, estCiv);
  }
  
  obtenerSexos(){
    let sexo = JSON.stringify({
      accion: 5
    })

    return this.http.post<Estadocivil[]>(this.urlAccion, sexo);
  }
}
