import { Component, OnInit } from '@angular/core';
import { ListarArchivoService } from './listar-archivo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Archivo } from '../archivo';

@Component({
  selector: 'app-listar-archivo',
  templateUrl: './listar-archivo.component.html',
  styleUrls: ['./listar-archivo.component.css']
})
export class ListarArchivoComponent implements OnInit {

  public archivos:Archivo[];
  public mostrar:boolean = false;
  public archivo:Archivo;

  constructor(private servicioListarArchivos:ListarArchivoService, private router:Router, private ruta:ActivatedRoute) { }

  ngOnInit(){
    this.servicioListarArchivos.listar().subscribe(resultado=>{
      this.archivos = resultado;
    })
  }

  mostrarDiv(archivoABorrar:Archivo){
    this.archivo = archivoABorrar;
    this.mostrar = true;
    this.servicioListarArchivos.listar().subscribe(resultado=>{
      this.archivos = resultado;
    })
  }

  cancelarDiv(event){
    this.mostrar = false;
    this.servicioListarArchivos.listar().subscribe(resultado=>{
      this.archivos = resultado;
    })
  }
}
