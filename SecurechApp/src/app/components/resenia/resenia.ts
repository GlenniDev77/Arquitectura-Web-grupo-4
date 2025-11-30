import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Resenialistar } from './resenialistar/resenialistar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Menu } from '../menu/menu';

@Component({
  selector: 'app-resenia',
  imports: [RouterOutlet,Resenialistar,MatTableModule,
    MatIconModule, MatButtonModule, 
    MatToolbarModule,MatMenuModule],
  templateUrl: './resenia.html',
  styleUrl: './resenia.css',
})
export class Resenia {
  constructor(public route:ActivatedRoute){}
}
