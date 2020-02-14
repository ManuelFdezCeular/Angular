import { Component, OnInit } from '@angular/core';
import { VisitsService } from 'src/app/Servicios/visits.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PetService } from 'src/app/Servicios/pet.service';
import { Owner } from 'src/app/Modelos/owner';
import { Visit } from 'src/app/Modelos/visit';
import { Pet } from 'src/app/Modelos/pet';

@Component({
  selector: 'app-form-visits',
  templateUrl: './form-visits.component.html',
  styleUrls: ['./form-visits.component.css']
})
export class FormVisitsComponent implements OnInit {

  public accion:string;
  public idVisita = this.ruta.snapshot.params["idVisita"];
  public idMascota = this.ruta.snapshot.params["idMascota"];
  public propietario:Owner;
  public visita:Visit;
  
  constructor(private servicioVisitas:VisitsService, private servicioPets:PetService, private router:Router, private ruta:ActivatedRoute) {
    this.propietario = <Owner>{};
    this.visita = <Visit>{};
    this.visita.pet = <Pet>{}
    if(this.idVisita == -1){
      this.accion = "Añadir";
    }else{
      this.accion = "Modificar";
      this.servicioVisitas.obtenerVisita(this.idVisita).subscribe(resultado=>{
        console.log("visita", resultado);
        this.visita = resultado;
      })
    }
  }

  ngOnInit() {
    this.servicioPets.getIdOwner(this.idMascota).subscribe(resultado=>{
      console.log(resultado);
      this.propietario = resultado;
    })

    this.servicioPets.getPetId(this.idMascota).subscribe(resultado=>{
      this.visita.pet = resultado;
    })
  }

  anadirOModificarVisita(){
    console.log("Visita", this.visita);
    console.log("idVisita",this.idVisita);
    if(this.idVisita == -1){
      this.servicioVisitas.addVisita(this.visita).subscribe(resultado=>{
        console.log("Añade");
        this.router.navigate(['/owners/'+this.propietario.id]);
      })
    }else{
      this.servicioVisitas.modVisita(this.visita).subscribe(resultado=>{
        this.router.navigate(['/owners/'+this.propietario.id]);
      })
    }
  }

}
