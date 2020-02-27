import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vet } from 'src/app/Modelos/vet';
import { Especialidad } from 'src/app/Modelos/especialidad';
import { VetService } from 'src/app/Servicios/vet.service';
import { EspecialidadesService } from 'src/app/Servicios/especialidades.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-vet',
  templateUrl: './form-vet.component.html',
  styleUrls: ['./form-vet.component.css']
})
export class FormVetComponent implements OnInit {
  
  public accion:string;
  public veterinario:Vet;
  public especialidades:Especialidad[];
  public idVet:number;

  constructor(private servicioVeterinario:VetService, private servicioEsp:EspecialidadesService, private router:Router, private ruta:ActivatedRoute) { 
    this.idVet = this.ruta.snapshot.params["idVeterinario"];
    console.log("idVet es: ", this.idVet);
    this.especialidades = [];
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
      console.log("especialidades:", resultado);
      this.especialidades = resultado;
      if(this.idVet != -1)
        this.veterinario.specialties = environment.SeleccionaArrObj(this.especialidades, this.veterinario.specialties);
    })
  }

  anadirOModificarVeterinario(vet:Vet){
    console.log("anadir: ",vet)
    if(this.idVet == -1){
      this.servicioVeterinario.addVet(vet).subscribe(resultado=>{
        this.router.navigate(['/vets']);
      })
    }else{
      this.servicioVeterinario.modVet(vet).subscribe(resultado=>{
        this.router.navigate(['/vets']);
      })
    }
  }

}
