import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: true,
  mapBoxToken: 'pk.eyJ1IjoibWFudWVsamZjIiwiYSI6ImNrM3ptdjNheDFydmszbW8xcDc2ZWJiYTMifQ.FU9dx0mUfPWztiTrgnnnmw',

  urlLogin: "servidor/login.php",
  url: "servidor/MiServicioPrivado.php",
  urlAbierta: "servidor/MiServicio.php",

  cabecera: function(){
		let headers = { headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + localStorage.JWT
		})};
		return headers;
	},
};
