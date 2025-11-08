import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TipoVehiculoListar } from './tipo-vehiculo-listar/tipo-vehiculo-listar';


@Component({
  selector: 'app-tipo-vehiculo',
  imports: [RouterOutlet,TipoVehiculoListar],
  templateUrl: './tipo-vehiculo.html',
  styleUrl: './tipo-vehiculo.css',
})
export class TipoVehiculo {
  constructor(public route:ActivatedRoute){}
}
