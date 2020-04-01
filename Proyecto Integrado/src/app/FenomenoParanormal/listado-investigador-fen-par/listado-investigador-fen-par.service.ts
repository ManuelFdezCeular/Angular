import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListadoInvestigadorFenParService {

  url = environment.url;

  constructor(private http:HttpClient) { }

  listarFenParInvestigador(id:number){
    let objeto = JSON.stringify({
      accion: "FenParInvestigador",
      id: id
    })

    return this.http.post<FenomenoParanormal[]>(this.url, objeto);
  }
}
