import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { OwnersComponent } from './Componentes/owners/owners.component';
import { VetComponent } from './Componentes/vet/vet.component';
import { DetailOwnerComponent } from './Componentes/detail-owner/detail-owner.component';
import { FormOwnerComponent } from './Componentes/form-owner/form-owner.component';
import { FormPetComponent } from './Componentes/form-pet/form-pet.component';
import { FormVetComponent } from './Componentes/form-vet/form-vet.component';
import { FormVisitsComponent } from './Componentes/form-visits/form-visits.component';


const routes: Routes = [
  {
    path: "",
    component: InicioComponent
  },
  {
    path: "owners",
    component: OwnersComponent
  },
  {
    path: "vets",
    component: VetComponent
  },
  {
    path: "owners/:id",
    component: DetailOwnerComponent
  },
  {
    path: "owners-add/:id",
    component: FormOwnerComponent
  },
  {
    path: "pets-add/:id/:nombre/",
    component: FormPetComponent
  },
  {
    path: "pets-add/:id/:nombre/:idMascota",
    component: FormPetComponent
  },
  {
    path: "vets-add/:idVeterinario",
    component: FormVetComponent
  },
  {
    path: "visits-add/:idVisita/:idMascota",
    component: FormVisitsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
