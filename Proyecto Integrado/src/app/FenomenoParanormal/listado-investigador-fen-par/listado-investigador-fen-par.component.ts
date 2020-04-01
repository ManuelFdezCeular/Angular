import { Component, OnInit, Input } from '@angular/core';
import { ListadoInvestigadorFenParService } from './listado-investigador-fen-par.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FenomenoParanormal } from '../fenomeno-paranormal';

@Component({
  selector: 'app-listado-investigador-fen-par',
  templateUrl: './listado-investigador-fen-par.component.html',
  styleUrls: ['./listado-investigador-fen-par.component.css']
})
export class ListadoInvestigadorFenParComponent implements OnInit {

  @Input() idInvestigador:number;
  @Input() mostrarOpciones:boolean;
  public fenPar:FenomenoParanormal[];
  public mostrar:boolean;

  constructor(private servicioListadoFenParInvestigador:ListadoInvestigadorFenParService, private router:Router, private ruta:ActivatedRoute) { }

  ngOnInit(){
    this.servicioListadoFenParInvestigador.listarFenParInvestigador(this.idInvestigador).subscribe(resultado=>{
      this.fenPar = resultado;
      if(this.fenPar.length>0)
        this.mostrar = true;
      else
        this.mostrar = false;
    })
  }
}
