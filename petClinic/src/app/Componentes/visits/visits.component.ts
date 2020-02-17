import { Component, OnInit, Input, Output } from '@angular/core';
import { VisitsService } from 'src/app/Servicios/visits.service';
import { Visit } from 'src/app/Modelos/visit';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  @Input() visitas:Visit[];

  //@Output() eliminado = new EventEmitter();

  constructor(private servicioVisitas:VisitsService) { }

  ngOnInit() {
  }

  /*lanzar(event){
    this.eliminado.emit({})
  }*/

  borrarVisita(id:number){
    console.log("idVisita",id);
    this.servicioVisitas.delVisita(id).subscribe(resultado=>{
      console.log(resultado);
    })
  }
}
