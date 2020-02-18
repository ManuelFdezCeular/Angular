import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/Servicios/pet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/Modelos/pet';
import { OwnerService } from 'src/app/Servicios/owner.service';
import { Pettype } from 'src/app/Modelos/pettype';
import { Owner } from 'src/app/Modelos/owner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-pet',
  templateUrl: './form-pet.component.html',
  styleUrls: ['./form-pet.component.css']
})
export class FormPetComponent implements OnInit {

  private idPropietario:number = this.ruta.snapshot.params["id"];
  private nombrePropietario:string = this.ruta.snapshot.params["nombre"];
  private idMascota:number = this.ruta.snapshot.params["idMascota"];
  private mascota:Pet;
  private tipos:Pettype[];
  private accion:string;

  constructor(private servicioPet:PetService, private servicioOwner:OwnerService, private router:Router, private ruta:ActivatedRoute) { 
    this.mascota = <Pet>{};
    this.mascota.owner = <Owner>{};
    this.mascota.type = <Pettype>{};
    console.log(this.idMascota, this.idPropietario, this.nombrePropietario);
    if(this.idMascota == -1)
      this.accion = "Añadir";
    else{
      this.accion = "Modificar";
      this.servicioPet.getPetId(this.idMascota).subscribe(resultado=>{
        console.log(resultado);
        this.mascota = resultado;        
      })
    }
  }

  ngOnInit() {
    this.servicioOwner.getOwner(this.idPropietario).subscribe(resultado=>{
      this.mascota.owner = resultado;
    })
    this.servicioPet.listaTipos().subscribe(resultado=>{
      this.tipos = resultado;
      this.mascota.type = environment.SeleccionaObj(this.tipos, this.mascota.type);
    })
  }

  anadirOModificarMascota(){
    if(this.idMascota == -1){
      this.servicioPet.addPet(this.mascota).subscribe(resultado=>{
        this.router.navigate(['/owners/'+this.idPropietario]);
      })
    }else{
      this.servicioPet.modPet(this.mascota).subscribe(resultado=>{
        this.router.navigate(['owners/'+this.idPropietario]);
      })
    }
  }

}
