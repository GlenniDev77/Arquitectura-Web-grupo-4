import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Rol } from '../../../models/Rol';
import { Rolservice } from '../../../services/rolservice';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'app-rol-listar',
  imports: [MatTableModule,MatCardModule, MatIconModule, MatButtonModule,RouterLink,
    MatSnackBarModule,MatPaginatorModule
  ],
  templateUrl: './rol-listar.html',
  styleUrl: './rol-listar.css',
})
export class RolListar implements OnInit{
  //dataSource:MatTableDataSource<Rol>=new MatTableDataSource
  //displayedColumns: string[] = ['c1', 'c2','FK','c3','c4'];
    roles: Rol[] = []
    pageSize = 6;
    currentPage = 0;
  
    getRolesPaginados() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.roles.slice(startIndex, endIndex);
    }

    cambiarPagina(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    }
    constructor(private zS:Rolservice, private snackBar: MatSnackBar){}
    ngOnInit(): void {
      this.zS.list().subscribe(data => {
        //this.dataSource=new MatTableDataSource(data)
        this.roles = data;
        this.zS.setList(data); 
      })
      this.zS.getList().subscribe(data=>{
      //this.dataSource=new MatTableDataSource(data)
      this.roles = data;
      const maxPageIndex = Math.max(Math.ceil(this.roles.length / this.pageSize) - 1, 0);
      if (this.currentPage > maxPageIndex) {
        this.currentPage = 0;
      }
      })
    }

    eliminar(id:number){
   const confirmacion = window.confirm("¿Seguro que deseas eliminar este rol?");

      if (!confirmacion) {
        return;
      }

      this.zS.delete(id).subscribe(data =>{
      this.zS.list().subscribe(data=>{
      this.zS.setList(data)
    })
        this.snackBar.open("Rol eliminado exitosamente.", "Cerrar", {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
    });
  })
}  

}
