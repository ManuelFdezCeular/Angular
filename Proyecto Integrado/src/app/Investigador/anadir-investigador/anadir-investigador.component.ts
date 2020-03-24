import { Component, OnInit } from '@angular/core';
import { Investigador } from '../investigador';
import { AnadirInvestigadorService } from './anadir-investigador.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anadir-investigador',
  templateUrl: './anadir-investigador.component.html',
  styleUrls: ['./anadir-investigador.component.css']
})
export class AnadirInvestigadorComponent implements OnInit {

  public investigador:Investigador;

  constructor(private servicioAnadirInvestigador:AnadirInvestigadorService, private router:Router, private ruta:ActivatedRoute) {
    this.investigador=<Investigador>{};
  }

  ngOnInit() {
  }

  anadirInvestigador(){
    console.log('investigador:', this.investigador);
    this.servicioAnadirInvestigador.anadir(this.investigador).subscribe(resultado=>{
      this.router.navigate(["/investigadores"]);
    })
  }
}
