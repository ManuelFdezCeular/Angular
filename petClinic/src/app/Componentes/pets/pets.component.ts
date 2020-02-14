import { Component, OnInit, Input } from '@angular/core';
import { Pet } from 'src/app/Modelos/pet';
import { PetService } from 'src/app/Servicios/pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  @Input() idPropietario:number;
  @Input() nombrePropietario:string;
  public mascotas:Pet[];
  public mascota:Pet;

  constructor(private servicio:PetService) {}

  ngOnInit() {
    console.log(this.idPropietario);
    this.servicio.getPetIdOwner(this.idPropietario).subscribe(resultado=>{
      console.log(resultado);
      this.mascotas = resultado;
    })
  }

  borrarMascota(id:number){
    this.servicio.getPetId(id).subscribe(pet=>{
      this.mascota = pet;
      if(confirm('Quieres borrar a la mascota '+this.mascota.name)){
        this.servicio.delMascota(id).subscribe(resultado=>{
          this.servicio.getPetIdOwner(this.idPropietario).subscribe(resultado=>{
            console.log(resultado);
            this.mascotas = resultado;
          })
        })
      }
    })
  }
}
