import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
	providedIn: 'root'
})
export class UpdateMenuService {

	
	private resLogin: Object;
	private resLogin$ = new Subject<any>();

	constructor(private http:HttpClient, private ruta:Router) {
		this.resLogin = { login: false, usuario: "", idUsuario: -1 };
	}

	//  Actualizamos el observable:
	establecerLogin(res: Object) {
		this.resLogin = res;
		this.resLogin$.next(this.resLogin);
	}

	//  Ofrecemos el observable:
	ObtenerResLogin$(): Observable<any> {
		return this.resLogin$.asObservable();
	}

	ObtenerInicial(): any {
		return this.resLogin;
	}
	
	//  Con este método conseguimos validar si el JWT actual es válido:
	validarLogin(){
		return this.http.post<any>(environment.url, '{"accion":"nada"}', environment.cabecera());
	}

	comprobarLogin(){
		if ((!localStorage.JWT) || ((localStorage.JWT.split(".").length != 3))) {
			//  No hay JWT, o no tiene el formato correcto.
			//  Vamos a inicio:
			this.ruta.navigate(['/']);
		  } else {
			this.validarLogin().subscribe(
			  res =>{
				if (!res.accion) {  //  Si no devuelve servicio, es que el JWT NO es válido.
				  //  Vamos a inicio:
				  this.ruta.navigate(['/']);
				}else{
					this.establecerLogin({login: true, usuario: localStorage.nombreUsuario, idUsuario: localStorage.idUsuario});
				}
			  },
			  error => console.log(error)
			);
		  }
	}
}