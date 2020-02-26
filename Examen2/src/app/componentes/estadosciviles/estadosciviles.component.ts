import { Component, OnInit } from '@angular/core';
import { EstadocivilService } from 'src/app/servicios/estadocivil.service';
import { Estadocivil } from 'src/app/modelos/estadocivil';

@Component({
  selector: 'app-estadosciviles',
  templateUrl: './estadosciviles.component.html',
  styleUrls: ['./estadosciviles.component.css']
})
export class EstadoscivilesComponent implements OnInit {

  public listaEstadosCiviles:Estadocivil[];

  constructor(private servicioEstCiv:EstadocivilService) { }

  ngOnInit() {
    this.servicioEstCiv.listarEstadoCivil().subscribe(resultado=>{
      this.listaEstadosCiviles = resultado;
    })
  }

}
