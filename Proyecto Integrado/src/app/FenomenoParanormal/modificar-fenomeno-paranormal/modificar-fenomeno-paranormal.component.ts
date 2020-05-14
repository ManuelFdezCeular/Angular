import { Component, OnInit } from '@angular/core';;
import { Router, ActivatedRoute } from '@angular/router';
import { FenomenoParanormal } from '../fenomeno-paranormal';
import { Investigador } from 'src/app/Investigador/investigador';
import { Estado } from 'src/app/Estado/estado';
import { ModificarFenomenoParanormalService } from './modificar-fenomeno-paranormal.service';
import { DescripcionInvestigadorService } from 'src/app/Investigador/descripcion-investigador/descripcion-investigador.service';
import { ListarEstadosService } from 'src/app/Estado/listar-estados/listar-estados.service';
import { UpdateMenuService } from 'src/app/login/update-menu.service';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modificar-fenomeno-paranormal',
  templateUrl: './modificar-fenomeno-paranormal.component.html',
  styleUrls: ['./modificar-fenomeno-paranormal.component.css']
})
export class ModificarFenomenoParanormalComponent implements OnInit {

  public fenPar: FenomenoParanormal;
  public investigador: Investigador;
  public estados: Estado[];
  public idInvestigador: number = this.ruta.snapshot.params["idInvestigador"];
  public idFenPar: number = this.ruta.snapshot.params["idFenPar"];
  public mapa: mapboxgl.Map;
  public verMapa: boolean = false;
  public marcador: mapboxgl.Marker;
  public textoMapa: string = "Mostrar";
  public longitud:number;
  public latitud:number;

  constructor(private servicioModificar: ModificarFenomenoParanormalService, private servicioUpdateLogin: UpdateMenuService, private servicioInvestigador: DescripcionInvestigadorService,
    private servicioListar: ListarEstadosService, private router: Router, private ruta: ActivatedRoute) {
    this.servicioUpdateLogin.comprobarLogin();
    this.fenPar = <FenomenoParanormal>{};
  }

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapBoxToken;
    //  Hacemos esto de arriba, proque al instalar los tipos (npm install @types/mapbox-gl -D)
    //  me indica un error de tipo para el accessToken. Indica que es de solo lectura.
    //  Esta solución es un "apaño", pero el problema de mapbox.
    this.mapa = new mapboxgl.Map({
      container: 'mapa', // 
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 4.79
    });
    this.mapa.on('click', this.ponInfo);

    this.servicioModificar.obtenerFenPar(this.idFenPar).subscribe(resultado => {
      this.fenPar = resultado;
      this.latitud = this.fenPar.latitud;
      this.longitud = this.fenPar.longitud;
      this.mapa.setCenter([this.fenPar.longitud, this.fenPar.latitud]);
      this.marcador = new mapboxgl.Marker()
        .setLngLat([this.fenPar.longitud, this.fenPar.latitud])
        .addTo(this.mapa);
    },
      error => console.log(error))
    this.servicioInvestigador.obtenerInvestigador(this.idInvestigador).subscribe(resultado => {
      this.investigador = resultado;
    },
      error => console.log(error))
    this.servicioListar.listarEstados().subscribe(resultado => {
      this.estados = resultado;
    },
      error => console.log(error));
  }

  ponInfo = (e) => {
    //  Pongo el popup:
    /*var ventana = new mapboxgl.Popup({ closeOnClick: true })
      .setLngLat(e.lngLat)
      .setHTML(`Latitud: ${e.lngLat.lat}<br>
				Longitud: ${e.lngLat.lng}<br>
				Zoom: ${this.mapa.getZoom().toFixed(2)}`)
      .addTo(this.mapa);*/
    this.marcador.setLngLat(e.lngLat);
    this.fenPar.latitud = e.lngLat.lat;
    this.fenPar.longitud = e.lngLat.lng;
    /*this.fenPar.latitud = e.lngLat.lat;
    this.fenPar.longitud = e.lngLat.lng;*/
    //  Agrego el info al array listaVentanas:
    //  this.listaVentanas.push(ventana);
  }

  volverACoordenadas = () => {
    this.fenPar.latitud = this.latitud;
    this.fenPar.longitud = this.longitud;
    this.marcador.setLngLat([this.longitud, this.latitud]);
  }

  mostrarMapa() {
    this.verMapa = !this.verMapa;
    if (this.verMapa) {
      this.textoMapa = "Ocultar";
    } else {
      this.textoMapa = "Mostrar";
    }
  }

  modificarFenomenoParanormal() {
    this.fenPar.id = this.idFenPar;
    this.servicioModificar.modificar(this.fenPar).subscribe(resultado => {
      if(resultado.modificado == "correcto")
        this.router.navigate(['/investigador/' + this.idInvestigador]);
      else
        alert("Error al modificar el fenómeno");
    },
      error => console.log(error))
  }
}
