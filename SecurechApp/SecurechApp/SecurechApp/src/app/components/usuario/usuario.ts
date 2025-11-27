import { Component } from '@angular/core';
import { UsuarioListar } from './usuario-listar/usuario-listar';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-usuario',
  imports: [RouterOutlet,UsuarioListar,MatTableModule,
    MatIconModule, MatButtonModule, 
    MatToolbarModule,MatMenuModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {
  constructor(public route:ActivatedRoute){}
}
