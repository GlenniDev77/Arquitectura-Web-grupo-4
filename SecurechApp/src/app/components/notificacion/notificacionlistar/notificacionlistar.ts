import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Notificacion } from '../../../models/Notificacion';
import { Notificacionservice } from '../../../services/notificacionservice';

@Component({
  selector: 'app-notificacionlistar',
  imports: [MatTableModule,CommonModule,MatIconModule, MatButtonModule],
  templateUrl: './notificacionlistar.html',
  styleUrl: './notificacionlistar.css',
})
export class Notificacionlistar {
dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();
  displayedColumns: string[] = ['a', 'b','FK','FK2'];

  constructor(private sS: Notificacionservice) {}
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
    })} 
}
