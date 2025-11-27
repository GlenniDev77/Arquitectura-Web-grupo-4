import { Component } from '@angular/core';
import { Rutalistar } from './rutalistar/rutalistar';
import { ActivatedRoute,RouterLink, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-ruta',
  imports: [RouterOutlet,Rutalistar,MatTableModule,
    MatIconModule, MatButtonModule, 
    MatToolbarModule,MatMenuModule],
  templateUrl: './ruta.html',
  styleUrl: './ruta.css',
})
export class Ruta {
  constructor(public route:ActivatedRoute){}
}
