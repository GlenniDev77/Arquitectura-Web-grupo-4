import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoVehiculoService } from '../../../services/TipoVehiculoService';
import { TipoVehiculo } from '../../../models/TipoVehiculo';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-vehiculo',
  imports: [MatTableModule, MatIcon, MatIconModule, MatButtonModule,RouterLink],
  templateUrl: './lista-vehiculo.html',
  styleUrl: './lista-vehiculo.css',
})
export class ListaVehiculo implements OnInit{
  dataSource:MatTableDataSource<TipoVehiculo>=new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2','c3','c4'];

  constructor(private ds:TipoVehiculoService){}
  ngOnInit(): void {
    this.ds.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.ds.getList().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }

  eliminar(id:number){
  this.ds.delete(id).subscribe(data=>{
    this.ds.list().subscribe(data=>{
      this.ds.setList(data)
    })
  })
}
}
