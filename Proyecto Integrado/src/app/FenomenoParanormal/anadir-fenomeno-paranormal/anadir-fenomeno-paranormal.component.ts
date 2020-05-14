import { Component, OnInit } from '@angular/core';
import { AnadirFenomenoParanormalService } from './anadir-fenomeno-paranormal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { DescripcionInvestigadorService } from 'src/app/Investigador/descripcion-investigador/descripcion-investigador.service';
import { Investigador } from 'src/app/Investigador/investigador';
import { Estado } from 'src/app/Estado/estado';
import { ListarEstadosService } from 'src/app/Estado/listar-estados/listar-estados.service';
import { UpdateMenuService } from 'src/app/login/update-menu.service';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-anadir-fenomeno-paranormal',
  templateUrl: './anadir-fenomeno-paranormal.component.html',
  styleUrls: ['./anadir-fenomeno-paranormal.component.css']
})
export class AnadirFenomenoParanormalComponent implements OnInit {

  public fenPar:FenomenoParanormal;
  public investigador:Investigador;
  public estados:Estado[];
  public idInvestigador:number =  this.ruta.snapshot.params["idInvestigador"];
  public mapa:mapboxgl.Map;
  public verMapa:boolean = false;
  public marcador:mapboxgl.Marker;
  public textoMapa:string = "Mostrar";

  constructor(private anadirServicio:AnadirFenomenoParanormalService, private servicioUpdateLogin:UpdateMenuService, private servicioListar:ListarEstadosService, private servicioInvestigador:DescripcionInvestigadorService, private router:Router, private ruta:ActivatedRoute) {
    this.servicioUpdateLogin.comprobarLogin();
    this.fenPar = <FenomenoParanormal>{};
    this.investigador = <Investigador>{};
  }

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapBoxToken;
		//  Hacemos esto de arriba, proque al instalar los tipos (npm install @types/mapbox-gl -D)
		//  me indica un error de tipo para el accessToken. Indica que es de solo lectura.
		//  Esta solución es un "apaño", pero el problema de mapbox.

		this.mapa = new mapboxgl.Map({
			container: 'mapa', // 
			style: 'mapbox://styles/mapbox/streets-v11', 
			center: [-3.70355734267946, 40.4165712569808], 
			zoom: 4.79
    });
		//  Le agrego los eventos al mapa:
    this.mapa.on('click', this.ponInfo);
    
    this.servicioInvestigador.obtenerInvestigador(this.idInvestigador).subscribe(resultado=>{
      this.investigador = resultado;
    },
    error => console.log(error))
    this.servicioListar.listarEstados().subscribe(resultado=>{
      this.estados = resultado;
    },
    error => console.log(error))
  }

  ponInfo = (e)=>{
		//  Pongo el popup:
		var ventana = new mapboxgl.Popup({closeOnClick: true})
		.setLngLat(e.lngLat)
		.setHTML(`Latitud: ${e.lngLat.lat}<br>
				Longitud: ${e.lngLat.lng}<br>
				Zoom: ${this.mapa.getZoom().toFixed(2)}`)
    .addTo(this.mapa);
    this.fenPar.latitud = e.lngLat.lat;
    this.fenPar.longitud = e.lngLat.lng;
		//  Agrego el info al array listaVentanas:
		//  this.listaVentanas.push(ventana);
  }
  
  mostrarMapa(){
    this.verMapa = !this.verMapa;
    if(this.verMapa){
      this.textoMapa = "Ocultar";
    }else{
      this.textoMapa = "Mostrar";
    }
  }

  anadirFenomenoParanormal(){
    this.fenPar.investigador_id = this.idInvestigador;
    this.anadirServicio.anadirFenPar(this.fenPar).subscribe(resultado=>{
      this.router.navigate(["/investigador/"+this.idInvestigador]);
    },
    error => console.log(error))
  }
}
