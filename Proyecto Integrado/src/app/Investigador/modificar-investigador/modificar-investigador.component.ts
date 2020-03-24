import { Component, OnInit } from '@angular/core';
import { Investigador } from '../investigador';
import { ModificarInvestigadorService } from './modificar-investigador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DescripcionInvestigadorService } from '../descripcion-investigador/descripcion-investigador.service';

@Component({
  selector: 'app-modificar-investigador',
  templateUrl: './modificar-investigador.component.html',
  styleUrls: ['./modificar-investigador.component.css']
})
export class ModificarInvestigadorComponent implements OnInit {
  
  public investigador:Investigador;
  public id:number = this.ruta.snapshot.params["id"];


  constructor(private servicioModificarServicio:ModificarInvestigadorService, private servicioDescripcionInvestigador:DescripcionInvestigadorService, private router:Router, private ruta:ActivatedRoute) {
    this.servicioDescripcionInvestigador.obtenerInvestigador(this.id).subscribe(resultado=>{
      this.investigador = resultado;
    })
  }

  ngOnInit() {
  }

  modificarInvestigador(){
    this.servicioModificarServicio.modificar(this.investigador).subscribe(resultado=>{
      this.router.navigate(["/investigador/"+this.id]);
    })
  }

}