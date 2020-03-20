import { Component, OnInit } from '@angular/core';
import { DescripcionInvestigadorService } from './descripcion-investigador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Investigador } from '../investigador';

@Component({
  selector: 'app-descripcion-investigador',
  templateUrl: './descripcion-investigador.component.html',
  styleUrls: ['./descripcion-investigador.component.css']
})
export class DescripcionInvestigadorComponent implements OnInit {

  public investigador:Investigador

  constructor(private servicioDescripcionInvestigador:DescripcionInvestigadorService, private router:Router, private ruta:ActivatedRoute) {
    this.investigador = <Investigador>{};
  }

  ngOnInit(){
    const id:number = this.ruta.snapshot.params["id"];
    this.servicioDescripcionInvestigador.obtenerInvestigador(id).subscribe(resultado=>{
      console.log(resultado);
      this.investigador = resultado;
    })
  }
}
