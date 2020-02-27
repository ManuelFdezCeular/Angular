import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vet } from '../Modelos/vet';

@Injectable({
  providedIn: 'root'
})
export class VetService {

  private urlAccion:string = "http://localhost/petClinic/servicios.php";

  constructor(private http:HttpClient) { }

  getVets(){
    let veterinarios = JSON.stringify({
      accion: "ListarVets"
    })

    return this.http.post<Vet[]>(this.urlAccion, veterinarios);
  }

  addVet(veterinario:Vet){
    let vet = JSON.stringify({
      accion: "AnadeVet",
      vet: veterinario
    })

    return this.http.post<Vet[]>(this.urlAccion, vet);
  }

  modVet(veterinario:Vet){
    let vet = JSON.stringify({
      accion: "ModificaVet",
      vet: veterinario
    })

    return this.http.post(this.urlAccion, vet);
  }

  delVet(id:number){
    let vet = JSON.stringify({
      accion: "BorraVet",
      id: id
    })

    return this.http.post(this.urlAccion, vet);
  }

  getVet(id:number){
    let vet = JSON.stringify({
      accion: "ObtenerVetId",
      id: id
    })

    return this.http.post<Vet>(this.urlAccion, vet);
  }

}
