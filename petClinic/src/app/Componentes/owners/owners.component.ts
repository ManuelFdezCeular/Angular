import { Component, OnInit } from '@angular/core';
import { Owner } from '../../Modelos/owner';
import { OwnerService } from 'src/app/Servicios/owner.service';


@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  public propietarios:Owner[];

  constructor(private servicio:OwnerService ) { }

  ngOnInit() {
    this.servicio.getOwners().subscribe(resultado=>{
      this.propietarios = resultado;
      console.log(resultado);
    })
  }
}
