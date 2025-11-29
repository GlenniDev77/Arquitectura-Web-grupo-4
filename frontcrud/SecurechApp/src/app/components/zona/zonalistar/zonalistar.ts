import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Zonaservice } from '../../../services/zonaservice';
import { Zona } from '../../../models/Zona';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-zonalistar',
  imports: [MatTableModule, MatIconModule, MatButtonModule,RouterLink,MatCardModule,MatSnackBarModule],
  templateUrl: './zonalistar.html',
  styleUrl: './zonalistar.css',
})
export class Zonalistar implements OnInit {
  dataSource:MatTableDataSource<Zona>=new MatTableDataSource
    displayedColumns: string[] = ['c1', 'c2','c3','c4','c5','c6','c7','c8'];

    rolUsuario: string = '';

    mostrarMensaje(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['mensaje-exito']
    });
    }

  
    constructor(private zS:Zonaservice, private snackBar: MatSnackBar, private loginService: LoginService){}
    ngOnInit(): void {

      this.rolUsuario = this.loginService.showRole() ?? '';

      this.zS.list().subscribe(data => {
        this.dataSource=new MatTableDataSource(data)
      })
      this.zS.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      })
    }

    eliminar(id:number){
      this.zS.delete(id).subscribe(data =>{
      this.zS.list().subscribe(data=>{
      this.zS.setList(data)
    })
    this.mostrarMensaje('Zona eliminada correctamente');
  })
}
}


