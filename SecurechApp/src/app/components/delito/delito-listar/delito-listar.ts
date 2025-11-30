import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Delito } from '../../../models/Delito';
import { Delitoservice } from '../../../services/delitoservice';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-delito-listar',
  imports: [MatTableModule,MatCardModule,CommonModule,MatIconModule, MatButtonModule,
    MatSnackBarModule,MatPaginatorModule
  ],
  templateUrl: './delito-listar.html',
  styleUrl: './delito-listar.css',
})
export class DelitoListar implements OnInit{
  //dataSource: MatTableDataSource<Delito> = new MatTableDataSource();
  //displayedColumns: string[] = ['a', 'b', 'c', 'd','e','FK','FK2','j'];

  delitos: Delito[] = []
  pageSize = 6;
  currentPage = 0;

  rolUsuario: string = ''; 

  mostrarMensaje(mensaje: string) {
  this.snackBar.open(mensaje, 'Cerrar', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['mensaje-exito']
  });
  }

  getDelitosPaginados() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.delitos.slice(startIndex, endIndex);
    }

    cambiarPagina(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    }

  constructor(private sS: Delitoservice, private snackBar: MatSnackBar, private loginService: LoginService) {}
  ngOnInit(): void {

    this.rolUsuario = this.loginService.showRole() ?? '';

    this.sS.list().subscribe(data=>{
      //this.dataSource=new MatTableDataSource(data)
      this.delitos = data;
      this.sS.setList(data); 
    })
    this.sS.getList().subscribe(data=>{
      //this.dataSource=new MatTableDataSource(data)
      this.delitos = data;
        const maxPageIndex = Math.max(Math.ceil(this.delitos.length / this.pageSize) - 1, 0);
        if (this.currentPage > maxPageIndex) {
          this.currentPage = 0;
        }
    })
  }  
  eliminar(id:number){
    this.sS.delete(id).subscribe(data=>{
      this.sS.list().subscribe(data=>{
        this.sS.setList(data)
      })
      this.mostrarMensaje("Delito eliminado correctamente");
    })
  }  

}
