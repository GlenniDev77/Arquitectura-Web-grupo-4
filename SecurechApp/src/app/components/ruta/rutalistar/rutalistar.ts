import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rutaservice } from '../../../services/rutaservice';
import { Ruta } from '../../../models/Ruta';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-rutalistar',
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './rutalistar.html',
  styleUrl: './rutalistar.css',
})
export class Rutalistar {
  dataSource: MatTableDataSource<Ruta> = new MatTableDataSource();

  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'e','FK', 'FK2','f','g'];

  constructor(private sS: Rutaservice) {}
  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.sS.delete(id).subscribe((data) => {
      this.sS.list().subscribe((data) => {
        this.sS.setList(data);
      });
    });
  }
}
