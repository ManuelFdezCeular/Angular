import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Investigador } from '../investigador';
import { BorrarInvestigadorService } from './borrar-investigador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-borrar-investigador',
  templateUrl: './borrar-investigador.component.html',
  styleUrls: ['./borrar-investigador.component.css']
})
export class BorrarInvestigadorComponent implements OnInit {

  @Input() investigador:Investigador;

  @Output() noMostrar = new EventEmitter();

  constructor(private servicioBorrar:BorrarInvestigadorService, private cerrarSesion:AppComponent, private router:Router, private ruta:ActivatedRoute) {}

  ngOnInit() {
  }

  borrarInvestigador(){
    this.servicioBorrar.borrarInvestigador(this.investigador.id).subscribe(resultado=>{
      if(resultado.borrado == "correcto"){
        this.noMostrar.emit(resultado);
        this.cerrarSesion.cerrarLoginAlBorrar();
      }else{
        alert("Error al borrar. Debe borrar los fenomenos paranormales definitivamente para poder marcharse.")
      }
    },
    error=>console.log(error))
  }

  noMostrarDiv(){
    this.noMostrar.emit(null);
  }
}
