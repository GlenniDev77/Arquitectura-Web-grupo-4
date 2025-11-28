import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-usuario-listar',
  imports: [MatTableModule,CommonModule,
    MatIconModule,RouterLink , 
    MatButtonModule,RouterLink,
    MatCardModule, MatSnackBarModule],
  templateUrl: './usuario-listar.html',
  styleUrl: './usuario-listar.css',
})
export class UsuarioListar implements OnInit{
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b', 'c', 'd','e','f','FK','g','j'];

  rolUsuario: string = '';  

  constructor(private sS: Usuarioservice,  private snackBar: MatSnackBar, private loginService: LoginService) {}
  ngOnInit(): void {

    this.rolUsuario = this.loginService.showRole() ?? '';

    this.sS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.sS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }  
  eliminar(id:number){
  const confirmacion = window.confirm("¿Estás seguro de eliminar este usuario?");

  if (!confirmacion) {
    return; // Si cancela, no hace nada
  }

  this.sS.delete(id).subscribe({
    next: () => {
      this.sS.list().subscribe(data => {
        this.sS.setList(data);

        this.snackBar.open('Usuario eliminado exitosamente.', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      });
    },

    error: (err) => {
      if (err.status === 409) {
        this.snackBar.open(
          'El usuario no puede ser eliminado porque tiene información vinculada.',
          'Cerrar',
          {
            duration: 3500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          }
        );
      } else {
        this.snackBar.open(
          'El usuario no puede ser eliminado porque tiene información vinculada.',
          'Cerrar',
          {
            duration: 3500,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          }
        );
      }
    }
  });
  }
}
