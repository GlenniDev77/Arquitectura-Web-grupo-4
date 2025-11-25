import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Zonaservice } from '../../../services/zonaservice';
import { Zona } from '../../../models/Zona';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-zonalistar',
  imports: [MatTableModule, MatIconModule, MatButtonModule,RouterLink, MatCardModule],
  templateUrl: './zonalistar.html',
  styleUrl: './zonalistar.css',
})
export class Zonalistar implements OnInit {
    zonas: Zona[] = [];
    dataSource:MatTableDataSource<Zona>=new MatTableDataSource
    displayedColumns: string[] = ['c1', 'c2','c3','c4','c5','c6','c7','c8'];
  
    constructor(private zS:Zonaservice){}
    ngOnInit(): void {
      this.zS.list().subscribe(data => {
        this.zonas = data;
        this.dataSource=new MatTableDataSource(data)
      })
      this.zS.getList().subscribe(data=>{
        this.zonas = data;
        this.dataSource=new MatTableDataSource(data)
      })
    }

    eliminar(id:number){
      this.zS.delete(id).subscribe(data =>{
      this.zS.list().subscribe(data=>{
      this.zS.setList(data)
    })
  })
}
}


