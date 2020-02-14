import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/Modelos/owner';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from 'src/app/Servicios/owner.service';
import { PetService } from 'src/app/Servicios/pet.service';

@Component({
  selector: 'app-detail-owner',
  templateUrl: './detail-owner.component.html',
  styleUrls: ['./detail-owner.component.css']
})
export class DetailOwnerComponent implements OnInit {

  public propietario:Owner;
  public nombrePropietario:string;

  constructor(private servicioOwner:OwnerService, private servicioPet:PetService, private router:Router, private ruta:ActivatedRoute) {
    this.propietario = <Owner>{};
   }

  ngOnInit() {
    const id:number = this.ruta.snapshot.params["id"];
    this.servicioOwner.getOwner(id).subscribe(resultado=>{
      this.propietario = resultado;
      this.nombrePropietario = this.propietario.firstName+" "+this.propietario.lastName;
    })
  }

  borrar(propietario:Owner){
    console.log(propietario);
    if(confirm('Quiere borrar al propietario '+propietario.firstName+' '+propietario.lastName+'?')){
      this.servicioOwner.delOwner(propietario.id).subscribe(resultado=>{
        this.router.navigate(['/owners']);
      })
    }
  }
}
