import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { ArchivaFenParService } from './archivar-fen-par.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Archivo } from 'src/app/Archivo/archivo';
@Component({
  selector: 'app-archivar-fenomeno-paranormal',
  templateUrl: './archivar-fenomeno-paranormal.component.html',
  styleUrls: ['./archivar-fenomeno-paranormal.component.css']
})
export class ArchivarFenomenoParanormalComponent implements OnInit {

  public idFenPar:number = this.ruta.snapshot.params["idFenPar"];
  public fenPar:FenomenoParanormal;
  public archivo:Archivo;

  constructor(private servicioArchivar:ArchivaFenParService, private router:Router, private ruta:ActivatedRoute) {
    this.servicioArchivar.obtenerFenPar(this.idFenPar).subscribe(resultado=>{
      this.fenPar = resultado;
    });
    this.archivo = <Archivo>{};
  }

  ngOnInit() {
  }

  archivarFenomenoParanormal(){
    this.archivo.investigador_id = this.fenPar.investigador_id;
    this.servicioArchivar.archivar(this.archivo).subscribe(resultado=>{
      if(resultado){
        this.servicioArchivar.borrar(this.idFenPar).subscribe(resultado=>{
          this.router.navigate(["/investigador/"+this.fenPar.investigador_id]);
        })
      }else{
        console.log("No se pudo archivar el fenomeno paranormal");
      }
    })
  }
}
