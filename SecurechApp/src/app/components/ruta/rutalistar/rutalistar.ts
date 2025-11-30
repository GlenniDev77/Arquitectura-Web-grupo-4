import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rutaservice } from '../../../services/rutaservice';
import { Ruta } from '../../../models/Ruta';
import { RouterLink } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rutalistar',
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './rutalistar.html',
  styleUrl: './rutalistar.css',
})
export class Rutalistar {
  dataSource: MatTableDataSource<Ruta> = new MatTableDataSource();

  displayedColumns: string[] = ['a', 'b', 'd', 'FK2', 'g'];

  mostrarMensaje(mensaje: string) {
  this.snackBar.open(mensaje, 'Cerrar', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['mensaje-exito']
  });
  }

  constructor(private sS: Rutaservice,private snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
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
      this.mostrarMensaje("Ruta eliminada correctamente");
    });
  }
}