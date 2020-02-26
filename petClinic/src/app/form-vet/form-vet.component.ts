import { Component, OnInit } from '@angular/core';
import { VetService } from '../Servicios/vet.service';
import { Vet } from '../Modelos/vet';
import { Router, ActivatedRoute } from '@angular/router';
import { Especialidad } from '../Modelos/especialidad';
import { EspecialidadesService } from '../Servicios/especialidades.service';

@Component({
  selector: 'app-form-vet',
  templateUrl: './form-vet.component.html',
  styleUrls: ['./form-vet.component.css']
})
export class FormVetComponent implements OnInit {
  
  public accion:string;
  public veterinario:Vet;
  public especialidades:Especialidad[];
  public idVet:number = this.ruta.snapshot.params["idVeterinario"];

  constructor(private servicioVeterinario:VetService, private servicioEsp:EspecialidadesService, private router:Router, private ruta:ActivatedRoute) { 
    this.veterinario = <Vet>{};
    if(this.idVet == -1){
      this.accion = "Añadir";
    }else{
      this.accion = "Modificar";
      this.servicioVeterinario.getVet(this.idVet).subscribe(resultado=>{
        console.log("veterinario:", resultado);
        this.veterinario = resultado;
      })
    }
  }

  ngOnInit() {
    this.servicioEsp.getEspecialidades().subscribe(resultado=>{
      this.especialidades = resultado;
    })
  }

}
