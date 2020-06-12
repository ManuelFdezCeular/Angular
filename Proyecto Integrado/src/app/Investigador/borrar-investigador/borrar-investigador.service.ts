import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BorrarInvestigadorService {

  url = environment.url;

  constructor(private http:HttpClient) { }

  borrarInvestigador(id:number){
    let objeto = JSON.stringify({
      servicio: "BorrarInvestigador",
      id
    })

    return this.http.post<any>(this.url, objeto, environment.cabecera());
  }
}
