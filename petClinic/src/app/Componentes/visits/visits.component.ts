import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VisitsService } from 'src/app/Servicios/visits.service';
import { Visit } from 'src/app/Modelos/visit';
import { Pet } from 'src/app/Modelos/pet';
import { PetService } from 'src/app/Servicios/pet.service';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  @Input() visitas:Visit[];
  @Input() idMascota:number;
  public mascota:Pet;

  @Output() eliminado = new EventEmitter();

  constructor(private servicioVisitas:VisitsService, private servicioMascotas:PetService) {
    console.log("visitas",this.visitas);
   }

  ngOnInit() {
  }

  borrarVisita(id:number){
    this.servicioMascotas.getPetId(this.idMascota).subscribe(resultado=>{
      this.mascota = resultado;
      if(confirm("Quiere borrar a la visita de "+this.mascota.name)){
        this.servicioVisitas.delVisita(id).subscribe(resultado=>{
          this.eliminado.emit(resultado);
        })
      }
    })
  }
}
