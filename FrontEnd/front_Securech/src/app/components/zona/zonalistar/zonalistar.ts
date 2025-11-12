import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Zona } from '../../../models/Zona';
import { ZonaService } from '../../../services/ZonaService';

@Component({
  selector: 'app-zonalistar',
  imports: [MatTableModule],
  templateUrl: './zonalistar.html',
  styleUrl: './zonalistar.css',
})
export class Zonalistar {
  dataSource:MatTableDataSource<Zona>=new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2','c3','c4','c5','c6'];

  constructor(private ds:ZonaService){}
  ngOnInit(): void {
    this.ds.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
}
