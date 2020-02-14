import { Injectable } from '@angular/core';
import { Pet } from '../Modelos/pet';
import { HttpClient } from '@angular/common/http';
import { Pettype } from '../Modelos/pettype';
import { Owner } from '../Modelos/owner';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  
  private urlAccion:string = "http://localhost/petClinic/servicios.php";

  constructor(private http:HttpClient) { }

  getPetIdOwner(id:number){
    let mascotasPropietario = JSON.stringify({
      accion: "ListarPetsOwnerId",
      id: id
    })

    return this.http.post<Pet[]>(this.urlAccion, mascotasPropietario);
  }

  getPetId(id:number){
    let mascota = JSON.stringify({
      accion: "ObtenerPetId",
      id: id
    })

    return this.http.post<Pet>(this.urlAccion, mascota);
  }

  addPet(pet:Pet){
    let mascotaPropietario = JSON.stringify({
      accion:"AnadePet",
      pet: pet
    })

    return this.http.post<boolean>(this.urlAccion, mascotaPropietario);
  }

  listaTipos(){
    let tiposMascota = JSON.stringify({
      accion:"ListarPettypes"
    })

    return this.http.post<Pettype[]>(this.urlAccion, tiposMascota);
  }
  
  delMascota(id:number){
    let mascota = JSON.stringify({
      accion:"BorraPet",
      id: id
    })

    return this.http.post<boolean>(this.urlAccion, mascota);
  }

  modPet(mascota:Pet){
    let mascotaMod = JSON.stringify({
      accion: "ModificaPet",
      pet: mascota
    })

    return this.http.post<boolean>(this.urlAccion, mascotaMod);
  }

  getIdOwner(id:number){
    let mascota = JSON.stringify({
      accion: "ObtenerOwnerId",
      id: id
    })

    return this.http.post<Owner>(this.urlAccion, mascota);
  }
 
}
