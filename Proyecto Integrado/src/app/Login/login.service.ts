import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	private url = environment.urlLogin;
	private urlAbierta = environment.urlAbierta;
	private urlPrivada = environment.url;

	constructor(private http: HttpClient) { }

	getLogin(log) {
		//  Clonamos el objeto:
		let objeto = JSON.parse(JSON.stringify(log));
		//  Le añadimos el nuevo atributo, servicio:
		objeto.servicio = "Inicio_sesion";
		return this.http.post<any>(this.url, JSON.stringify(objeto));
	}


	checkCorreo(email:string){
		let objeto = JSON.stringify({
			servicio: "Comprobar_email",
			email
		});

		return this.http.post<any>(this.url, objeto);
	}

	recuperarContrasena(email:string){
		let objeto = JSON.stringify({
			servicio: "EnviarCorreoRecuperarClave",
			email
		})

		return this.http.post<any>(this.url, objeto);
	}

	reenviarCorreo(email:string){
		let objeto = JSON.stringify({
			servicio: "ReenvioCorreoConfirmacion",
			email
		})

		return this.http.post<any>(this.urlAbierta, objeto);
	}
}