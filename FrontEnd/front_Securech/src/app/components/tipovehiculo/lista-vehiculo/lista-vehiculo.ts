import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TipoVehiculoService } from '../../../services/TipoVehiculoService';
import { TipoVehiculo } from '../../../models/TipoVehiculo';

@Component({
  selector: 'app-lista-vehiculo',
  imports: [MatTableModule],
  templateUrl: './lista-vehiculo.html',
  styleUrl: './lista-vehiculo.css',
})
export class ListaVehiculo implements OnInit{
  dataSource:MatTableDataSource<TipoVehiculo>=new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2'];

  constructor(private ds:TipoVehiculoService){}
  ngOnInit(): void {
    this.ds.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}
