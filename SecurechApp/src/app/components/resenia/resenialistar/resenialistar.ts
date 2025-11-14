import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Resenia } from '../../../models/Resenia';
import { Reseniaservice } from '../../../services/reseniaservice';

@Component({
  selector: 'app-resenialistar',
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './resenialistar.html',
  styleUrl: './resenialistar.css',
})
export class Resenialistar {
dataSource: MatTableDataSource<Resenia> = new MatTableDataSource();

  displayedColumns: string[] = ['a', 'b', 'c', 'd', 'FK', 'FK2','e'];

  constructor(private sS: Reseniaservice) {}
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
