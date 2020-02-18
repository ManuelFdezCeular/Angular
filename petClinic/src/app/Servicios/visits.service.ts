import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Visit } from '../Modelos/visit';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  private urlAccion:string = "http://localhost/petClinic/servicios.php";

  constructor(private http:HttpClient) { }

  delVisita(id:number){
    let visita = JSON.stringify({
      accion: "BorraVisit",
      id: id
    })

    return this.http.post<Visit[]>(this.urlAccion, visita);
  }

  addVisita(visita:Visit){
    let visitaNueva = JSON.stringify({
      accion: "AnadeVisit",
      visit: visita
    })

    return this.http.post<boolean>(this.urlAccion, visitaNueva);
  }

  modVisita(visita:Visit){
    let visitaMod = JSON.stringify({
      accion: "ModificaVisit",
      visit: visita
    })
    console.log("visitaMod", visitaMod);
    return this.http.post<boolean>(this.urlAccion, visitaMod);
  }

  obtenerVisita(id:number){
    let visita = JSON.stringify({
      accion: "ObtenerVisitId",
      id: id
    })

    return this.http.post<Visit>(this.urlAccion, visita);
  }

}
