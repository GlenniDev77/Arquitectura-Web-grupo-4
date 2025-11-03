import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TipoVehiculo } from './components/tipo-vehiculo/tipo-vehiculo';
import { Zona } from './components/zona/zona';

@Component({
  selector: 'app-root',
  imports: [TipoVehiculo,Zona],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SecurechApp');
}
