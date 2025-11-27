import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Zonalistar } from './zonalistar/zonalistar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Menu } from '../menu/menu';


@Component({
  selector: 'app-zona',
  imports: [RouterOutlet,Zonalistar,MatTableModule,
    MatIconModule, MatButtonModule, RouterLink, 
    MatToolbarModule,MatMenuModule, Menu
  ],
  templateUrl: './zona.html',
  styleUrl: './zona.css',
})
export class Zona {
  constructor(public route:ActivatedRoute){}
}
