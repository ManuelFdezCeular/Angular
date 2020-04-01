import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	private url = environment.urlLogin;

	constructor(private http: HttpClient) { }

	getLogin(log) {
		//  Clonamos el objeto:
		let objeto = JSON.parse(JSON.stringify(log));
		//  Le añadimos el nuevo atributo, servicio:
		objeto.servicio = "inicio_sesion";
		console.log("objeto en login:", objeto);
		return this.http.post<any>(this.url, JSON.stringify(objeto));
	}


	checkCorreo(email:string){
		const objeto = JSON.stringify({
			servicio: "Comprobar_email",
			email
		});
		return this.http.post<any>(this.url, objeto);
	}
}

/*private urlLogin = environment.API_URL_Login;
	private url = environment.API_URL;

	constructor(private http: HttpClient) {
	}

	getLogin(log){
		//  Clonamos el objeto:
		let pa = JSON.parse(JSON.stringify(log));
		//  Le añadimos el nuevo atributo, servicio:
		pa.servicio = "inicio_sesion";
		return this.http.post<any>(this.urlLogin, JSON.stringify(pa));
	}


	checkCorreo(email:string){
		const pa = JSON.stringify({
			servicio: "comprobar_email",
			email
		});
		return this.http.post<any>(this.urlLogin, pa);
	}


	registro(nombre:string, apellidos:string, email:string, claveHash:string) {
		const pa = JSON.stringify({
			servicio: "registro",
			CONTROL: "EstoEsUnControl",
			nombre,
			apellidos,
			email,
			clave: claveHash
		});
		console.log(pa);
		return this.http.post<any>(this.urlLogin, pa);
	}


	//  Con este método conseguimos validar si el JWT actual es válido:
	validarLogin(){
		return this.http.post<any>(this.url, '{"servicio":"nada"}', environment.cabecera());
	} */