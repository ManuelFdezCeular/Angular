import { Component, OnInit } from '@angular/core';
import { Vet } from 'src/app/Modelos/vet';
import { VetService } from 'src/app/Servicios/vet.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vet',
  templateUrl: './vet.component.html',
  styleUrls: ['./vet.component.css']
})
export class VetComponent implements OnInit {

  public veterinarios:Vet[];
  public veterinario:Vet;

  constructor(private servicio:VetService, private router:Router, private ruta:ActivatedRoute) {
    this.veterinario = <Vet>{};
  }

  ngOnInit() {
    this.servicio.getVets().subscribe(resultado=>{
      this.veterinarios = resultado;
      console.log(resultado);
    })
  }

  anadir(){
    this.servicio.addVet(this.veterinario).subscribe(resultado=>{
      this.router.navigate(['/vets']);
    })
  }
}
