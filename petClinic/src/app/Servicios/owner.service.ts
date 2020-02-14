import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Owner } from '../Modelos/owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private urlAccion:string = "http://localhost/petClinic/servicios.php";

  constructor(private http:HttpClient) { }

  getOwners(){
    let propietarios = JSON.stringify({
      accion: "ListarOwners"
    })

    return this.http.post<Owner[]>(this.urlAccion, propietarios);
  }

  getOwner(id:number){
    let propietario = JSON.stringify({
      accion: "ObtenerOwnerId",
      id: id
    })

    return this.http.post<Owner>(this.urlAccion, propietario);
  }

  addOwner(propietario:Owner){
    let anadirProp = JSON.stringify({
      accion: "AnadeOwner",
      owner: propietario
    })

    return this.http.post<Owner[]>(this.urlAccion, anadirProp);
  }

  modOwner(propietario:Owner){
    let modificarProp = JSON.stringify({
      accion: "ModificaOwner",
      owner: propietario
    })

    return this.http.post<Owner[]>(this.urlAccion, modificarProp);
  }

  delOwner(id:number){
    let borrarProp = JSON.stringify({
      accion: "BorraOwner",
      id: id,
      listado: 'OK'
    })
    return this.http.post<Owner[]>(this.urlAccion, borrarProp);
  }

}
