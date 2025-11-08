import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoVehiculo } from '../tipo-vehiculo';
import { TipoVehiculoservice } from '../../../services/tipo-vehiculoservice';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { tipovehiculo } from '../../../models/TipoVehiculo';

@Component({
  selector: 'app-tipo-vehiculo-listar',
  imports: [MatTableModule, MatIconModule,MatButtonModule,RouterLink],
  templateUrl: './tipo-vehiculo-listar.html',
  styleUrl: './tipo-vehiculo-listar.css',
})
export class TipoVehiculoListar implements OnInit{
  dataSource:MatTableDataSource<tipovehiculo>=new MatTableDataSource
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private tvS:TipoVehiculoservice){}
  ngOnInit(): void {
    this.tvS.list().subscribe(data => {
      this.dataSource=new MatTableDataSource(data)
    })
    this.tvS.getList().subscribe(data=>{
    this.dataSource=new MatTableDataSource(data)
  })
  }
  eliminar(id:number){
  this.tvS.delete(id).subscribe(data =>{
    this.tvS.list().subscribe(data=>{
      this.tvS.setList(data)
    })
  })
}
}
