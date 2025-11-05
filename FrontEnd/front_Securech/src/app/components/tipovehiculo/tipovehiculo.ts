import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaVehiculo } from './lista-vehiculo/lista-vehiculo';


@Component({
  selector: 'app-tipovehiculo',
  imports: [RouterOutlet, ListaVehiculo],
  templateUrl: './tipovehiculo.html',
  styleUrl: './tipovehiculo.css',
})
export class Tipovehiculo {
  constructor(public route:ActivatedRoute){}
}
