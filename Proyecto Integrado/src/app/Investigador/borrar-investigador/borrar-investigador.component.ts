import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Investigador } from '../investigador';
import { BorrarInvestigadorService } from './borrar-investigador.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-borrar-investigador',
  templateUrl: './borrar-investigador.component.html',
  styleUrls: ['./borrar-investigador.component.css']
})
export class BorrarInvestigadorComponent implements OnInit {

  @Input() investigador:Investigador;

  @Output() noMostrar = new EventEmitter();

  constructor(private servicioBorrar:BorrarInvestigadorService, private router:Router, private ruta:ActivatedRoute) {}

  ngOnInit() {
  }

  borrarInvestigador(){
    console.log('investigador a borrar:', this.investigador);
    this.servicioBorrar.borrarInvestigador(this.investigador.id).subscribe(resultado=>{
      this.noMostrar.emit(resultado);
      this.router.navigate(["/investigadores"]);
    })
  }

  noMostrarDiv(){
    this.noMostrar.emit(null);
  }
}
