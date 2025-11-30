import { Component } from '@angular/core';
import { DelitoListar } from './delito-listar/delito-listar';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-delito',
  imports: [RouterOutlet,DelitoListar,MatTableModule,
    MatIconModule, MatButtonModule, 
    MatToolbarModule,MatMenuModule],
  templateUrl: './delito.html',
  styleUrl: './delito.css',
})
export class Delito {
  constructor(public route:ActivatedRoute){}
}
