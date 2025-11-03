import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoVehiculo } from '../tipo-vehiculo/tipo-vehiculo';
import { TipoVehiculoservice } from '../../services/tipo-vehiculoservice';

@Component({
  selector: 'app-tipo-vehiculo-listar',
  imports: [MatTableModule],
  templateUrl: './tipo-vehiculo-listar.html',
  styleUrl: './tipo-vehiculo-listar.css',
})
export class TipoVehiculoListar implements OnInit{
  dataSource:MatTableDataSource<TipoVehiculo>=new MatTableDataSource
  displayedColumns: string[] = ['c1', 'c2'];

  constructor(private tvS:TipoVehiculoservice){}
  ngOnInit(): void {
    this.tvS.list().subscribe(data => {
      this.dataSource=new MatTableDataSource(data)
    })
  }
}
