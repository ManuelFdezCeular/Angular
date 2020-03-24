import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProyectoIntegrado';

  public navBar = {
    isNavbarCollapsed: true,
    dropdown: true,
    investigadores: {
      dropdown: true
    },
    fenomenosParanormales: {
      dropdown: true
    }
  }
}