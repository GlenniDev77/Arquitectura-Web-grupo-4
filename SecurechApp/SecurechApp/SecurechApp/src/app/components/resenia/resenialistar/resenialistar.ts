import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Resenia } from '../../../models/Resenia';
import { Reseniaservice } from '../../../services/reseniaservice';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-resenialistar',
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule, MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './resenialistar.html',
  styleUrl: './resenialistar.css',
})
export class Resenialistar {
dataSource: MatTableDataSource<Resenia> = new MatTableDataSource();

  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'FK','e'];

  rolUsuario: string = '';  


  mostrarMensaje(mensaje: string) {
  this.snackBar.open(mensaje, 'Cerrar', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['mensaje-exito']
  });
  }

  constructor(private sS: Reseniaservice, private snackBar: MatSnackBar, private loginService: LoginService) {}
  ngOnInit(): void {
  
    this.rolUsuario = this.loginService.showRole() ?? '';

    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.sS.delete(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
      this.mostrarMensaje("Reseña eliminada correctamente");
    });
  }
}
