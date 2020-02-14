import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './Componentes/inicio/inicio.component';
import { OwnersComponent } from './Componentes/owners/owners.component';
import { HttpClientModule } from '@angular/common/http';
import { VetComponent } from './Componentes/vet/vet.component';
import { DetailOwnerComponent } from './Componentes/detail-owner/detail-owner.component';
import { FormOwnerComponent } from './Componentes/form-owner/form-owner.component';
import { FormsModule } from '@angular/forms'
import { FormPetComponent } from './Componentes/form-pet/form-pet.component';
import { FormVetComponent } from './Componentes/form-vet/form-vet.component';
import { FormVisitsComponent } from './Componentes/form-visits/form-visits.component';
import { PetsComponent } from './Componentes/pets/pets.component';
import { VisitsComponent } from './Componentes/visits/visits.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    OwnersComponent,
    VetComponent,
    DetailOwnerComponent,
    FormOwnerComponent,
    FormPetComponent,
    FormVetComponent,
    FormVisitsComponent,
    PetsComponent,
    VisitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
