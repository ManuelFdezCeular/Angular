import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/Modelos/owner';
import { OwnerService } from 'src/app/Servicios/owner.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-owner',
  templateUrl: './form-owner.component.html',
  styleUrls: ['./form-owner.component.css']
})
export class FormOwnerComponent implements OnInit {

  public accion:string;
  public propietario:Owner;
  public id:number = this.ruta.snapshot.params["id"];

  constructor(private servicioOwner:OwnerService, private router:Router, private ruta:ActivatedRoute) { 
    this.propietario = <Owner>{};
    if(this.id == -1){
      this.accion = 'Añadir';
    }else{
      this.accion = 'Modificar';
      this.servicioOwner.getOwner(this.id).subscribe(resultado=>{
        this.propietario = resultado;
      })
    }
  }

  ngOnInit() {
  }

  anadirOModificar(){
    if(this.id == -1){
      this.servicioOwner.addOwner(this.propietario).subscribe(resultado=>{
        this.router.navigate(['/owners']);
      })
    }else{
      this.servicioOwner.modOwner(this.propietario).subscribe(resultado=>{
        this.router.navigate(['/owners']);
      })
    }
  }

}
