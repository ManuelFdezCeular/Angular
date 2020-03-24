import { Component, OnInit } from '@angular/core';;
import { Router, ActivatedRoute } from '@angular/router';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { Investigador } from 'src/app/Investigador/investigador';
import { Estado } from 'src/app/Estado/estado';
import { ModificarFenomenoParanormalService } from './modificar-fenomeno-paranormal.service';
import { DescripcionInvestigadorService } from 'src/app/Investigador/descripcion-investigador/descripcion-investigador.service';
import { ListarEstadosService } from 'src/app/Estado/listar-estados/listar-estados.service';

@Component({
  selector: 'app-modificar-fenomeno-paranormal',
  templateUrl: './modificar-fenomeno-paranormal.component.html',
  styleUrls: ['./modificar-fenomeno-paranormal.component.css']
})
export class ModificarFenomenoParanormalComponent implements OnInit {

  public fenPar:FenomenoParanormal;
  public investigador:Investigador;
  public estados:Estado[];
  public idInvestigador:number = this.ruta.snapshot.params["idInvestigador"];
  public idFenPar:number = this.ruta.snapshot.params["idFenPar"];

  constructor(private servicioModificar:ModificarFenomenoParanormalService, private servicioInvestigador:DescripcionInvestigadorService, 
    private servicioListar:ListarEstadosService, private router:Router, private ruta:ActivatedRoute) { 
    this.servicioModificar.obtenerFenPar(this.idFenPar).subscribe(resultado=>{
      console.log("fenomeno Paranormal:", resultado);
      this.fenPar = resultado;
    })
    this.servicioInvestigador.obtenerInvestigador(this.idInvestigador).subscribe(resultado=>{
      console.log("investigador: ", resultado);
      this.investigador = resultado;
    })
    this.servicioListar.listarEstados().subscribe(resultado=>{
      console.log("estados: ", resultado);
      this.estados = resultado;
    })
  }

  ngOnInit() {
  }

  modificarFenomenoParanormal(){
    this.fenPar.id = this.idFenPar;
    this.servicioModificar.modificar(this.fenPar).subscribe(resultado=>{
      console.log("resultado", resultado);
      this.router.navigate(['/investigador/'+this.idInvestigador]);
    })
  }
}