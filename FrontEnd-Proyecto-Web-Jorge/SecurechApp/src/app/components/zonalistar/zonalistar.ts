import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Zona } from '../zona/zona';
import { Zonaservice } from '../../services/zonaservice';

@Component({
  selector: 'app-zonalistar',
  imports: [MatTableModule],
  templateUrl: './zonalistar.html',
  styleUrl: './zonalistar.css',
})
export class Zonalistar implements OnInit {
  dataSource:MatTableDataSource<Zona>=new MatTableDataSource
    displayedColumns: string[] = ['c1', 'c2','c3','c4','c5','c6'];
  
    constructor(private tvS:Zonaservice){}
    ngOnInit(): void {
      this.tvS.list().subscribe(data => {
        this.dataSource=new MatTableDataSource(data)
      })
    }
}


