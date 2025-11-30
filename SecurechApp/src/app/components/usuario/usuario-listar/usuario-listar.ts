import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
//import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { Usuarioservice } from '../../../services/usuarioservice';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-usuario-listar',
  imports: [CommonModule,
    MatIconModule,RouterLink , 
    MatButtonModule,RouterLink,
    MatCardModule, MatSnackBarModule,
    MatPaginatorModule],
  templateUrl: './usuario-listar.html',
  styleUrl: './usuario-listar.css',
})
export class UsuarioListar implements OnInit{
  //dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  usuarios: Usuario[] = []
  pageSize = 6;
  currentPage = 0;

  displayedColumns: string[] = ['a', 'b', 'c', 'd','e','f','FK','g','j'];

  rolUsuario: string = '';  

  getUsuariosPaginados() {
  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  return this.usuarios.slice(startIndex, endIndex);
  }

  cambiarPagina(event: any) {
  this.pageSize = event.pageSize;
  this.currentPage = event.pageIndex;
  }



  constructor(private sS: Usuarioservice,  private snackBar: MatSnackBar, private loginService: LoginService) {}
  ngOnInit(): void {

    this.rolUsuario = this.loginService.showRole() ?? '';

    this.sS.list().subscribe(data=>{
      //this.dataSource=new MatTableDataSource(data)
      this.usuarios = data;
      this.sS.setList(data); 
    })
    this.sS.getList().subscribe(data=>{
      //this.dataSource=new MatTableDataSource(data)
      this.usuarios = data;
      const maxPageIndex = Math.max(Math.ceil(this.usuarios.length / this.pageSize) - 1, 0);
      if (this.currentPage > maxPageIndex) {
        this.currentPage = 0;
      }
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
