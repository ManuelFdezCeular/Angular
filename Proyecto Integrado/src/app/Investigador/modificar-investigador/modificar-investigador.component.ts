import { Component, OnInit } from '@angular/core';
import { Investigador } from '../investigador';
import { ModificarInvestigadorService } from './modificar-investigador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DescripcionInvestigadorService } from '../descripcion-investigador/descripcion-investigador.service';
import { LoginService } from 'src/app/login/login.service';
import { UpdateMenuService } from 'src/app/login/update-menu.service';

@Component({
  selector: 'app-modificar-investigador',
  templateUrl: './modificar-investigador.component.html',
  styleUrls: ['./modificar-investigador.component.css']
})
export class ModificarInvestigadorComponent implements OnInit {

  public investigador:Investigador;
  public id:number = this.ruta.snapshot.params["id"];


  constructor(private servicioModificarServicio:ModificarInvestigadorService, private servicioUpdateLogin:UpdateMenuService, private servicioDescripcionInvestigador:DescripcionInvestigadorService, private router:Router, private ruta:ActivatedRoute) {
    this.servicioUpdateLogin.comprobarLogin();
    this.servicioDescripcionInvestigador.obtenerInvestigador(this.id).subscribe(resultado=>{
      this.investigador = resultado;
    },
    error => console.log(error))
  }

  ngOnInit() {
  }

  modificarInvestigador(){
    this.servicioModificarServicio.modificar(this.investigador).subscribe(resultado=>{
      this.router.navigate(["/investigador/"+this.id]);
    },
    error => console.log(error))
  }

  leerImagen(ficheros){
		// Cogemos el primer archivo
		const archivo = ficheros[0];
		// Creamos la instancia de FileReader
		let reader = new FileReader();
		//  Hacemos un apuntador al registro:
		let imagenPerfil = this.investigador;
		let creaImagenRedu = this.creaImagenRedu;
		
		reader.onload = function(){
			imagenPerfil.imagen = (<string>reader.result).split(",")[1];
			//  Creamos la imagen reducida:
			creaImagenRedu(imagenPerfil.imagen, imagenPerfil);
    }
    reader.readAsDataURL(archivo);
	}

	creaImagenRedu(datos, imagenPerfil:any){
		let imagen = new Image();
		imagen.onload = ()=> {
      //  Creamos el canvas:
      let canvasRedu = document.createElement('canvas');
      let ctxRedu = canvasRedu.getContext("2d");
      //  Le damos unas dimensiones:
      canvasRedu.width = 100;
      canvasRedu.height = 100;
      ctxRedu.drawImage(imagen, 0, 0, canvasRedu.width, canvasRedu.height);
      imagenPerfil.imagen = canvasRedu.toDataURL("image/jpeg").split(",")[1];
    }
    imagen.src = "data:image/jpeg;base64," + datos;
	}
}
