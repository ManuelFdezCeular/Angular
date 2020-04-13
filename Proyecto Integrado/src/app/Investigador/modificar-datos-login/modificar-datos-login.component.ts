import { Component, OnInit } from '@angular/core';
import { ModificarDatosLoginService } from './modificar-datos-login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Investigador } from '../investigador';
import * as CryptoJS from 'crypto-js';
import { LoginService } from 'src/app/login/login.service';
import { UpdateMenuService } from 'src/app/login/update-menu.service';

@Component({
  selector: 'app-modificar-datos-login',
  templateUrl: './modificar-datos-login.component.html',
  styleUrls: ['./modificar-datos-login.component.css']
})
export class ModificarDatosLoginComponent implements OnInit {

  public investigador:Investigador;
  public id:number = this.ruta.snapshot.params["id"];
  public modificar;
  public correoCorrecto:boolean = true;
  public checkCorreo:boolean = false;

  constructor(private servicioModificarDatosLogin:ModificarDatosLoginService, private servicioUpdateLogin:UpdateMenuService, private servicioLogin:LoginService, private router:Router, private ruta:ActivatedRoute) {
    this.modificar = {clave: "", clave1_SIN: "", clave2_SIN: "", email: ""};
    this.servicioUpdateLogin.comprobarLogin();
  }

  ngOnInit() {
  }

  checkEmail(email:string){
		this.checkCorreo = true;
		this.servicioLogin.checkCorreo(email).subscribe(
			res=>{
				console.log(res);
				//  Alza la bandera si el correo está libre, o no:
				this.correoCorrecto = (res.estado && res.estado == "libre");
				this.checkCorreo = false;
			},
			error=>console.log(error)
		);
  }
  
  modificarDatos(){
    this.modificar.clave = CryptoJS.SHA3(this.modificar.clave1_SIN).toString(CryptoJS.enc.Base64);

    this.servicioModificarDatosLogin.modificarDatosLogin(this.modificar.clave, this.modificar.email).subscribe(resultado=>{
      alert('Modificado con éxito');
      this.router.navigate(['/investigador/'+this.id]);
    })
  }

}
