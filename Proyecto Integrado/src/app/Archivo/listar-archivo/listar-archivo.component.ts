import { Component, OnInit } from '@angular/core';
import { ListarArchivoService } from './listar-archivo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Archivo } from '../archivo';
import { UpdateMenuService } from 'src/app/login/update-menu.service';

@Component({
  selector: 'app-listar-archivo',
  templateUrl: './listar-archivo.component.html',
  styleUrls: ['./listar-archivo.component.css']
})
export class ListarArchivoComponent implements OnInit {

  public archivos:Archivo[];
  public mostrar:boolean = false;
  public archivo:Archivo;
  public idUsuario;
  public busqueda: {nombre:string, lugar:string};

  constructor(private servicioListarArchivos:ListarArchivoService, private servicioUpdateLogin:UpdateMenuService, private router:Router, private ruta:ActivatedRoute) {
    this.servicioUpdateLogin.comprobarLogin();
    this.idUsuario = localStorage.getItem('idUsuario');
    this.busqueda = {nombre:"", lugar:""};
  }

  ngOnInit(){
    this.servicioListarArchivos.listar().subscribe(resultado=>{
      this.archivos = resultado;
    },
    error => console.log(error))
  }

  mostrarDiv(archivoABorrar:Archivo){
    this.archivo = archivoABorrar;
    this.mostrar = true;
    this.servicioListarArchivos.listar().subscribe(resultado=>{
      this.archivos = resultado;
    },
    error => console.log(error))
  }

  cancelarDiv(event){
    this.mostrar = false;
    this.servicioListarArchivos.listar().subscribe(resultado=>{
      this.archivos = resultado;
    },
    error => console.log(error))
  }

  buscar(){
    this.servicioListarArchivos.filtrarArchivo(this.busqueda.nombre, this.busqueda.lugar).subscribe(resultado=>{
      this.archivos = resultado;
    },
    error=>console.log(error))
  }
}
