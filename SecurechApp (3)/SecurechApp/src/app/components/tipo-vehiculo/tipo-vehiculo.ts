import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { TipoVehiculoListar } from './tipo-vehiculo-listar/tipo-vehiculo-listar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Menu } from '../menu/menu';


@Component({
  selector: 'app-tipo-vehiculo',
  imports: [RouterOutlet,TipoVehiculoListar,MatTableModule,
    MatIconModule, MatButtonModule, MatToolbarModule,
    MatMenuModule
  ],
  templateUrl: './tipo-vehiculo.html',
  styleUrl: './tipo-vehiculo.css',
})
export class TipoVehiculo {
  constructor(public route:ActivatedRoute){}
}
