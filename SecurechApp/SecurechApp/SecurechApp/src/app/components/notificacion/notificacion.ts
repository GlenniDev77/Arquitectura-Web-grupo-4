import { Component } from '@angular/core';
import { Notificacionlistar } from './notificacionlistar/notificacionlistar';
import { ActivatedRoute,RouterLink, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-notificacion',
  imports: [RouterOutlet,Notificacionlistar,MatTableModule,
    MatIconModule, MatButtonModule, 
    MatToolbarModule,MatMenuModule],
  templateUrl: './notificacion.html',
  styleUrl: './notificacion.css',
})
export class Notificacion {
  constructor(public route:ActivatedRoute){}
}
