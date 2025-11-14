import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';

@Component({
  selector: 'app-usuario-listar',
  imports: [MatTableModule,CommonModule,MatIconModule,RouterLink , MatButtonModule,RouterLink],
  templateUrl: './usuario-listar.html',
  styleUrl: './usuario-listar.css',
})
export class UsuarioListar implements OnInit{
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd','e','f','FK','g','j'];

  constructor(private sS: Usuarioservice) {}
  ngOnInit(): void {

    this.sS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.sS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }  
  eliminar(id:number){
    this.sS.delete(id).subscribe(data=>{
      this.sS.list().subscribe(data=>{
        this.sS.setList(data)
      })
    })
  }
}
